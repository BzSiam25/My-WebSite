<?php

use App\Http\Controllers\PublicController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\CurrentFocusController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\JourneyController;
use App\Http\Controllers\Admin\ResearchController;
use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\SeoController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\AuditLogController;
use App\Http\Controllers\Admin\BackupController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

// ==========================================
// HEALTH CHECK ENDPOINT (Railway Audit)
// ==========================================
Route::get('/health', function () {
    try {
        \Illuminate\Support\Facades\DB::connection()->getPdo();
        $dbStatus = 'connected';
    } catch (\Exception $e) {
        $dbStatus = 'disconnected: ' . $e->getMessage();
    }

    return response()->json([
        'status' => 'healthy',
        'environment' => config('app.env'),
        'timestamp' => now()->toIso8601String(),
        'database' => $dbStatus,
        'storage_disk' => config('filesystems.default'),
    ]);
});

// ==========================================
// PUBLIC PORTFOLIO ENDPOINTS
// ==========================================
Route::get('/hero', [PublicController::class, 'getHero']);
Route::get('/about', [PublicController::class, 'getAbout']);
Route::get('/current-focus', [PublicController::class, 'getCurrentFocus']);
Route::get('/experiences', [PublicController::class, 'getExperiences']);
Route::get('/projects', [PublicController::class, 'getProjects']);
Route::get('/skills', [PublicController::class, 'getSkills']);
Route::get('/education', [PublicController::class, 'getEducation']);
Route::get('/research', [PublicController::class, 'getResearch']);
Route::get('/certificates', [PublicController::class, 'getCertificates']);
Route::get('/journeys', [PublicController::class, 'getJourneys']);
Route::get('/photography', [PublicController::class, 'getPhotography']);
Route::get('/blog', [PublicController::class, 'getBlog']);
Route::get('/blog/{slug}', [PublicController::class, 'getBlogPost']);
Route::get('/contact', [PublicController::class, 'getContact']);
Route::get('/seo', [PublicController::class, 'getSeo']);
Route::get('/settings', [PublicController::class, 'getSettings']);
Route::get('/github', [PublicController::class, 'getGithubStats']);
Route::post('/chat', [PublicController::class, 'chat']);
Route::get('/coming-soon', [PublicController::class, 'getComingSoon']);

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================
Route::post('/auth/login', [AuthController::class, 'login']);

