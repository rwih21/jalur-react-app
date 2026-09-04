<?php

namespace App\Http\Controllers;

use App\Models\InterviewQuestion;
use Illuminate\Http\JsonResponse;

class QuestionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(InterviewQuestion::all());
    }
}
