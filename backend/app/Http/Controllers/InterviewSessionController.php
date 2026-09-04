<?php

namespace App\Http\Controllers;

use App\Models\InterviewSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InterviewSessionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $sessions = $request->user()->interviewSessions()
            ->orderByDesc('created_at')
            ->get();

        return response()->json($sessions);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'mode' => 'sometimes|in:real,practice',
            'score' => 'sometimes|integer|min:0|max:100',
            'feedback' => 'sometimes|nullable|string',
        ]);

        $session = $request->user()->interviewSessions()->create([
            'mode' => $validated['mode'] ?? 'real',
            'score' => $validated['score'] ?? null,
            'feedback' => $validated['feedback'] ?? null,
        ]);

        return response()->json($session, 201);
    }
}