// ==========================================
// SECURED ADMIN ENDPOINTS (Sanctum)
// ==========================================
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::get('/admin/dashboard', [AuthController::class, 'getDashboardStats']);

    // Hero CMS
    Route::get('/admin/hero', [HeroController::class, 'show']);
    Route::post('/admin/hero', [HeroController::class, 'update']);

    // About CMS
    Route::get('/admin/about', [AboutController::class, 'show']);
    Route::post('/admin/about', [AboutController::class, 'update']);

    // Current Focus CRUD
    Route::get('/admin/current-focus', [CurrentFocusController::class, 'index']);
    Route::post('/admin/current-focus', [CurrentFocusController::class, 'store']);
    Route::get('/admin/current-focus/{id}', [CurrentFocusController::class, 'show']);
    Route::put('/admin/current-focus/{id}', [CurrentFocusController::class, 'update']);
    Route::delete('/admin/current-focus/{id}', [CurrentFocusController::class, 'destroy']);
    Route::post('/admin/current-focus/{id}/restore', [CurrentFocusController::class, 'restore']);
    Route::patch('/admin/current-focus/{id}/toggle-enabled', [CurrentFocusController::class, 'toggleEnabled']);
    Route::post('/admin/current-focus/reorder', [CurrentFocusController::class, 'reorder']);

    // Experiences CRUD
    Route::get('/admin/experiences', [ExperienceController::class, 'index']);
    Route::post('/admin/experiences', [ExperienceController::class, 'store']);
    Route::get('/admin/experiences/{id}', [ExperienceController::class, 'show']);
    Route::put('/admin/experiences/{id}', [ExperienceController::class, 'update']);
    Route::delete('/admin/experiences/{id}', [ExperienceController::class, 'destroy']);
    Route::post('/admin/experiences/{id}/restore', [ExperienceController::class, 'restore']);
    Route::patch('/admin/experiences/{id}/toggle-enabled', [ExperienceController::class, 'toggleEnabled']);
    Route::post('/admin/experiences/reorder', [ExperienceController::class, 'reorder']);

    // Projects CRUD
    Route::get('/admin/projects', [ProjectController::class, 'index']);
    Route::post('/admin/projects', [ProjectController::class, 'store']);
    Route::get('/admin/projects/{id}', [ProjectController::class, 'show']);
    Route::put('/admin/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/admin/projects/{id}', [ProjectController::class, 'destroy']);
    Route::post('/admin/projects/{id}/restore', [ProjectController::class, 'restore']);
    Route::patch('/admin/projects/{id}/toggle-publish', [ProjectController::class, 'togglePublish']);
    Route::patch('/admin/projects/{id}/toggle-featured', [ProjectController::class, 'toggleFeatured']);
    Route::patch('/admin/projects/{id}/toggle-enabled', [ProjectController::class, 'toggleEnabled']);
    Route::post('/admin/projects/reorder', [ProjectController::class, 'reorder']);

    // Skills CRUD
    Route::get('/admin/skills', [SkillController::class, 'index']);
    Route::post('/admin/skills', [SkillController::class, 'store']);
    Route::get('/admin/skills/{id}', [SkillController::class, 'show']);
    Route::put('/admin/skills/{id}', [SkillController::class, 'update']);
    Route::delete('/admin/skills/{id}', [SkillController::class, 'destroy']);
    Route::post('/admin/skills/{id}/restore', [SkillController::class, 'restore']);
    Route::patch('/admin/skills/{id}/toggle-enabled', [SkillController::class, 'toggleEnabled']);
    Route::post('/admin/skills/reorder', [SkillController::class, 'reorder']);

    // Education CRUD
    Route::get('/admin/education', [EducationController::class, 'index']);
    Route::post('/admin/education', [EducationController::class, 'store']);
    Route::get('/admin/education/{id}', [EducationController::class, 'show']);
    Route::put('/admin/education/{id}', [EducationController::class, 'update']);
    Route::delete('/admin/education/{id}', [EducationController::class, 'destroy']);
    Route::post('/admin/education/{id}/restore', [EducationController::class, 'restore']);
    Route::patch('/admin/education/{id}/toggle-enabled', [EducationController::class, 'toggleEnabled']);
    Route::post('/admin/education/reorder', [EducationController::class, 'reorder']);

    // Research CRUD
    Route::get('/admin/research', [ResearchController::class, 'index']);
    Route::post('/admin/research', [ResearchController::class, 'store']);
    Route::get('/admin/research/{id}', [ResearchController::class, 'show']);
    Route::put('/admin/research/{id}', [ResearchController::class, 'update']);
    Route::delete('/admin/research/{id}', [ResearchController::class, 'destroy']);
    Route::post('/admin/research/{id}/restore', [ResearchController::class, 'restore']);
    Route::patch('/admin/research/{id}/toggle-publish', [ResearchController::class, 'togglePublish']);
    Route::patch('/admin/research/{id}/toggle-featured', [ResearchController::class, 'toggleFeatured']);
    Route::patch('/admin/research/{id}/toggle-enabled', [ResearchController::class, 'toggleEnabled']);

    // Certificates CRUD
    Route::get('/admin/certificates', [CertificateController::class, 'index']);
    Route::post('/admin/certificates', [CertificateController::class, 'store']);
    Route::get('/admin/certificates/{id}', [CertificateController::class, 'show']);
    Route::put('/admin/certificates/{id}', [CertificateController::class, 'update']);
    Route::delete('/admin/certificates/{id}', [CertificateController::class, 'destroy']);
    Route::post('/admin/certificates/{id}/restore', [CertificateController::class, 'restore']);
    Route::patch('/admin/certificates/{id}/toggle-enabled', [CertificateController::class, 'toggleEnabled']);
    Route::post('/admin/certificates/reorder', [CertificateController::class, 'reorder']);

    // Journeys CRUD
    Route::get('/admin/journeys', [JourneyController::class, 'index']);
    Route::post('/admin/journeys', [JourneyController::class, 'store']);
    Route::get('/admin/journeys/{id}', [JourneyController::class, 'show']);
    Route::put('/admin/journeys/{id}', [JourneyController::class, 'update']);
    Route::delete('/admin/journeys/{id}', [JourneyController::class, 'destroy']);
    Route::post('/admin/journeys/{id}/restore', [JourneyController::class, 'restore']);
    Route::patch('/admin/journeys/{id}/toggle-enabled', [JourneyController::class, 'toggleEnabled']);
    Route::post('/admin/journeys/reorder', [JourneyController::class, 'reorder']);

    // Contact CMS
    Route::get('/admin/contact', [ContactController::class, 'show']);
    Route::post('/admin/contact', [ContactController::class, 'update']);

    // SEO CMS
    Route::get('/admin/seo', [SeoController::class, 'show']);
    Route::post('/admin/seo', [SeoController::class, 'update']);

    // Settings CMS
    Route::get('/admin/settings', [SettingController::class, 'show']);
    Route::post('/admin/settings', [SettingController::class, 'update']);

    // Media Library
    Route::get('/admin/media', [MediaController::class, 'index']);
    Route::post('/admin/media', [MediaController::class, 'store']);
    Route::delete('/admin/media/{id}', [MediaController::class, 'destroy']);

    // Audit Logs
    Route::get('/admin/audit-logs', [AuditLogController::class, 'index']);

    // Backups
    Route::get('/admin/backups', [BackupController::class, 'index']);
    Route::post('/admin/backups/database', [BackupController::class, 'createDatabaseBackup']);
    Route::get('/admin/backups/{id}/download', [BackupController::class, 'download']);
    Route::delete('/admin/backups/{id}', [BackupController::class, 'destroy']);

    // Photography & Blog (Legacy fallback routes)
    Route::get('/admin/photography/albums', [AdminController::class, 'indexPhotographyAlbums']);
    Route::post('/admin/photography/albums', [AdminController::class, 'storePhotographyAlbum']);
    Route::put('/admin/photography/albums/{id}', [AdminController::class, 'updatePhotographyAlbum']);
    Route::delete('/admin/photography/albums/{id}', [AdminController::class, 'destroyPhotographyAlbum']);

    Route::get('/admin/photography/categories', [AdminController::class, 'indexPhotographyCategories']);
    Route::post('/admin/photography/categories', [AdminController::class, 'storePhotographyCategory']);
    Route::put('/admin/photography/categories/{id}', [AdminController::class, 'updatePhotographyCategory']);
    Route::delete('/admin/photography/categories/{id}', [AdminController::class, 'destroyPhotographyCategory']);

    Route::get('/admin/photography/images', [AdminController::class, 'indexPhotographyImages']);
    Route::post('/admin/photography/images', [AdminController::class, 'storePhotographyImage']);
    Route::put('/admin/photography/images/{id}', [AdminController::class, 'updatePhotographyImage']);
    Route::delete('/admin/photography/images/{id}', [AdminController::class, 'destroyPhotographyImage']);

    Route::get('/admin/blog/categories', [AdminController::class, 'indexBlogCategories']);
    Route::post('/admin/blog/categories', [AdminController::class, 'storeBlogCategory']);
    Route::put('/admin/blog/categories/{id}', [AdminController::class, 'updateBlogCategory']);
    Route::delete('/admin/blog/categories/{id}', [AdminController::class, 'destroyBlogCategory']);

    Route::get('/admin/blog/tags', [AdminController::class, 'indexBlogTags']);
    Route::post('/admin/blog/tags', [AdminController::class, 'storeBlogTag']);
    Route::put('/admin/blog/tags/{id}', [AdminController::class, 'updateBlogTag']);
    Route::delete('/admin/blog/tags/{id}', [AdminController::class, 'destroyBlogTag']);

    Route::get('/admin/blog/posts', [AdminController::class, 'indexBlogPosts']);
    Route::post('/admin/blog/posts', [AdminController::class, 'storeBlogPost']);
    Route::put('/admin/blog/posts/{id}', [AdminController::class, 'updateBlogPost']);
    Route::delete('/admin/blog/posts/{id}', [AdminController::class, 'destroyBlogPost']);

    Route::get('/admin/ai-settings', [AdminController::class, 'getAiSettings']);
    Route::post('/admin/ai-settings', [AdminController::class, 'updateAiSettings']);
    Route::post('/admin/ai-settings/clear-cache', [AdminController::class, 'clearAiCache']);
    Route::get('/admin/coming-soon', [AdminController::class, 'getComingSoon']);
    Route::post('/admin/coming-soon', [AdminController::class, 'updateComingSoon']);
    Route::get('/admin/users', [AdminController::class, 'getUsers']);
    Route::post('/admin/users', [AdminController::class, 'storeUser']);
    Route::put('/admin/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'destroyUser']);
});
