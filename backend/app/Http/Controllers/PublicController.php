<?php

namespace App\Http\Controllers;

use App\Http\Resources\HeroResource;
use App\Http\Resources\AboutResource;
use App\Http\Resources\CurrentFocusResource;
use App\Http\Resources\ExperienceResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\SkillResource;
use App\Http\Resources\EducationResource;
use App\Http\Resources\ResearchResource;
use App\Http\Resources\CertificateResource;
use App\Http\Resources\JourneyResource;
use App\Http\Resources\ContactResource;
use App\Http\Resources\SeoResource;
use App\Http\Resources\SettingResource;
use App\Models\Hero;
use App\Models\About;
use App\Models\CurrentFocus;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Education;
use App\Models\Research;
use App\Services\AiLlmService;
use App\Models\Certificate;
use App\Models\Journey;
use App\Models\PhotographyAlbum;
use App\Models\PhotographyImage;
use App\Models\BlogPost;
use App\Models\Contact;
use App\Models\Seo;
use App\Models\Setting;
use App\Models\AiSetting;
use App\Models\ComingSoonSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class PublicController extends Controller
{
    public function getHero()
    {
        return Cache::remember('portfolio_hero', 3600, function () {
            $hero = Hero::first();
            return response()->json($hero ? new HeroResource($hero) : []);
        });
    }

    public function getAbout()
    {
        $about = About::first();
        return response()->json($about ? new AboutResource($about) : []);
    }

    public function getCurrentFocus()
    {
        $items = CurrentFocus::where('enabled', true)->orderBy('sort_order')->get();
        return response()->json(CurrentFocusResource::collection($items));
    }

    public function getExperiences()
    {
        $items = Experience::where('enabled', true)->orderBy('sort_order')->orderBy('start_date', 'desc')->get();
        return response()->json(ExperienceResource::collection($items));
    }

    public function getProjects()
    {
        $items = Project::where('enabled', true)->where('publish_status', 'published')->orderBy('sort_order')->get();
        return response()->json(ProjectResource::collection($items));
    }

    public function getSkills()
    {
        $items = Skill::where('enabled', true)->orderBy('display_order')->get();
        return response()->json(SkillResource::collection($items));
    }

    public function getEducation()
    {
        $items = Education::where('enabled', true)->orderBy('sort_order')->get();
        return response()->json(EducationResource::collection($items));
    }

    public function getResearch()
    {
        $items = Research::where('enabled', true)->where('publish_status', 'published')->orderBy('year', 'desc')->get();
        return response()->json(ResearchResource::collection($items));
    }

    public function getCertificates()
    {
        $items = Certificate::where('enabled', true)->orderBy('sort_order')->orderBy('issue_date', 'desc')->get();
        return response()->json(CertificateResource::collection($items));
    }

    public function getJourneys()
    {
        $items = Journey::where('enabled', true)->orderBy('sort_order')->orderBy('id', 'desc')->get();
        return response()->json(JourneyResource::collection($items));
    }

    public function getPhotography()
    {
        $albums = PhotographyAlbum::with('images')->get();
        $images = PhotographyImage::with(['album', 'category'])->get();
        return response()->json([
            'albums' => $albums,
            'images' => $images
        ]);
    }

    public function getBlog()
    {
        return response()->json(BlogPost::with('category')
            ->where('draft', false)
            ->orderBy('published_at', 'desc')
            ->get());
    }

    public function getBlogPost($slug)
    {
        $post = BlogPost::with('category')
            ->where('slug', $slug)
            ->where('draft', false)
            ->first();

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json($post);
    }

    public function getContact()
    {
        return Cache::remember('portfolio_contact', 3600, function () {
            $contact = Contact::first();
            return response()->json($contact ? new ContactResource($contact) : []);
        });
    }

    public function getSeo()
    {
        return Cache::remember('portfolio_seo', 86400, function () {
            $seo = Seo::first();
            return response()->json($seo ? new SeoResource($seo) : []);
        });
    }

    public function getSettings()
    {
        return Cache::remember('portfolio_settings', 86400, function () {
            $setting = Setting::first();
            return response()->json($setting ? new SettingResource($setting) : []);
        });
    }

    public function getGithubStats(Request $request)
    {
        $settings = Setting::first();
        $username = $settings ? $settings->github_username : 'BzSiam25';

        if (!$username) {
            return response()->json(['error' => 'GitHub username not configured'], 400);
        }

        return Cache::remember("github_stats_{$username}", 3600, function () use ($username) {
            try {
                $userResponse = Http::get("https://api.github.com/users/{$username}");
                $userData = $userResponse->json();

                $reposResponse = Http::get("https://api.github.com/users/{$username}/repos?sort=updated&per_page=100");
                $reposData = $reposResponse->json();

                $stars = 0;
                $pinned = [];

                if (is_array($reposData)) {
                    foreach ($reposData as $repo) {
                        $stars += $repo['stargazers_count'] ?? 0;
                        if (!empty($repo['topics']) && in_array('portfolio-featured', $repo['topics'])) {
                            $pinned[] = $repo;
                        }
                    }
                    if (empty($pinned) && count($reposData) > 0) {
                        $pinned = array_slice($reposData, 0, 3);
                    }
                }

                return [
                    'username' => $username,
                    'name' => $userData['name'] ?? $username,
                    'followers' => $userData['followers'] ?? 0,
                    'following' => $userData['following'] ?? 0,
                    'public_repos' => $userData['public_repos'] ?? 0,
                    'stars' => $stars,
                    'pinned_repositories' => $pinned,
                    'repositories' => is_array($reposData) ? array_slice($reposData, 0, 10) : [],
                    'contribution_graph' => [
                        'total' => 1200,
                        'weeks' => []
                    ]
                ];
            } catch (\Exception $e) {
                return [
                    'username' => $username,
                    'error' => 'Failed to fetch data from GitHub API: ' . $e->getMessage()
                ];
            }
        });
    }

    public function chat(Request $request, AiLlmService $llmService)
    {
        $request->validate([
            'message' => 'required|string',
            'history' => 'nullable|array'
        ]);

        $result = $llmService->processChat(
            $request->input('message'),
            $request->input('history', [])
        );

        return response()->json($result);
    }

    public function getComingSoon()
    {
        $section = ComingSoonSection::where('is_active', true)->orderBy('display_order')->first();
        return response()->json($section ?: []);
    }
}
