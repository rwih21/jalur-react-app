<?php

namespace Database\Seeders;

use App\Models\Career;
use App\Models\CareerDNA;
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
            CareerRequirementSeeder::class,
            ProfessionalSeeder::class,
            QuestionSeeder::class,
            AssessmentQuestionSeeder::class,
        ]);

        $analytical = CareerDNA::where('key', 'analytical_strategist')->first();
        $ib = Career::where('name', 'Investment Banking')->first();

        $jeremiaTraits = [
            'analytical' => 30,
            'leadership' => 18,
            'communication' => 14,
            'commercial' => 22,
            'technical' => 8,
            'creative' => 3,
            'execution' => 5,
        ];
        $jeremiaLevels = [
            'financial_modeling' => 2,
            'valuation' => 2,
            'excel' => 3,
            'technical_interviews' => 2,
            'markets_interest' => 3,
            'networking' => 2,
            'internships' => 2,
            'gpa' => 3,
        ];

        User::factory()->create([
            'name' => 'Jeremia',
            'email' => 'jeremia@example.com',
            'university' => 'Universitas Airlangga',
            'field_of_study' => 'Finance',
            'career_score' => 78,
            'interview_score' => 84,
            'career_dna_id' => $analytical?->id,
            'career_id' => $ib?->id,
            'career_readiness' => 73,
            'career_traits' => $jeremiaTraits,
            'career_levels' => $jeremiaLevels,
        ]);

        $technical = CareerDNA::where('key', 'technical_builder')->first();
        $swe = Career::where('name', 'Software Engineer')->first();

        $robbyTraits = [
            'analytical' => 24,
            'leadership' => 8,
            'communication' => 12,
            'commercial' => 5,
            'technical' => 32,
            'creative' => 9,
            'execution' => 10,
        ];
        $robbyLevels = [
            'programming' => 3,
            'data_structures' => 2,
            'system_design' => 2,
            'version_control' => 3,
            'software_projects' => 3,
            'cloud_eng' => 2,
            'internships' => 2,
            'certifications' => 1,
        ];

        User::factory()->create([
            'name' => 'Robby',
            'email' => 'robby@example.com',
            'university' => 'BINUS University',
            'field_of_study' => 'Computer Science',
            'career_score' => 76,
            'interview_score' => 67,
            'career_dna_id' => $technical?->id,
            'career_id' => $swe?->id,
            'career_readiness' => 72,
            'career_traits' => $robbyTraits,
            'career_levels' => $robbyLevels,
        ]);
    }
}
