<?php

namespace Database\Seeders;

use App\Models\Professional;
use Illuminate\Database\Seeder;

class ProfessionalSeeder extends Seeder
{
    public function run(): void
    {
        Professional::query()->delete();

        $people = [
            ['Nadia Rahman', 'Investment Banking Associate', 'Mandiri Sekuritas', 'Finance', 96, 'Very Warm'],
            ['Andi Pratama', 'Investment Banking Analyst', 'Goldman Sachs', 'Finance', 94, 'Relevant'],
            ['Rizky Mahendra', 'Business Analyst', 'McKinsey & Company', 'Consulting', 89, 'Warm'],
            ['Clara Wijaya', 'Private Equity Associate', 'Northstar Group', 'Investment', 87, 'Relevant'],
            ['Alya Putri', 'Product Manager', 'GoTo', 'Technology', 76, 'Relevant'],
            ['Kevin Santoso', 'Senior Brand Manager', 'Unilever Indonesia', 'FMCG', 73, 'Very Warm'],
        ];

        foreach ($people as [$name, $title, $company, $industry, $match, $warmth]) {
            Professional::create([
                'name' => $name,
                'title' => $title,
                'company' => $company,
                'industry' => $industry,
                'match_percentage' => $match,
                'warmth' => $warmth,
            ]);
        }
    }
}
