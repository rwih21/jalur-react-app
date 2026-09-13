<?php

namespace App\Http\Controllers;

use App\Models\Career;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $careers = Career::query()
            ->withCount('requirements')
            ->orderBy('match_percentage', 'desc')
            ->filterByCategory($request->query('category'))
            ->searchByName($request->query('search'))
            ->get()
            ->map(fn (Career $career) => [
                'id' => $career->id,
                'name' => $career->name,
                'category' => $career->category,
                'match_percentage' => $career->match_percentage,
                'salary_range' => $career->salary_range,
                'skills' => $career->skills,
                'has_requirements' => $career->requirements_count > 0,
            ]);

        return response()->json($careers);
    }

    public function show(Career $career): JsonResponse
    {
        $requirements = $career->requirements()->get()->map(fn ($requirement) => [
            'key' => $requirement->key,
            'label' => $requirement->label,
            'target_level' => $requirement->target_level,
            'importance' => $requirement->importance,
            'suggested_actions' => $requirement->suggested_actions,
        ])->values();

        return response()->json([
            'career' => [
                'id' => $career->id,
                'name' => $career->name,
                'category' => $career->category,
                'salary_range' => $career->salary_range,
                'skills' => $career->skills,
            ],
            'requirements' => $requirements->values(),
        ]);
    }
}
