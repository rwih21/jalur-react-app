<?php

namespace Database\Factories;

use App\Models\Career;
use App\Models\CareerRequirement;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CareerRequirement>
 */
class CareerRequirementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'career_id' => Career::factory(),
            'key' => $this->faker->unique()->word(),
            'label' => $this->faker->words(3, true),
            'target_level' => $this->faker->numberBetween(2, 5),
            'importance' => $this->faker->randomElement(['high', 'medium']),
            'suggested_actions' => [$this->faker->sentence(), $this->faker->sentence()],
        ];
    }
}
