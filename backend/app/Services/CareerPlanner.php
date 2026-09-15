<?php

namespace App\Services;

use App\Models\Career;
use App\Models\User;

class CareerPlanner
{
    /**
     * Build the gap analysis and prioritized action plan for a career.
     *
     * @param  array<string, int>  $levels
     * @return array<string, mixed>
     */
    public function build(Career $career, array $levels): array
    {
        $rows = $this->rows($career, $levels);

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
            ->map(fn (array $row) => $this->requirementOutput($row))
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
            ->map(fn (array $row, int $index) => [
                'bucket' => $index < 3 ? 'this_week' : ($index < 6 ? 'this_month' : 'later'),
                'key' => $row['key'],
                'label' => $row['label'],
                'importance' => $row['importance'],
                'actions' => $row['suggested_actions'],
            ])
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
            'career_readiness' => $this->readiness($career, $levels),
            'requirements' => $requirementsOutput,
            'gaps' => $gapsOutput,
            'actions' => $actionsOutput,
        ];
    }

    /**
     * Career readiness from current self-rated levels against requirement targets.
     *
     * @param  array<string, int>  $levels
     */
    public function readiness(Career $career, array $levels): int
    {
        $targetSum = 0;
        $currentSum = 0;

        foreach ($this->rows($career, $levels) as $row) {
            $targetSum += $row['target_level'];
            $currentSum += min($row['current'], $row['target_level']);
        }

        return $targetSum > 0 ? (int) round(100 * $currentSum / $targetSum) : 0;
    }

    /**
     * Persist the plan's actions as the user's roadmap, keyed by requirement.
     *
     * @param  array<string, mixed>  $plan
     */
    public function persistRoadmap(User $user, array $plan): void
    {
        $keptKeys = [];

        foreach ($plan['actions'] as $index => $action) {
            $key = $action['key'];
            $keptKeys[] = $key;
            $firstAction = $action['actions'][0] ?? $action['label'];

            $item = $user->roadmapItems()->where('requirement_key', $key)->first();

            if ($item) {
                $item->update([
                    'title' => $firstAction,
                    'completed' => false,
                    'sort_order' => $index,
                ]);
            } else {
                $user->roadmapItems()->create([
                    'title' => $firstAction,
                    'completed' => false,
                    'sort_order' => $index,
                    'requirement_key' => $key,
                ]);
            }
        }

        $user->roadmapItems()
            ->whereNotIn('requirement_key', $keptKeys)
            ->delete();
    }

    /**
     * @param  array<string, int>  $levels
     * @return array<int, array<string, mixed>>
     */
    private function rows(Career $career, array $levels): array
    {
        $rows = [];

        foreach ($career->requirements()->get() as $requirement) {
            $level = max(0, min(5, (int) ($levels[$requirement->key] ?? 0)));
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
        }

        return $rows;
    }

    /**
     * @param  array<string, mixed>  $row
     * @return array<string, mixed>
     */
    private function requirementOutput(array $row): array
    {
        return [
            'key' => $row['key'],
            'label' => $row['label'],
            'target_level' => $row['target_level'],
            'importance' => $row['importance'],
            'current' => $row['current'],
            'gap' => $row['gap'],
            'severity' => $row['severity'],
            'suggested_actions' => $row['suggested_actions'],
        ];
    }
}
