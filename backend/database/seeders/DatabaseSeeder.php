<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Hero;
use App\Models\About;
use App\Models\Contact;
use App\Models\Seo;
use App\Models\Setting;
use App\Models\AiSetting;
use App\Models\ComingSoonSection;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * Only initializes essential system accounts and singleton defaults.
     * All portfolio content is managed dynamically from the Admin Panel.
     */
    public function run(): void
    {
        // 1. System Admin Account
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Singleton Defaults (Generic Placeholders — editable via Admin Panel)
        Hero::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'Welcome to My Portfolio',
                'short_name' => 'Portfolio',
                'designation' => 'Software Engineer & Researcher',
                'subtitle' => 'Building Scalable Web Systems & Intelligent Applications',
                'description' => 'Welcome! All content on this portfolio is fully dynamic and managed via the Admin Panel.',
                'resume_pdf' => null,
                'profile_image' => null,
                'hero_image' => null,
                'cta_buttons' => [
                    ['label' => 'View Work', 'link' => '#projects'],
                    ['label' => 'Contact Me', 'link' => '#contact']
                ],
                'social_links' => [
                    ['platform' => 'GitHub', 'href' => 'https://github.com', 'icon' => 'github'],
                    ['platform' => 'LinkedIn', 'href' => 'https://linkedin.com', 'icon' => 'linkedin'],
                    ['platform' => 'Email', 'href' => 'mailto:admin@example.com', 'icon' => 'email']
                ]
            ]
        );

        About::updateOrCreate(
            ['id' => 1],
            [
                'biography' => 'This biography content is managed directly from the Admin Panel.',
                'career_objective' => 'Architecting resilient software solutions and deploying production systems.',
                'core_strengths' => ['Software Engineering', 'System Design', 'API Development'],
                'quick_facts' => [
                    ['label' => 'Location', 'value' => 'Worldwide'],
                    ['label' => 'Status', 'value' => 'Available']
                ],
                'statistics' => [
                    ['label' => 'Projects', 'value' => '0+'],
                    ['label' => 'Experience', 'value' => '1+ Years']
                ]
            ]
        );

        Contact::updateOrCreate(
            ['id' => 1],
            [
                'email' => 'admin@example.com',
                'phone' => '+1234567890',
                'whatsapp' => null,
                'linkedin' => 'https://linkedin.com',
                'github' => 'https://github.com',
                'researchgate' => null,
                'facebook' => null,
                'location' => 'Earth'
            ]
        );

        Seo::updateOrCreate(
            ['id' => 1],
            [
                'site_title' => 'Developer Portfolio | Dynamic CMS',
                'meta_description' => 'A dynamic, high-performance portfolio website driven by Laravel CMS backend.',
                'keywords' => 'Portfolio, Software Engineer, Web Developer, Full-Stack'
            ]
        );

        Setting::updateOrCreate(
            ['id' => 1],
            [
                'site_name' => 'Developer Portfolio',
                'logo' => null,
                'favicon' => null,
                'footer_text' => 'All Rights Reserved',
                'github_username' => null
            ]
        );

        AiSetting::updateOrCreate(
            ['id' => 1],
            [
                'system_prompt' => 'You are an AI assistant for this portfolio website. Answer questions based on portfolio content.',
                'knowledge_base' => 'Portfolio owner is a Software Engineer.',
                'model' => 'gemini-1.5-flash',
                'temperature' => 0.7,
                'api_key' => null
            ]
        );

        ComingSoonSection::updateOrCreate(
            ['id' => 1],
            [
                'label' => 'MORE COMING SOON',
                'title' => 'More updates are on the way.',
                'description' => 'New projects and research papers will appear here as they are added from the Admin Panel.',
                'button_text' => 'View Admin Panel',
                'button_url' => '/admin',
                'show_button' => true,
                'is_active' => true,
                'display_order' => 0
            ]
        );

        // Note: Collections (Projects, Skills, Experiences, Education, Research, Journeys, Certificates, Photography, Blog, CurrentFocus)
        // are left EMPTY so the Admin Panel builds the portfolio from scratch.
    }
}
