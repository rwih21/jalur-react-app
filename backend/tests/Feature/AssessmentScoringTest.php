<?php

namespace Tests\Feature;

use App\Models\AssessmentQuestion;
use App\Models\CareerDNA;
use Database\Seeders\AssessmentQuestionSeeder;
use Database\Seeders\CareerDNASeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class AssessmentScoringTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @var array<string, string>
     */
    private const EXPECTED_DNA_FOR_TRAIT = [
        'analytical' => 'analytical_strategist',
        'leadership' => 'people_leader',
        'communication' => 'people_leader',
        'commercial' => 'commercial_driver',
        'technical' => 'technical_builder',
        'creative' => 'creative_pioneer',
        'execution' => 'operational_executor',
    ];

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([
            CareerDNASeeder::class,
            AssessmentQuestionSeeder::class,
        ]);
    }

    /**
     * @return array<string, array{0: string}>
     */
    public static function traitProvider(): array
    {
        return array_map(
            fn (string $trait) => [$trait],
            array_keys(self::EXPECTED_DNA_FOR_TRAIT),
        );
    }

    #[DataProvider('traitProvider')]
    public function test_archetype_answers_return_the_expected_dna(string $trait): void
    {
        $questions = AssessmentQuestion::orderBy('sort_order')->get();
        $expectedDna = CareerDNA::where('key', self::EXPECTED_DNA_FOR_TRAIT[$trait])->firstOrFail();
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

        $response = $this->postJson('/api/assessment/score', ['answers' => $answers]);

        $response
            ->assertOk()
            ->assertJsonPath('career_dna.key', $expectedDna->key);
    }

    public function test_mixed_answers_still_return_a_valid_dna(): void
    {
        $questions = AssessmentQuestion::orderBy('sort_order')->get();

        $answers = $questions->values()->map(
            fn (AssessmentQuestion $question, int $index): array => [
                'question_id' => $question->id,
                'option_index' => $index % 4,
            ],
        )->all();

        $response = $this->postJson('/api/assessment/score', ['answers' => $answers]);

        $response->assertOk();

        $this->assertNotNull(
            CareerDNA::where('key', $response->json('career_dna.key'))->exists(),
        );
    }
}
