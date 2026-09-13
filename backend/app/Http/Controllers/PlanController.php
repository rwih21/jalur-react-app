<?php

namespace App\Http\Controllers;

use App\Models\Career;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlanController extends Controller
{
    public function currentState(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'career_id' => ['required', 'integer', 'exists:careers,id'],
            'current_state' => ['required', 'array'],
            'current_state.*' => ['integer', 'between:0,5'],
        ]);

        $career = Career::findOrFail($validated['career_id']);
        $plan = $this->buildPlan($career, $validated['current_state']);

        $user = Auth::guard('sanctum')->user();
        $plan['persisted'] = false;

        if ($user) {
            $this->applyToUser($user, $plan);
            $plan['persisted'] = true;
        }

        return response()->json($plan);
    }

    public function commit(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'career_id' => ['required', 'integer', 'exists:careers,id'],
            'current_state' => ['required', 'array'],
            'current_state.*' => ['integer', 'between:0,5'],
        ]);

        $career = Career::findOrFail($validated['career_id']);
        $plan = $this->buildPlan($career, $validated['current_state']);
        $plan['persisted'] = true;

        $this->applyToUser($request->user(), $plan);

        return response()->json($plan);
    }

    /**
     * Build the gap analysis and prioritized action plan for a career.
     *
     * @param  array<string, int>  $currentState
     * @return array<string, mixed>
     */
    private function buildPlan(Career $career, array $currentState): array
    {
        $requirements = $career->requirements()->get();
        $rows = [];
        $targetSum = 0;
        $currentSum = 0;

        foreach ($requirements as $requirement) {
            $level = max(0, min(5, (int) ($currentState[$requirement->key] ?? 0)));
            $gap = max(0, $requirement->target_level - $level);
            $severity = $gap >= 2 ? 'critical' : ($gap === 1 ? 'open' : 'covered');

            $rows[] = [
                'requirement' => $requirement,
                'key' => $requirement->key,
                'label' => $requirement->label,
                'target_level' => $requirement->target_level,
                'importance' => $requirement->importance,
                'current' => $level,
                'gap' => $gap,
                'severity' => $severity,
                'score' => ($requirement->importance === 'high' ? 2 : 1) * $gap,
                'suggested_actions' => $requirement->suggested_actions,
            ];

            $targetSum += $requirement->target_level;
            $currentSum += min($level, $requirement->target_level);
        }

        $readiness = $targetSum > 0 ? (int) round(100 * $currentSum / $targetSum) : 0;

        $gapped = collect($rows)
            ->filter(fn (array $row) => $row['gap'] > 0)
            ->sortBy([
                ['score', 'desc'],
                ['target_level', 'desc'],
                ['label', 'asc'],
            ])
            ->values();

        $requirementsOutput = collect($rows)
            ->sortBy([
                ['score', 'desc'],
                ['target_level', 'desc'],
            ])
            ->map(fn (array $row) => [
                'key' => $row['key'],
                'label' => $row['label'],
                'target_level' => $row['target_level'],
                'importance' => $row['importance'],
                'current' => $row['current'],
                'gap' => $row['gap'],
                'severity' => $row['severity'],
                'suggested_actions' => $row['suggested_actions'],
            ])
            ->values()
            ->all();

        $gapsOutput = $gapped
            ->map(fn (array $row) => [
                'key' => $row['key'],
                'label' => $row['label'],
                'importance' => $row['importance'],
                'gap' => $row['gap'],
                'severity' => $row['severity'],
                'current' => $row['current'],
                'target_level' => $row['target_level'],
            ])
            ->values()
            ->all();

        $actionsOutput = $gapped
            ->values()
            ->map(function (array $row, int $index) {
                return [
                    'bucket' => $index < 3 ? 'this_week' : ($index < 6 ? 'this_month' : 'later'),
                    'key' => $row['key'],
                    'label' => $row['label'],
                    'importance' => $row['importance'],
                    'actions' => $row['suggested_actions'],
                ];
            })
            ->values()
            ->all();

        return [
            'career' => [
                'id' => $career->id,
                'name' => $career->name,
                'category' => $career->category,
                'salary_range' => $career->salary_range,
                'skills' => $career->skills,
            ],
            'career_readiness' => $readiness,
            'requirements' => $requirementsOutput,
            'gaps' => $gapsOutput,
            'actions' => $actionsOutput,
        ];
    }

    /**
     * Persist a computed plan onto the user's account.
     *
     * @param  array<string, mixed>  $plan
     */
    private function applyToUser(User $user, array $plan): void
    {
        $career = Career::findOrFail($plan['career']['id']);

        $user->forceFill([
            'career_id' => $career->id,
            'career_readiness' => $plan['career_readiness'],
        ])->save();

        $user->roadmapItems()->delete();

        foreach ($plan['actions'] as $index => $action) {
            $firstAction = $action['actions'][0] ?? $action['label'];

            $user->roadmapItems()->create([
                'title' => $firstAction,
                'completed' => false,
                'sort_order' => $index,
            ]);
        }
    }
}
