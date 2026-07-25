<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use App\Models\About;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Education;
use App\Models\Research;
use App\Models\Certificate;
use App\Models\Journey;
use App\Models\PhotographyAlbum;
use App\Models\PhotographyCategory;
use App\Models\PhotographyImage;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use App\Models\BlogPost;
use App\Models\Contact;
use App\Models\Seo;
use App\Models\Setting;
use App\Models\Media;
use App\Models\AiSetting;
use App\Services\AiKnowledgeService;
use App\Models\User;
use App\Models\ComingSoonSection;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // ==========================================
    // HERO CMS
    // ==========================================
    public function getHero() {
        return response()->json(Hero::first() ?: []);
    }
    public function updateHero(Request $request) {
        $hero = Hero::first() ?: new Hero();
        $data = $request->validate([
            'name' => 'required|string',
            'short_name' => 'required|string',
            'designation' => 'required|string',
            'subtitle' => 'required|string',
            'description' => 'required|string',
            'resume_pdf' => 'nullable|string',
            'profile_image' => 'nullable|string',
            'hero_image' => 'nullable|string',
            'cta_buttons' => 'nullable|array',
            'social_links' => 'nullable|array',
        ]);
        $hero->fill($data);
        $hero->save();
        return response()->json($hero);
    }

    // ==========================================
    // ABOUT CMS
    // ==========================================
    public function getAbout() {
        return response()->json(About::first() ?: []);
    }
    public function updateAbout(Request $request) {
        $about = About::first() ?: new About();
        $data = $request->validate([
            'biography' => 'required|string',
            'career_objective' => 'required|string',
            'core_strengths' => 'nullable|array',
            'quick_facts' => 'nullable|array',
            'statistics' => 'nullable|array',
        ]);
        $about->fill($data);
        $about->save();
        return response()->json($about);
    }

    // ==========================================
    // EXPERIENCE CRUD
    // ==========================================
    public function indexExperiences() {
        return response()->json(Experience::orderBy('sort_order')->orderBy('start_date', 'desc')->get());
    }
    public function storeExperience(Request $request) {
        $data = $request->validate([
            'company' => 'required|string',
            'company_logo' => 'nullable|string',
            'role' => 'required|string',
            'employment_type' => 'nullable|string',
            'location' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'current_position' => 'required|boolean',
            'description' => 'required|string',
            'technologies' => 'nullable|array',
            'sort_order' => 'required|integer',
        ]);
        $exp = Experience::create($data);
        return response()->json($exp, 201);
    }
    public function updateExperience(Request $request, $id) {
        $exp = Experience::findOrFail($id);
        $data = $request->validate([
            'company' => 'required|string',
            'company_logo' => 'nullable|string',
            'role' => 'required|string',
            'employment_type' => 'nullable|string',
            'location' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'current_position' => 'required|boolean',
            'description' => 'required|string',
            'technologies' => 'nullable|array',
            'sort_order' => 'required|integer',
        ]);
        $exp->update($data);
        return response()->json($exp);
    }
    public function destroyExperience($id) {
        $exp = Experience::findOrFail($id);
        $exp->delete();
        return response()->json(['message' => 'Experience deleted']);
    }

    // ==========================================
    // PROJECTS CRUD
    // ==========================================
    public function indexProjects() {
        return response()->json(Project::orderBy('sort_order')->get());
    }
    public function storeProject(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'description' => 'required|string',
            'problem_statement' => 'nullable|string',
            'solution' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'images' => 'nullable|array',
            'video' => 'nullable|string',
            'github_url' => 'nullable|string',
            'live_url' => 'nullable|string',
            'research_url' => 'nullable|string',
            'featured' => 'required|boolean',
            'sort_order' => 'required|integer',
        ]);
        $project = Project::create($data);
        return response()->json($project, 201);
    }
    public function updateProject(Request $request, $id) {
        $project = Project::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'description' => 'required|string',
            'problem_statement' => 'nullable|string',
            'solution' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'images' => 'nullable|array',
            'video' => 'nullable|string',
            'github_url' => 'nullable|string',
            'live_url' => 'nullable|string',
            'research_url' => 'nullable|string',
            'featured' => 'required|boolean',
            'sort_order' => 'required|integer',
        ]);
        $project->update($data);
        return response()->json($project);
    }
    public function destroyProject($id) {
        $project = Project::findOrFail($id);
        $project->delete();
        return response()->json(['message' => 'Project deleted']);
    }

    // ==========================================
    // SKILLS CRUD
    // ==========================================
    public function indexSkills() {
        return response()->json(Skill::orderBy('display_order')->get());
    }
    public function storeSkill(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'icon' => 'required|string',
            'category' => 'required|string',
            'display_order' => 'required|integer',
        ]);
        $skill = Skill::create($data);
        return response()->json($skill, 201);
    }
    public function updateSkill(Request $request, $id) {
        $skill = Skill::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string',
            'icon' => 'required|string',
            'category' => 'required|string',
            'display_order' => 'required|integer',
        ]);
        $skill->update($data);
        return response()->json($skill);
    }
    public function destroySkill($id) {
        $skill = Skill::findOrFail($id);
        $skill->delete();
        return response()->json(['message' => 'Skill deleted']);
    }

    // ==========================================
    // EDUCATION CRUD
    // ==========================================
    public function indexEducation() {
        return response()->json(Education::orderBy('duration', 'desc')->get());
    }
    public function storeEducation(Request $request) {
        $data = $request->validate([
            'university' => 'required|string',
            'degree' => 'required|string',
            'department' => 'required|string',
            'cgpa' => 'required|string',
            'duration' => 'required|string',
            'description' => 'nullable|string',
        ]);
        $edu = Education::create($data);
        return response()->json($edu, 201);
    }
    public function updateEducation(Request $request, $id) {
        $edu = Education::findOrFail($id);
        $data = $request->validate([
            'university' => 'required|string',
            'degree' => 'required|string',
            'department' => 'required|string',
            'cgpa' => 'required|string',
            'duration' => 'required|string',
            'description' => 'nullable|string',
        ]);
        $edu->update($data);
        return response()->json($edu);
    }
    public function destroyEducation($id) {
        $edu = Education::findOrFail($id);
        $edu->delete();
        return response()->json(['message' => 'Education record deleted']);
    }

    // ==========================================
    // RESEARCH CRUD
    // ==========================================
    public function indexResearch() {
        return response()->json(Research::orderBy('year', 'desc')->get());
    }
    public function storeResearch(Request $request) {
        $data = $request->validate([
            'title' => 'required|string',
            'authors' => 'required|string',
            'conference' => 'nullable|string',
            'journal' => 'nullable|string',
            'publisher' => 'nullable|string',
            'doi' => 'nullable|string',
            'year' => 'required|integer',
            'abstract' => 'required|string',
            'status' => 'required|string',
            'researchgate_link' => 'nullable|string',
            'pdf' => 'nullable|string',
            'images' => 'nullable|array',
        ]);
        $res = Research::create($data);
        return response()->json($res, 201);
    }
    public function updateResearch(Request $request, $id) {
        $res = Research::findOrFail($id);
        $data = $request->validate([
            'title' => 'required|string',
            'authors' => 'required|string',
            'conference' => 'nullable|string',
            'journal' => 'nullable|string',
            'publisher' => 'nullable|string',
            'doi' => 'nullable|string',
            'year' => 'required|integer',
            'abstract' => 'required|string',
            'status' => 'required|string',
            'researchgate_link' => 'nullable|string',
            'pdf' => 'nullable|string',
            'images' => 'nullable|array',
        ]);
        $res->update($data);
        return response()->json($res);
    }
    public function destroyResearch($id) {
        $res = Research::findOrFail($id);
        $res->delete();
        return response()->json(['message' => 'Research record deleted']);
    }

    // ==========================================
    // CERTIFICATES CRUD
    // ==========================================
    public function indexCertificates() {
        return response()->json(Certificate::orderBy('issue_date', 'desc')->get());
    }
    public function storeCertificate(Request $request) {
        $data = $request->validate([
            'title' => 'required|string',
            'issuer' => 'required|string',
            'issue_date' => 'required|date',
            'credential_id' => 'nullable|string',
            'credential_url' => 'nullable|string',
            'image' => 'nullable|string',
        ]);
        $cert = Certificate::create($data);
        return response()->json($cert, 201);
    }
    public function updateCertificate(Request $request, $id) {
        $cert = Certificate::findOrFail($id);
        $data = $request->validate([
            'title' => 'required|string',
            'issuer' => 'required|string',
            'issue_date' => 'required|date',
            'credential_id' => 'nullable|string',
            'credential_url' => 'nullable|string',
            'image' => 'nullable|string',
        ]);
        $cert->update($data);
        return response()->json($cert);
    }
    public function destroyCertificate($id) {
        $cert = Certificate::findOrFail($id);
        $cert->delete();
        return response()->json(['message' => 'Certificate deleted']);
    }

    // ==========================================
    // JOURNEY CRUD
    // ==========================================
    public function indexJourneys() {
        return response()->json(Journey::orderBy('id', 'desc')->get());
    }
    public function storeJourney(Request $request) {
        $data = $request->validate([
            'date' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'images' => 'nullable|array',
            'videos' => 'nullable|array',
        ]);
        $journey = Journey::create($data);
        return response()->json($journey, 201);
    }
    public function updateJourney(Request $request, $id) {
        $journey = Journey::findOrFail($id);
        $data = $request->validate([
            'date' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'images' => 'nullable|array',
            'videos' => 'nullable|array',
        ]);
        $journey->update($data);
        return response()->json($journey);
    }
    public function destroyJourney($id) {
        $journey = Journey::findOrFail($id);
        $journey->delete();
        return response()->json(['message' => 'Journey record deleted']);
    }

    // ==========================================
    // PHOTOGRAPHY ALBUMS CRUD
    // ==========================================
    public function indexPhotographyAlbums() {
        return response()->json(PhotographyAlbum::all());
    }
    public function storePhotographyAlbum(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string',
        ]);
        $data['slug'] = Str::slug($data['name']);
        $album = PhotographyAlbum::create($data);
        return response()->json($album, 201);
    }
    public function updatePhotographyAlbum(Request $request, $id) {
        $album = PhotographyAlbum::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string',
        ]);
        $data['slug'] = Str::slug($data['name']);
        $album->update($data);
        return response()->json($album);
    }
    public function destroyPhotographyAlbum($id) {
        $album = PhotographyAlbum::findOrFail($id);
        $album->delete();
        return response()->json(['message' => 'Album deleted']);
    }

    // ==========================================
    // PHOTOGRAPHY CATEGORIES CRUD
    // ==========================================
    public function indexPhotographyCategories() {
        return response()->json(PhotographyCategory::all());
    }
    public function storePhotographyCategory(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
        ]);
        $data['slug'] = Str::slug($data['name']);
        $cat = PhotographyCategory::create($data);
        return response()->json($cat, 201);
    }
    public function updatePhotographyCategory(Request $request, $id) {
        $cat = PhotographyCategory::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string',
        ]);
        $data['slug'] = Str::slug($data['name']);
        $cat->update($data);
        return response()->json($cat);
    }
    public function destroyPhotographyCategory($id) {
        $cat = PhotographyCategory::findOrFail($id);
        $cat->delete();
        return response()->json(['message' => 'Category deleted']);
    }

    // ==========================================
    // PHOTOGRAPHY IMAGES CRUD
    // ==========================================
    public function indexPhotographyImages() {
        return response()->json(PhotographyImage::with(['album', 'category'])->get());
    }
    public function storePhotographyImage(Request $request) {
        $data = $request->validate([
            'album_id' => 'nullable|exists:photography_albums,id',
            'category_id' => 'nullable|exists:photography_categories,id',
            'url' => 'required|string',
            'caption' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);
        $img = PhotographyImage::create($data);
        return response()->json($img, 201);
    }
    public function updatePhotographyImage(Request $request, $id) {
        $img = PhotographyImage::findOrFail($id);
        $data = $request->validate([
            'album_id' => 'nullable|exists:photography_albums,id',
            'category_id' => 'nullable|exists:photography_categories,id',
            'url' => 'required|string',
            'caption' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);
        $img->update($data);
        return response()->json($img);
    }
    public function destroyPhotographyImage($id) {
        $img = PhotographyImage::findOrFail($id);
        $img->delete();
        return response()->json(['message' => 'Image deleted']);
    }

    // ==========================================
    // BLOG CATEGORIES CRUD
    // ==========================================
    public function indexBlogCategories() {
        return response()->json(BlogCategory::all());
    }
    public function storeBlogCategory(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
        ]);
        $data['slug'] = Str::slug($data['name']);
        $cat = BlogCategory::create($data);
        return response()->json($cat, 201);
    }
    public function updateBlogCategory(Request $request, $id) {
        $cat = BlogCategory::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string',
        ]);
        $data['slug'] = Str::slug($data['name']);
        $cat->update($data);
        return response()->json($cat);
    }
    public function destroyBlogCategory($id) {
        $cat = BlogCategory::findOrFail($id);
        $cat->delete();
        return response()->json(['message' => 'Blog Category deleted']);
    }

    // ==========================================
    // BLOG TAGS CRUD
    // ==========================================
    public function indexBlogTags() {
        return response()->json(BlogTag::all());
    }
    public function storeBlogTag(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
        ]);
        $data['slug'] = Str::slug($data['name']);
        $tag = BlogTag::create($data);
        return response()->json($tag, 201);
    }
    public function updateBlogTag(Request $request, $id) {
        $tag = BlogTag::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string',
        ]);
        $data['slug'] = Str::slug($data['name']);
        $tag->update($data);
        return response()->json($tag);
    }
    public function destroyBlogTag($id) {
        $tag = BlogTag::findOrFail($id);
        $tag->delete();
        return response()->json(['message' => 'Blog Tag deleted']);
    }

    // ==========================================
    // BLOG POSTS CRUD
    // ==========================================
    public function indexBlogPosts() {
        return response()->json(BlogPost::with('category')->orderBy('created_at', 'desc')->get());
    }
    public function storeBlogPost(Request $request) {
        $data = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'category_id' => 'nullable|exists:blog_categories,id',
            'tags' => 'nullable|array',
            'cover_image' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'draft' => 'required|boolean',
        ]);
        $data['slug'] = Str::slug($data['title']);
        $data['published_at'] = $data['draft'] ? null : now();
        $post = BlogPost::create($data);
        return response()->json($post, 201);
    }
    public function updateBlogPost(Request $request, $id) {
        $post = BlogPost::findOrFail($id);
        $data = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'category_id' => 'nullable|exists:blog_categories,id',
            'tags' => 'nullable|array',
            'cover_image' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'draft' => 'required|boolean',
        ]);
        $data['slug'] = Str::slug($data['title']);
        if (!$data['draft'] && $post->draft) {
            $data['published_at'] = now();
        } elseif ($data['draft']) {
            $data['published_at'] = null;
        }
        $post->update($data);
        return response()->json($post);
    }
    public function destroyBlogPost($id) {
        $post = BlogPost::findOrFail($id);
        $post->delete();
        return response()->json(['message' => 'Blog Post deleted']);
    }

    // ==========================================
    // CONTACT CMS
    // ==========================================
    public function getContact() {
        return response()->json(Contact::first() ?: []);
    }
    public function updateContact(Request $request) {
        $contact = Contact::first() ?: new Contact();
        $data = $request->validate([
            'email' => 'required|email',
            'phone' => 'required|string',
            'whatsapp' => 'nullable|string',
            'linkedin' => 'nullable|string',
            'github' => 'nullable|string',
            'researchgate' => 'nullable|string',
            'facebook' => 'nullable|string',
            'location' => 'required|string',
            'google_maps' => 'nullable|string',
        ]);
        $contact->fill($data);
        $contact->save();
        return response()->json($contact);
    }

    // ==========================================
    // SEO CMS
    // ==========================================
    public function getSeo() {
        return response()->json(Seo::first() ?: []);
    }
    public function updateSeo(Request $request) {
        $seo = Seo::first() ?: new Seo();
        $data = $request->validate([
            'site_title' => 'required|string',
            'meta_description' => 'required|string',
            'keywords' => 'nullable|string',
            'og_image' => 'nullable|string',
            'twitter_card' => 'nullable|string',
            'canonical_url' => 'nullable|string',
            'robots' => 'nullable|string',
            'sitemap_url' => 'nullable|string',
            'json_ld' => 'nullable|array',
        ]);
        $seo->fill($data);
        $seo->save();
        return response()->json($seo);
    }

    // ==========================================
    // SETTINGS CMS
    // ==========================================
    public function getSettings() {
        return response()->json(Setting::first() ?: []);
    }
    public function updateSettings(Request $request) {
        $setting = Setting::first() ?: new Setting();
        $data = $request->validate([
            'site_name' => 'required|string',
            'logo' => 'nullable|string',
            'favicon' => 'nullable|string',
            'footer_text' => 'nullable|string',
            'google_analytics' => 'nullable|string',
            'google_search_console' => 'nullable|string',
            'theme_settings' => 'nullable|array',
            'resume_file' => 'nullable|string',
            'github_username' => 'required|string',
        ]);
        $setting->fill($data);
        $setting->save();
        return response()->json($setting);
    }

    // ==========================================
    // MEDIA LIBRARY CMS
    // ==========================================
    public function indexMedia() {
        return response()->json(Media::orderBy('created_at', 'desc')->get());
    }
    public function uploadMedia(Request $request) {
        $request->validate([
            'file' => 'required|file|max:20480', // max 20MB
            'folder' => 'nullable|string'
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $folder = $request->input('folder', 'uploads');
            
            // Store file in public disk under folder
            $path = $file->storeAs($folder, $filename, 'public');
            $url = Storage::disk('public')->url($path);

            $media = Media::create([
                'filename' => $file->getClientOriginalName(),
                'filepath' => $url,
                'file_type' => $file->getClientMimeType(),
                'file_size' => $file->getSize(),
                'folder' => $folder,
            ]);

            return response()->json($media, 201);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
    public function destroyMedia($id) {
        $media = Media::findOrFail($id);
        
        // Extract local path from URL
        $relativePrefixed = str_replace(Storage::disk('public')->url(''), '', $media->filepath);
        Storage::disk('public')->delete($relativePrefixed);
        
        $media->delete();
        return response()->json(['message' => 'Media deleted successfully']);
    }

    // ==========================================
    // AI ASSISTANT CMS
    // ==========================================
    public function getAiSettings() {
        $ai = AiSetting::first();
        if (!$ai) {
            $ai = AiSetting::create([
                'provider' => 'gemini',
                'system_prompt' => "You are Siam's official Portfolio AI Assistant. Answer strictly based on Siam's live database knowledge context.",
                'knowledge_base' => '',
                'model' => 'gemini-1.5-flash',
                'temperature' => 0.7,
                'max_tokens' => 1000,
                'is_enabled' => true,
                'greeting_message' => "Hello! I am Siam's Portfolio AI Assistant. Ask me anything about his projects, skills, experience, or research!",
                'fallback_message' => "I don't currently have information about that in my portfolio.",
                'rate_limit' => 60,
                'conversation_memory' => 10,
            ]);
        }
        return response()->json($ai);
    }

    public function updateAiSettings(Request $request, AiKnowledgeService $knowledgeService) {
        $ai = AiSetting::first() ?: new AiSetting();
        $data = $request->validate([
            'provider' => 'required|string',
            'system_prompt' => 'required|string',
            'knowledge_base' => 'nullable|string',
            'model' => 'required|string',
            'temperature' => 'required|numeric',
            'max_tokens' => 'required|integer',
            'api_key' => 'nullable|string',
            'openai_api_key' => 'nullable|string',
            'gemini_api_key' => 'nullable|string',
            'claude_api_key' => 'nullable|string',
            'greeting_message' => 'nullable|string',
            'fallback_message' => 'nullable|string',
            'is_enabled' => 'required|boolean',
            'allowed_modules' => 'nullable|array',
            'rate_limit' => 'required|integer',
            'conversation_memory' => 'required|integer',
        ]);
        $ai->fill($data);
        $ai->save();

        $knowledgeService->clearCache();

        return response()->json($ai);
    }

    public function clearAiCache(AiKnowledgeService $knowledgeService) {
        $knowledgeService->clearCache();
        return response()->json(['message' => 'AI Knowledge Cache cleared successfully!']);
    }

    // ==========================================
    // USERS CMS (Profile & Password update)
    // ==========================================
    public function getUsers() {
        return response()->json(User::all(['id', 'name', 'email', 'created_at']));
    }
    public function storeUser(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        return response()->json($user, 201);
    }
    public function updateUser(Request $request, $id) {
        $user = User::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
        ]);
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $user->update($data);
        return response()->json($user);
    }
    public function destroyUser($id) {
        $user = User::findOrFail($id);
        if (User::count() <= 1) {
            return response()->json(['error' => 'Cannot delete the only user'], 400);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    // ==========================================
    // COMING SOON SECTION CMS
    // ==========================================
    public function getComingSoon() {
        return response()->json(ComingSoonSection::first() ?: []);
    }
    public function updateComingSoon(Request $request) {
        $section = ComingSoonSection::first() ?: new ComingSoonSection();
        $data = $request->validate([
            'label' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'button_text' => 'nullable|string',
            'button_url' => 'nullable|string',
            'show_button' => 'required|boolean',
            'is_active' => 'required|boolean',
            'display_order' => 'required|integer',
        ]);
        $section->fill($data);
        $section->save();
        return response()->json($section);
    }
}
