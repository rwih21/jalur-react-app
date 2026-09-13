<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('career_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('career_id')->constrained()->cascadeOnDelete();
            $table->string('key');
            $table->string('label');
            $table->unsignedTinyInteger('target_level')->default(3);
            $table->string('importance')->default('medium'); // high | medium
            $table->json('suggested_actions');
            $table->timestamps();

            $table->unique(['career_id', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('career_requirements');
    }
};
