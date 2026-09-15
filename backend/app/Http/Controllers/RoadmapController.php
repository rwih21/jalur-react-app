<?php

namespace App\Http\Controllers;

use App\Models\Career;
use App\Services\CareerPlanner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoadmapController extends Controller
{
    public function __construct(private readonly CareerPlanner $planner) {}

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $items = $user->roadmapItems()
            ->orderBy('sort_order')
            ->get();

        if ($items->isEmpty() && $user->career_id) {
            $career = $user->career_id ? Career::find($user->career_id) : null;

            if ($career && $user->career_levels) {
                $plan = $this->planner->build($career, $user->career_levels);
                $this->planner->persistRoadmap($user, $plan);

                $items = $user->roadmapItems()
                    ->orderBy('sort_order')
                    ->get();
            }
        }

        $career = $user->career_id ? Career::find($user->career_id) : null;
        $readiness = null;
        if ($career && $user->career_levels) {
            $readiness = $this->planner->readiness($career, $user->career_levels);
        }

        return response()->json([
            'career' => $career ? [
                'id' => $career->id,
                'name' => $career->name,
            ] : null,
            'readiness' => $readiness,
            'items' => $items,
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $item = $request->user()->roadmapItems()->findOrFail($id);

        $validated = $request->validate([
            'completed' => 'sometimes|boolean',
            'title' => 'sometimes|string|max:255',
            'sort_order' => 'sometimes|integer',
        ]);

        $item->update($validated);

        return response()->json($item);
    }
}
