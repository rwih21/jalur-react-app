<?php

namespace App\Models;

use Database\Factories\CareerRequirementFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['career_id', 'key', 'label', 'target_level', 'importance', 'suggested_actions'])]
class CareerRequirement extends Model
{
    /** @use HasFactory<CareerRequirementFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'suggested_actions' => 'array',
        ];
    }

    /** @return BelongsTo<Career, $this> */
    public function career(): BelongsTo
    {
        return $this->belongsTo(Career::class);
    }

    /** @return array<int, string> */
    public function getSuggestedActionsAttribute(mixed $value): array
    {
        $decoded = is_string($value) ? json_decode($value, true) : $value;

        return is_array($decoded) ? $decoded : [];
    }
}
