<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('university')->nullable()->after('name');
            $table->string('field_of_study')->nullable()->after('university');
            $table->integer('career_score')->default(0)->after('field_of_study');
            $table->integer('interview_score')->default(0)->after('career_score');
            $table->string('avatar_url')->nullable()->after('interview_score');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'university',
                'field_of_study',
                'career_score',
                'interview_score',
                'avatar_url',
            ]);
        });
    }
};
