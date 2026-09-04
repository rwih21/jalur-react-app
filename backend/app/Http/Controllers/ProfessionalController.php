<?php

namespace App\Http\Controllers;

use App\Models\Professional;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfessionalController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $professionals = Professional::orderBy('match_percentage', 'desc')
            ->filterByIndustry($request->query('industry'))
            ->get();

        return response()->json($professionals);
    }
}
