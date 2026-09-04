<?php

namespace Database\Seeders;

use App\Models\InterviewQuestion;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        InterviewQuestion::query()->delete();

        $questions = [
            ['Motivational', "Tell me about yourself and why you're interested in investment banking."],
            ['Behavioral', 'Tell me about a time you demonstrated leadership under pressure.'],
            ['Technical', 'Walk me through a DCF valuation.'],
            ['Situational', 'What would you do if a team member disagreed with your analysis?'],
        ];

        foreach ($questions as [$type, $q]) {
            InterviewQuestion::create([
                'type' => $type,
                'question_text' => $q,
            ]);
        }
    }
}
