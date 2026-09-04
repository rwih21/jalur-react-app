<?php

namespace App\Http\Controllers;

use App\Models\Career;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $careers = Career::orderBy('match_percentage', 'desc')
            ->filterByCategory($request->query('category'))
            ->get();

        return response()->json($careers);
    }
}
