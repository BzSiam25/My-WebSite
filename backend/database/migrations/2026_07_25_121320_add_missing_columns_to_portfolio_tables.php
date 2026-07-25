<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Projects
        Schema::table('projects', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('name');
            $table->integer('year')->nullable()->after('category');
            $table->string('role')->nullable()->after('year');
            $table->string('client')->nullable()->after('role');
            $table->string('duration')->nullable()->after('client');
            $table->text('full_description')->nullable()->after('description');
            $table->string('cover_image')->nullable()->after('images');
            $table->json('gallery_images')->nullable()->after('cover_image');
            $table->string('video_url')->nullable()->after('video');
            $table->json('tags')->nullable()->after('tech_stack');
            $table->enum('publish_status', ['published', 'draft'])->default('published')->after('featured');
            $table->boolean('enabled')->default(true)->after('publish_status');
            $table->string('seo_title')->nullable()->after('enabled');
            $table->text('seo_description')->nullable()->after('seo_title');
            $table->softDeletes();
        });

        // 2. Skills
        Schema::table('skills', function (Blueprint $table) {
            $table->boolean('enabled')->default(true)->after('display_order');
            $table->string('color')->nullable()->after('enabled');
            $table->string('icon_url')->nullable()->after('color');
            $table->softDeletes();
        });

        // 3. Experiences
        Schema::table('experiences', function (Blueprint $table) {
            $table->json('responsibilities')->nullable()->after('description');
            $table->boolean('enabled')->default(true)->after('sort_order');
            $table->softDeletes();
        });

        // 4. Education
        Schema::table('education', function (Blueprint $table) {
            $table->boolean('enabled')->default(true)->after('description');
            $table->integer('sort_order')->default(0)->after('enabled');
            $table->softDeletes();
        });

        // 5. Research
        Schema::table('research', function (Blueprint $table) {
            $table->string('research_area')->nullable()->after('status');
            $table->boolean('featured')->default(false)->after('research_area');
            $table->string('paper_link')->nullable()->after('researchgate_link');
            $table->boolean('enabled')->default(true)->after('paper_link');
            $table->enum('publish_status', ['published', 'draft'])->default('published')->after('enabled');
            $table->softDeletes();
        });

        // 6. Certificates
        Schema::table('certificates', function (Blueprint $table) {
            $table->boolean('enabled')->default(true)->after('image');
            $table->integer('sort_order')->default(0)->after('enabled');
            $table->softDeletes();
        });

        // 7. Journeys
        Schema::table('journeys', function (Blueprint $table) {
            $table->boolean('enabled')->default(true)->after('videos');
            $table->integer('sort_order')->default(0)->after('enabled');
            $table->softDeletes();
        });

        // 8. Contacts
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('twitter')->nullable()->after('facebook');
            $table->string('instagram')->nullable()->after('twitter');
            $table->string('youtube')->nullable()->after('instagram');
            $table->string('portfolio_url')->nullable()->after('google_maps');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn([
                'slug', 'year', 'role', 'client', 'duration', 'full_description',
                'cover_image', 'gallery_images', 'video_url', 'tags',
                'publish_status', 'enabled', 'seo_title', 'seo_description'
            ]);
        });

        Schema::table('skills', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn(['enabled', 'color', 'icon_url']);
        });

        Schema::table('experiences', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn(['responsibilities', 'enabled']);
        });

        Schema::table('education', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn(['enabled', 'sort_order']);
        });

        Schema::table('research', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn(['research_area', 'featured', 'paper_link', 'enabled', 'publish_status']);
        });

        Schema::table('certificates', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn(['enabled', 'sort_order']);
        });

        Schema::table('journeys', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn(['enabled', 'sort_order']);
        });

        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn(['twitter', 'instagram', 'youtube', 'portfolio_url']);
        });
    }
};
