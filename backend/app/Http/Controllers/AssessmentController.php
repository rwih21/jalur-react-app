<?php

namespace App\Http\Controllers;

use App\Models\AssessmentQuestion;
use App\Models\CareerDNA;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AssessmentController extends Controller
{
    private const TRAITS = [
        'analytical',
        'leadership',
        'communication',
        'commercial',
        'technical',
        'creative',
        'execution',
    ];

    private const FREE_UNLOCKED_CAREERS = 3;

    public function questions(): JsonResponse
    {
        $questions = AssessmentQuestion::orderBy('sort_order')
            ->get()
            ->map(fn (AssessmentQuestion $q) => [
                'id' => $q->id,
                'question_text' => $q->question_text,
                'options' => collect($q->options)->map(
                    fn (array $option) => $option['text']
                )->values(),
            ]);

        return response()->json($questions);
    }

    public function score(Request $request): JsonResponse
    {
        $request->validate([
            'answers' => ['required', 'array', 'min:1'],
            'answers.*.question_id' => ['required', 'integer', 'exists:assessment_questions,id'],
            'answers.*.option_index' => ['required', 'integer', 'min:0'],
        ]);

        $questions = AssessmentQuestion::orderBy('sort_order')->get();
        $answers = collect($request->input('answers'));

        $answeredIds = $answers->pluck('question_id')->sort()->values();
        $allIds = $questions->pluck('id')->sort()->values();

        if ($answeredIds->all() !== $allIds->all()) {
            throw ValidationException::withMessages([
                'answers' => ['Please answer all questions.'],
            ]);
        }

        $byId = $questions->keyBy('id');

        $traitTotals = array_fill_keys(self::TRAITS, 0);

        foreach ($answers as $answer) {
            $question = $byId[$answer['question_id']];
            $option = $question->options[$answer['option_index']] ?? null;

            if (!$option || !isset($option['trait'], $option['points'])) {
                throw ValidationException::withMessages([
                    'answers' => ['One or more answers are invalid.'],
                ]);
            }

            $traitTotals[$option['trait']] += (int) $option['points'];
        }

        $grandTotal = array_sum($traitTotals);
        $normalized = $grandTotal > 0
            ? array_map(fn ($value) => round(($value / $grandTotal) * 100), $traitTotals)
            : $traitTotals;

        $careerDna = $this->findBestCareerDna($normalized);

        $user = Auth::guard('sanctum')->user();
        $persisted = false;
        if ($user && $careerDna) {
            $user->forceFill([
                'career_dna_id' => $careerDna->id,
                'career_score' => $this->topMatchPercentage($careerDna),
            ])->save();
            $persisted = true;
        }

        $careers = $careerDna
            ? $careerDna->careers()
                ->orderByPivot('match_percentage', 'desc')
                ->get()
                ->map(fn ($career, $index) => [
                    'id' => $career->id,
                    'name' => $career->name,
                    'category' => $career->category,
                    'salary_range' => $career->salary_range,
                    'skills' => $career->skills,
                    'match_percentage' => (int) $career->pivot->match_percentage,
                    'locked' => !$user && $index >= self::FREE_UNLOCKED_CAREERS,
                ])
                ->values()
            : [];

        return response()->json([
            'career_dna' => $careerDna
                ? [
                    'key' => $careerDna->key,
                    'name' => $careerDna->name,
                    'tagline' => $careerDna->tagline,
                    'description' => $careerDna->description,
                ]
                : null,
            'traits' => $normalized,
            'careers' => $careers,
            'career_score' => $careerDna ? $this->topMatchPercentage($careerDna) : 0,
            'persisted' => $persisted,
        ]);
    }

    private function findBestCareerDna(array $normalized): ?CareerDNA
    {
        $best = null;
        $bestScore = -1.0;

        foreach (CareerDNA::all() as $dna) {
            $profile = $dna->trait_profile ?? [];

            $score = collect(self::TRAITS)->reduce(
                fn (float $carry, string $trait) => $carry
                    + ($normalized[$trait] ?? 0) * (int) ($profile[$trait] ?? 0),
                0.0
            );

            if ($score > $bestScore) {
                $bestScore = $score;
                $best = $dna;
            }
        }

        return $best;
    }

    private function topMatchPercentage(CareerDNA $dna): int
    {
        return (int) $dna->careers()->max('career_dna_career.match_percentage');
    }
}