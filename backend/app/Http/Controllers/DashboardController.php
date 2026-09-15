<?php

namespace App\Http\Controllers;

use App\Models\Career;
use App\Models\Professional;
use App\Services\CareerPlanner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(private readonly CareerPlanner $planner) {}

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $totalRoadmap = $user->roadmapItems()->count();
        $completedRoadmap = $user->roadmapItems()->where('completed', true)->count();

        $recentSessions = $user->interviewSessions()
            ->latest()
            ->take(5)
            ->get();

        $targetCareer = $user->career_id ? Career::find($user->career_id) : null;
        $topCareer = $targetCareer;

        if (! $topCareer && $user->career_dna_id) {
            $topCareer = $user->careerDna?->careers()
                ->orderByPivot('match_percentage', 'desc')
                ->first();
        }

        $readiness = null;
        if ($targetCareer && $user->career_levels) {
            $readiness = $this->planner->readiness($targetCareer, $user->career_levels);
        }
        $readiness ??= $user->career_readiness;

        $networkCount = Professional::count();

        return response()->json([
            'user' => $user->only([
                'name', 'university', 'field_of_study',
                'career_score', 'interview_score',
            ]),
            'career_readiness' => $readiness,
            'career_score' => (int) ($user->career_score ?? 0),
            'interview_readiness' => $user->interview_score ?? 0,
            'dna' => $user->careerDna ? [
                'key' => $user->careerDna->key,
                'name' => $user->careerDna->name,
            ] : null,
            'roadmap' => [
                'total' => $totalRoadmap,
                'completed' => $completedRoadmap,
            ],
            'top_career' => $topCareer ? [
                'id' => $topCareer->id,
                'name' => $topCareer->name,
                'match' => (int) ($user->career_score ?? ($topCareer->pivot->match_percentage ?? $topCareer->match_percentage)),
            ] : null,
            'network_count' => $networkCount,
            'recent_sessions' => $recentSessions,
        ]);
    }
}
