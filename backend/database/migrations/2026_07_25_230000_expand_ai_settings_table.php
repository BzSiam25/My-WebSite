<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ai_settings', function (Blueprint $table) {
            $table->string('provider')->default('gemini')->after('id');
            $table->text('openai_api_key')->nullable()->after('api_key');
            $table->text('gemini_api_key')->nullable()->after('openai_api_key');
            $table->text('claude_api_key')->nullable()->after('gemini_api_key');
            $table->integer('max_tokens')->default(1000)->after('temperature');
            $table->text('greeting_message')->nullable()->after('max_tokens');
            $table->text('fallback_message')->nullable()->after('greeting_message');
            $table->boolean('is_enabled')->default(true)->after('fallback_message');
            $table->json('allowed_modules')->nullable()->after('is_enabled');
            $table->integer('rate_limit')->default(60)->after('allowed_modules');
            $table->integer('conversation_memory')->default(10)->after('rate_limit');
        });
    }

    public function down(): void
    {
        Schema::table('ai_settings', function (Blueprint $table) {
            $table->dropColumn([
                'provider',
                'openai_api_key',
                'gemini_api_key',
                'claude_api_key',
                'max_tokens',
                'greeting_message',
                'fallback_message',
                'is_enabled',
                'allowed_modules',
                'rate_limit',
                'conversation_memory'
            ]);
        });
    }
};
