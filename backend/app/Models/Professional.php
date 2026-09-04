<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'title', 'company', 'industry', 'match_percentage', 'warmth'])]
class Professional extends Model
{
    use HasFactory;

    public function scopeFilterByIndustry($query, ?string $industry)
    {
        if ($industry && $industry !== 'All') {
            $query->where('industry', $industry);
        }

        return $query;
    }
}
