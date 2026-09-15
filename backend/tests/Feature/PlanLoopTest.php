<?php

namespace Tests\Feature;

use App\Models\AssessmentQuestion;
use App\Models\Career;
use App\Models\CareerDNA;
use App\Models\CareerRequirement;
use App\Models\User;
use Database\Seeders\AssessmentQuestionSeeder;
use Database\Seeders\CareerDNAMatchSeeder;
use Database\Seeders\CareerDNASeeder;
use Database\Seeders\CareerRequirementSeeder;
use Database\Seeders\CareerSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PlanLoopTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([
            CareerSeeder::class,
            CareerRequirementSeeder::class,
            CareerDNASeeder::class,
            CareerDNAMatchSeeder::class,
            AssessmentQuestionSeeder::class,
        ]);
    }

    private function authUser(): User
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        return $user;
    }

    private function careerWithRequirements(): Career
    {
        return Career::where('name', 'Product Management')->firstOrFail();
    }

    private function levels(array $overrides = []): array
    {
        $keys = CareerRequirement::pluck('key')->unique()->values();

        return $keys->mapWithKeys(fn (string $key): array => [
            $key => $overrides[$key] ?? 3,
        ])->all();
    }

    public function test_current_state_persists_levels_and_readiness(): void
    {
        $user = $this->authUser();
        $career = $this->careerWithRequirements();

        $response = $this->postJson('/api/assessment/current-state', [
            'career_id' => $career->id,
            'current_state' => $this->levels(),
        ]);

        $response->assertOk()->assertJsonPath('persisted', true);

        $user->refresh();

        $this->assertSame($career->id, $user->career_id);
        $this->assertSame($response->json('career_readiness'), $user->career_readiness);
        $this->assertSame(3, $user->career_levels[$career->requirements()->first()->key]);

        $requirements = $career->requirements()->get();
        $expectedReadiness = (int) round(
            100 * $requirements->sum(fn (CareerRequirement $r) => min(3, $r->target_level))
            / $requirements->sum(fn (CareerRequirement $r) => $r->target_level)
        );
        $this->assertSame($expectedReadiness, $user->career_readiness);
    }

    public function test_current_state_seeds_roadmap_keyed_by_requirement(): void
    {
        $user = $this->authUser();
        $career = $this->careerWithRequirements();

        $this->postJson('/api/assessment/current-state', [
            'career_id' => $career->id,
            'current_state' => $this->levels(),
        ]);

        $items = $user->roadmapItems()->get();

        $this->assertNotEmpty($items);
        $this->assertStringContainsString(
            $items->first()->requirement_key,
            $career->requirements()->pluck('key'),
        );

        $gappedKeys = $career->requirements()
            ->get()
            ->filter(fn (CareerRequirement $r) => $r->target_level > 3)
            ->pluck('key');

        foreach ($items as $item) {
            $this->assertTrue($gappedKeys->contains($item->requirement_key));
        }
    }

    public function test_guest_current_state_does_not_persist(): void
    {
        $career = $this->careerWithRequirements();

        $response = $this->postJson('/api/assessment/current-state', [
            'career_id' => $career->id,
            'current_state' => $this->levels(),
        ]);

        $response->assertOk()->assertJsonPath('persisted', false);
    }

    public function test_get_plan_returns_stored_plan(): void
    {
        $user = $this->authUser();
        $career = $this->careerWithRequirements();

        $this->postJson('/api/assessment/current-state', [
            'career_id' => $career->id,
            'current_state' => $this->levels(),
        ]);

        $response = $this->getJson('/api/plan');

        $response->assertOk()->assertJsonPath('plan.career.id', $career->id);
        $this->assertSame(
            $user->refresh()->career_readiness,
            $response->json('plan.career_readiness'),
        );
    }

    public function test_get_plan_returns_null_without_career(): void
    {
        $this->authUser();

        $this->getJson('/api/plan')
            ->assertOk()
            ->assertJsonPath('plan', null);
    }

    public function test_get_roadmap_regenerates_from_plan_when_empty(): void
    {
        $user = $this->authUser();
        $career = $this->careerWithRequirements();

        $this->postJson('/api/assessment/current-state', [
            'career_id' => $career->id,
            'current_state' => $this->levels(),
        ]);

        $user->roadmapItems()->delete();

        $response = $this->getJson('/api/roadmap');

        $response->assertOk()->assertJsonPath('career.name', $career->name);
        $this->assertNotEmpty($response->json('items'));
        $this->assertNotNull($response->json('readiness'));
    }

    public function test_assessment_result_returns_stored_snapshot(): void
    {
        $user = $this->authUser();
        $questions = AssessmentQuestion::orderBy('sort_order')->get();
        $expectedDna = CareerDNA::where('key', 'technical_builder')->firstOrFail();
        $profile = $expectedDna->trait_profile;

        $answers = $questions->map(function (AssessmentQuestion $question) use ($profile): array {
            $optionIndex = collect($question->options)
                ->sortByDesc(fn (array $option) => [$profile[$option['trait']] ?? 0, $option['points']])
                ->keys()
                ->first();

            return [
                'question_id' => $question->id,
                'option_index' => $optionIndex,
            ];
        })->values()->all();

        $this->postJson('/api/assessment/score', ['answers' => $answers])->assertOk();

        $response = $this->getJson('/api/assessment/result');

        $response->assertOk()
            ->assertJsonPath('career_dna.key', 'technical_builder')
            ->assertJsonPath('persisted', true);

        $this->assertNotEmpty($response->json('traits'));
        $this->assertNotEmpty($response->json('drivers'));
        $this->assertNotEmpty($response->json('careers'));
    }

    public function test_assessment_score_persists_traits_and_returns_drivers(): void
    {
        $user = $this->authUser();
        $questions = AssessmentQuestion::orderBy('sort_order')->get();

        $answers = $questions->values()->map(
            fn (AssessmentQuestion $question, int $index): array => [
                'question_id' => $question->id,
                'option_index' => $index % 4,
            ],
        )->all();

        $response = $this->postJson('/api/assessment/score', ['answers' => $answers]);

        $response->assertOk()
            ->assertJsonPath('persisted', true)
            ->assertJsonStructure(['drivers' => [['key', 'label', 'share', 'note']]])
            ->assertJsonPath('careers.0.has_requirements', true);

        $this->assertNotNull($user->refresh()->career_traits);
        $this->assertNotNull($response->json('career_dna.key'));
    }

    public function test_dashboard_uses_user_specific_career(): void
    {
        $user = $this->authUser();
        $career = $this->careerWithRequirements();

        $this->postJson('/api/assessment/current-state', [
            'career_id' => $career->id,
            'current_state' => $this->levels(['product_sense' => 4, 'user_research' => 1]),
        ])->assertOk();

        $response = $this->getJson('/api/dashboard');

        $response->assertOk()
            ->assertJsonPath('top_career.name', $career->name)
            ->assertJsonPath('career_readiness', $user->refresh()->career_readiness)
            ->assertJsonPath('career_score', (int) ($user->career_score ?? 0));
    }

    public function test_dashboard_top_career_is_not_global_max(): void
    {
        $user = $this->authUser();

        $this->getJson('/api/dashboard')
            ->assertOk()
            ->assertJsonPath('top_career', null);
    }
}
