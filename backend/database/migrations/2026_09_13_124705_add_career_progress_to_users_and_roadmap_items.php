<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->json('career_traits')->nullable()->after('career_readiness');
            $table->json('career_levels')->nullable()->after('career_traits');
        });

        Schema::table('roadmap_items', function (Blueprint $table) {
            $table->string('requirement_key')->nullable()->after('sort_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('roadmap_items', function (Blueprint $table) {
            $table->dropColumn('requirement_key');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['career_traits', 'career_levels']);
        });
    }
};
