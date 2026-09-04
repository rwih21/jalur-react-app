<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
