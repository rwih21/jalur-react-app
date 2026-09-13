<?php

namespace Database\Seeders;

use App\Models\Career;
use Illuminate\Database\Seeder;

class CareerSeeder extends Seeder
{
    public function run(): void
    {
        Career::query()->delete();

        $careers = [
            ['Investment Banking', 'Finance', 94, 'Rp8-18 jt', 'Valuation, Excel, Financial Modeling'],
            ['Management Consulting', 'Consulting', 91, 'Rp10-22 jt', 'Problem Solving, PowerPoint'],
            ['Private Equity', 'Investment', 87, 'Rp12-25 jt', 'Due Diligence, Valuation'],
            ['Product Management', 'Technology', 79, 'Rp9-20 jt', 'Product Sense, Data'],
            ['Software Engineer', 'Technology', 72, 'Rp10-25 jt', 'Programming, Data Structures, System Design'],
            ['Data Analyst', 'Data', 68, 'Rp8-18 jt', 'SQL, Statistics, Visualization'],
        ];

        foreach ($careers as [$name, $category, $match, $salary, $skills]) {
            Career::create([
                'name' => $name,
                'category' => $category,
                'match_percentage' => $match,
                'salary_range' => $salary,
                'skills' => $skills,
            ]);
        }
    }
}
