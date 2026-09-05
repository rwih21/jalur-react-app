<?php

namespace Database\Seeders;

use App\Models\Career;
use App\Models\CareerDNA;
use Illuminate\Database\Seeder;

class CareerDNAMatchSeeder extends Seeder
{
    public function run(): void
    {
        $byKey = CareerDNA::pluck('id', 'key');
        $byName = Career::pluck('id', 'name');

        $matches = [
            'analytical_strategist' => [
                'Investment Banking' => 94,
                'Private Equity' => 92,
                'Management Consulting' => 88,
                'Product Management' => 76,
            ],
            'people_leader' => [
                'Management Consulting' => 90,
                'Product Management' => 84,
                'Investment Banking' => 62,
                'Private Equity' => 58,
            ],
            'commercial_driver' => [
                'Private Equity' => 95,
                'Investment Banking' => 86,
                'Management Consulting' => 80,
                'Product Management' => 70,
            ],
            'technical_builder' => [
                'Product Management' => 93,
                'Management Consulting' => 72,
                'Investment Banking' => 58,
                'Private Equity' => 55,
            ],
            'creative_pioneer' => [
                'Product Management' => 78,
                'Management Consulting' => 70,
                'Investment Banking' => 48,
                'Private Equity' => 42,
            ],
            'operational_executor' => [
                'Product Management' => 88,
                'Management Consulting' => 82,
                'Investment Banking' => 68,
                'Private Equity' => 64,
            ],
        ];

        foreach ($matches as $key => $careers) {
            $dna = CareerDNA::find($byKey[$key]);
            foreach ($careers as $careerName => $match) {
                $dna->careers()->attach($byName[$careerName], [
                    'match_percentage' => $match,
                ]);
            }
        }
    }
}