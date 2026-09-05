<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('career_dnas', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('name');
            $table->string('tagline');
            $table->text('description');
            $table->json('trait_profile');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('career_dnas');
    }
};