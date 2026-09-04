<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InterviewSessionController;
use App\Http\Controllers\ProfessionalController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\RoadmapController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/me', [AuthController::class, 'update']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/careers', [CareerController::class, 'index']);
    Route::get('/professionals', [ProfessionalController::class, 'index']);
    Route::get('/questions', [QuestionController::class, 'index']);

    Route::get('/roadmap', [RoadmapController::class, 'index']);
    Route::put('/roadmap/{id}', [RoadmapController::class, 'update']);

    Route::get('/interview/sessions', [InterviewSessionController::class, 'index']);
    Route::post('/interview/sessions', [InterviewSessionController::class, 'store']);
});