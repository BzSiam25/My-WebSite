<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Certificate;
use App\Models\Research;
use App\Models\BlogPost;
use App\Models\PhotographyImage;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\ValidationException;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $tokenName = 'admin-token';
        $token = $user->createToken($tokenName)->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function getDashboardStats()
    {
        $settings = Setting::first();
        $githubUsername = $settings ? $settings->github_username : 'BzSiam25';

        return response()->json([
            'total_projects' => Project::count(),
            'total_experience' => Experience::count(),
            'total_skills' => Skill::count(),
            'total_certificates' => Certificate::count(),
            'total_research' => Research::count(),
            'total_blog_posts' => BlogPost::count(),
            'total_gallery_images' => PhotographyImage::count(),
            'github_sync_status' => 'Synced',
            'github_username' => $githubUsername,
            'latest_activities' => [
                ['description' => 'User logged in', 'time' => now()->diffForHumans()],
                ['description' => 'Dashboard loaded', 'time' => now()->diffForHumans()]
            ]
        ]);
    }
}
