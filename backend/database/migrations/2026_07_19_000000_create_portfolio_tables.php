<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('short_name');
            $table->string('designation');
            $table->string('subtitle');
            $table->text('description');
            $table->string('resume_pdf')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('cta_buttons')->nullable();
            $table->json('social_links')->nullable();
            $table->timestamps();
        });

        Schema::create('about', function (Blueprint $table) {
            $table->id();
            $table->text('biography');
            $table->text('career_objective');
            $table->json('core_strengths')->nullable();
            $table->json('quick_facts')->nullable();
            $table->json('statistics')->nullable();
            $table->timestamps();
        });

        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('company_logo')->nullable();
            $table->string('role');
            $table->string('employment_type')->nullable();
            $table->string('location')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('current_position')->default(false);
            $table->text('description');
            $table->json('technologies')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->text('description');
            $table->text('problem_statement')->nullable();
            $table->text('solution')->nullable();
            $table->json('tech_stack')->nullable();
            $table->json('images')->nullable();
            $table->string('video')->nullable();
            $table->string('github_url')->nullable();
            $table->string('live_url')->nullable();
            $table->string('research_url')->nullable();
            $table->boolean('featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('icon');
            $table->string('category');
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->string('university');
            $table->string('degree');
            $table->string('department');
            $table->string('cgpa');
            $table->string('duration');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('research', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('authors');
            $table->string('conference')->nullable();
            $table->string('journal')->nullable();
            $table->string('publisher')->nullable();
            $table->string('doi')->nullable();
            $table->integer('year');
            $table->text('abstract');
            $table->string('status');
            $table->string('researchgate_link')->nullable();
            $table->string('pdf')->nullable();
            $table->json('images')->nullable();
            $table->timestamps();
        });

        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('issuer');
            $table->date('issue_date');
            $table->string('credential_id')->nullable();
            $table->string('credential_url')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::create('journeys', function (Blueprint $table) {
            $table->id();
            $table->string('date');
            $table->string('title');
            $table->text('description');
            $table->json('images')->nullable();
            $table->json('videos')->nullable();
            $table->timestamps();
        });

        Schema::create('photography_albums', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->timestamps();
        });

        Schema::create('photography_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('photography_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('album_id')->nullable()->constrained('photography_albums')->nullOnDelete();
            $table->foreignId('category_id')->nullable()->constrained('photography_categories')->nullOnDelete();
            $table->string('url');
            $table->string('caption')->nullable();
            $table->json('tags')->nullable();
            $table->timestamps();
        });

        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('blog_tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('body');
            $table->foreignId('category_id')->nullable()->constrained('blog_categories')->nullOnDelete();
            $table->json('tags')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('seo_keywords')->nullable();
            $table->boolean('draft')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('phone');
            $table->string('whatsapp')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('github')->nullable();
            $table->string('researchgate')->nullable();
            $table->string('facebook')->nullable();
            $table->string('location');
            $table->text('google_maps')->nullable();
            $table->timestamps();
        });

        Schema::create('seos', function (Blueprint $table) {
            $table->id();
            $table->string('site_title');
            $table->text('meta_description');
            $table->string('keywords')->nullable();
            $table->string('og_image')->nullable();
            $table->string('twitter_card')->nullable();
            $table->string('canonical_url')->nullable();
            $table->string('robots')->nullable();
            $table->string('sitemap_url')->nullable();
            $table->json('json_ld')->nullable();
            $table->timestamps();
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name');
            $table->string('logo')->nullable();
            $table->string('favicon')->nullable();
            $table->string('footer_text')->nullable();
            $table->string('google_analytics')->nullable();
            $table->string('google_search_console')->nullable();
            $table->json('theme_settings')->nullable();
            $table->string('resume_file')->nullable();
            $table->string('github_username')->nullable();
            $table->timestamps();
        });

        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('filepath');
            $table->string('file_type');
            $table->integer('file_size');
            $table->string('folder')->default('uploads');
            $table->timestamps();
        });

        Schema::create('ai_settings', function (Blueprint $table) {
            $table->id();
            $table->text('system_prompt');
            $table->text('knowledge_base');
            $table->string('model')->default('gemini-1.5-flash');
            $table->float('temperature')->default(0.7);
            $table->text('api_key')->nullable(); // encrypted
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_settings');
        Schema::dropIfExists('media');
        Schema::dropIfExists('settings');
        Schema::dropIfExists('seos');
        Schema::dropIfExists('contacts');
        Schema::dropIfExists('blog_posts');
        Schema::dropIfExists('blog_tags');
        Schema::dropIfExists('blog_categories');
        Schema::dropIfExists('photography_images');
        Schema::dropIfExists('photography_categories');
        Schema::dropIfExists('photography_albums');
        Schema::dropIfExists('journeys');
        Schema::dropIfExists('certificates');
        Schema::dropIfExists('research');
        Schema::dropIfExists('education');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('about');
        Schema::dropIfExists('hero');
    }
};
