<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('career_dna_career', function (Blueprint $table) {
            $table->id();
            $table->foreignId('career_dna_id')->constrained()->cascadeOnDelete();
            $table->foreignId('career_id')->constrained()->cascadeOnDelete();
            $table->integer('match_percentage')->default(0);
            $table->timestamps();

            $table->unique(['career_dna_id', 'career_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('career_dna_career');
    }
};