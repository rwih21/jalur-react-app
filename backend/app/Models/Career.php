<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['name', 'category', 'match_percentage', 'salary_range', 'skills'])]
class Career extends Model
{
    use HasFactory;

    public function scopeFilterByCategory($query, ?string $category)
    {
        if ($category && $category !== 'All') {
            $query->where('category', $category);
        }

        return $query;
    }

    public function careerDnas(): BelongsToMany
    {
        return $this->belongsToMany(CareerDNA::class, 'career_dna_career', 'career_id', 'career_dna_id')
            ->withPivot('match_percentage');
    }
}