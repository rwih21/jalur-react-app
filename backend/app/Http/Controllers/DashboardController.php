<?php

namespace App\Http\Controllers;

use App\Models\Career;
use App\Models\Professional;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $totalRoadmap = $user->roadmapItems()->count();
        $completedRoadmap = $user->roadmapItems()->where('completed', true)->count();

        $recentSessions = $user->interviewSessions()
            ->latest()
            ->take(5)
            ->get();

        $topCareer = Career::orderByDesc('match_percentage')->first();
        $networkCount = Professional::count();

        return response()->json([
            'user' => $user->only([
                'name', 'university', 'field_of_study',
                'career_score', 'interview_score',
            ]),
            'career_readiness' => $user->career_score,
            'interview_readiness' => $user->interview_score,
            'roadmap' => [
                'total' => $totalRoadmap,
                'completed' => $completedRoadmap,
            ],
            'top_career' => $topCareer ? [
                'name' => $topCareer->name,
                'match' => $topCareer->match_percentage,
            ] : null,
            'network_count' => $networkCount,
            'recent_sessions' => $recentSessions,
        ]);
    }
}
