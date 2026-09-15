<?php

namespace App\Http\Controllers;

use App\Models\Career;
use App\Models\User;
use App\Services\CareerPlanner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlanController extends Controller
{
    public function __construct(private readonly CareerPlanner $planner) {}

    public function currentState(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'career_id' => ['required', 'integer', 'exists:careers,id'],
            'current_state' => ['required', 'array'],
            'current_state.*' => ['integer', 'between:0,5'],
        ]);

        $career = Career::findOrFail($validated['career_id']);
        $levels = $validated['current_state'];
        $plan = $this->planner->build($career, $levels);
        $plan['persisted'] = false;

        $user = Auth::guard('sanctum')->user();

        if ($user) {
            $this->applyToUser($user, $career, $levels, $plan);
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
        $levels = $validated['current_state'];
        $plan = $this->planner->build($career, $levels);
        $plan['persisted'] = true;

        $this->applyToUser($request->user(), $career, $levels, $plan);

        return response()->json($plan);
    }

    /**
     * Re-derive the stored plan for a returning user.
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user->career_id) {
            return response()->json(['plan' => null]);
        }

        $career = Career::find($user->career_id);

        if (! $career) {
            return response()->json(['plan' => null]);
        }

        $storedLevels = $user->career_levels ?? [];
        $levels = $career->requirements()
            ->pluck('key')
            ->mapWithKeys(fn (string $key): array => [
                $key => max(0, min(5, (int) ($storedLevels[$key] ?? 0))),
            ])
            ->all();

        $plan = $this->planner->build($career, $levels);
        $plan['persisted'] = true;

        return response()->json(['plan' => $plan]);
    }

    /**
     * @param  array<string, int>  $levels
     * @param  array<string, mixed>  $plan
     */
    private function applyToUser(User $user, Career $career, array $levels, array $plan): void
    {
        $user->forceFill([
            'career_id' => $career->id,
            'career_readiness' => $plan['career_readiness'],
            'career_levels' => $levels,
        ])->save();

        $this->planner->persistRoadmap($user, $plan);
    }
}
