<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CareerSeeder::class,
            CareerDNASeeder::class,
            CareerDNAMatchSeeder::class,
            ProfessionalSeeder::class,
            QuestionSeeder::class,
            AssessmentQuestionSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Jeremia',
            'email' => 'jeremia@example.com',
            'university' => 'Universitas Airlangga',
            'field_of_study' => 'Finance',
            'career_score' => 78,
            'interview_score' => 84,
        ]);
        User::factory()->create([
            'name' => 'Robby',
            'email' => 'robby@example.com',
            'university' => 'BINUS University',
            'field_of_study' => 'Computer Science',
            'career_score' => 76,
            'interview_score' => 67,
        ]);
    }
}
