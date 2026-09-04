<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoadmapController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $items = $request->user()->roadmapItems()
            ->orderBy('sort_order')
            ->get();

        if ($items->isEmpty()) {
            $defaults = [
                'Financial Modeling',
                'Build a DCF',
                'Trading Comps',
                'Build your IB network',
                'Apply to internships',
                'Technical interviews',
            ];

            foreach ($defaults as $i => $title) {
                $request->user()->roadmapItems()->create([
                    'title' => $title,
                    'completed' => false,
                    'sort_order' => $i,
                ]);
            }

            $items = $request->user()->roadmapItems()
                ->orderBy('sort_order')
                ->get();
        }

        return response()->json($items);
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
