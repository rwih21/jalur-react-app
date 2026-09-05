<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['key', 'name', 'tagline', 'description', 'trait_profile'])]
class CareerDNA extends Model
{
    use HasFactory;

    protected $table = 'career_dnas';

    protected function casts(): array
    {
        return [
            'trait_profile' => 'array',
        ];
    }

    public function careers(): BelongsToMany
    {
        return $this->belongsToMany(Career::class, 'career_dna_career', 'career_dna_id', 'career_id')
            ->withPivot('match_percentage');
    }
}