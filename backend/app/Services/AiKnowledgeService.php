<?php

namespace App\Services;

use App\Models\Hero;
use App\Models\About;
use App\Models\CurrentFocus;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Research;
use App\Models\Journey;
use App\Models\Certificate;
use App\Models\Contact;
use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class AiKnowledgeService
{
    private const CACHE_KEY = 'portfolio_ai_context_v1';
    private const CACHE_TTL = 86400; // 24 hours

    /**
     * Get compiled portfolio context with caching.
     */
    public function getCachedContext(): string
    {
        return Cache::remember(self::CACHE_KEY, self::CACHE_TTL, function () {
            return $this->buildFullContext();
        });
    }

    /**
     * Clear cached AI context.
     */
    public function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    /**
     * Build full structured knowledge context from live database.
     */
    public function buildFullContext(): string
    {
        try {
            $sections = [];

            // 1. Hero & Core Profile
            $hero = Hero::first();
            if ($hero) {
                $heroStr = "## PORTFOLIO OWNER & HERO\n";
                if ($hero->name) $heroStr .= "- Full Name: {$hero->name}\n";
                if ($hero->short_name) $heroStr .= "- Short Name: {$hero->short_name}\n";
                if ($hero->designation) $heroStr .= "- Designation: {$hero->designation}\n";
                if ($hero->subtitle) $heroStr .= "- Subtitle: {$hero->subtitle}\n";
                if ($hero->description) $heroStr .= "- Overview: {$hero->description}\n";
                if ($hero->social_links) {
                    $socials = is_string($hero->social_links) ? json_decode($hero->social_links, true) : $hero->social_links;
                    if (is_array($socials)) {
                        $links = array_map(fn($s) => ($s['platform'] ?? 'Link') . ": " . ($s['href'] ?? $s['url'] ?? ''), $socials);
                        $heroStr .= "- Social Profiles: " . implode(', ', array_filter($links)) . "\n";
                    }
                }
                $sections[] = trim($heroStr);
            }

            // 2. About & Core Strengths
            $about = About::first();
            if ($about) {
                $aboutStr = "## ABOUT & CORE STRENGTHS\n";
                if ($about->biography) $aboutStr .= "- Detailed Bio: {$about->biography}\n";
                if ($about->career_objective) $aboutStr .= "- Career Objective: {$about->career_objective}\n";
                if ($about->core_strengths) {
                    $strengths = is_string($about->core_strengths) ? json_decode($about->core_strengths, true) : $about->core_strengths;
                    if (is_array($strengths)) {
                        $aboutStr .= "- Core Strengths: " . implode(', ', $strengths) . "\n";
                    }
                }
                if ($about->quick_facts) {
                    $facts = is_string($about->quick_facts) ? json_decode($about->quick_facts, true) : $about->quick_facts;
                    if (is_array($facts)) {
                        $aboutStr .= "- Quick Facts: " . json_encode($facts) . "\n";
                    }
                }
                $sections[] = trim($aboutStr);
            }

            // 3. Current Focus (Columns: title, what, why, technology, progress, enabled, sort_order)
            $focusItems = CurrentFocus::where('enabled', true)->orderBy('sort_order')->get();
            if ($focusItems->count() > 0) {
                $focusStr = "## CURRENT FOCUS & NOW BUILDING\n";
                foreach ($focusItems as $f) {
                    $focusStr .= "### Focus Area: {$f->title}\n";
                    if ($f->what) $focusStr .= "- What: {$f->what}\n";
                    if ($f->why) $focusStr .= "- Why: {$f->why}\n";
                    if ($f->progress) $focusStr .= "- Progress: {$f->progress}\n";
                    if ($f->technology) {
                        $techs = is_string($f->technology) ? json_decode($f->technology, true) : $f->technology;
                        if (is_array($techs)) {
                            $focusStr .= "- Technologies: " . implode(', ', $techs) . "\n";
                        }
                    }
                }
                $sections[] = trim($focusStr);
            }

            // 4. Projects (Columns: name, category, description, full_description, problem_statement, solution, tech_stack, live_url, github_url, research_url, featured, publish_status, enabled)
            $projects = Project::where(function($q) {
                $q->where('enabled', true)->orWhereNull('enabled');
            })->where(function($q) {
                $q->where('publish_status', 'published')->orWhereNull('publish_status');
            })->orderBy('sort_order')->get();

            if ($projects->count() > 0) {
                $projStr = "## PROJECTS & CASE STUDIES\n";
                foreach ($projects as $p) {
                    $projStr .= "### Project Name: {$p->name}\n";
                    if ($p->category) $projStr .= "- Category: {$p->category}\n";
                    if ($p->description) $projStr .= "- Summary: {$p->description}\n";
                    if ($p->full_description) $projStr .= "- Full Description: {$p->full_description}\n";
                    if ($p->problem_statement) $projStr .= "- Problem Addressed: {$p->problem_statement}\n";
                    if ($p->solution) $projStr .= "- Solution Delivered: {$p->solution}\n";
                    if ($p->tech_stack) {
                        $stack = is_string($p->tech_stack) ? json_decode($p->tech_stack, true) : $p->tech_stack;
                        if (is_array($stack)) {
                            $projStr .= "- Technologies Used: " . implode(', ', $stack) . "\n";
                        }
                    }
                    if ($p->live_url) $projStr .= "- Live Demo Link: {$p->live_url}\n";
                    if ($p->github_url) $projStr .= "- GitHub Repository: {$p->github_url}\n";
                    if ($p->research_url) $projStr .= "- Associated Research Link: {$p->research_url}\n";
                    $projStr .= "- Featured Project: " . ($p->featured ? 'Yes' : 'No') . "\n";
                }
                $sections[] = trim($projStr);
            }

            // 5. Technical Skills (Columns: name, icon, category, display_order, enabled)
            $skills = Skill::where(function($q) {
                $q->where('enabled', true)->orWhereNull('enabled');
            })->orderBy('display_order')->get();

            if ($skills->count() > 0) {
                $skillsStr = "## TECHNICAL SKILLS & ARSENAL\n";
                $grouped = $skills->groupBy('category');
                foreach ($grouped as $cat => $items) {
                    $skillNames = $items->pluck('name')->implode(', ');
                    $skillsStr .= "- {$cat}: {$skillNames}\n";
                }
                $sections[] = trim($skillsStr);
            }

            // 6. Work Experience (Columns: company, role, employment_type, location, start_date, end_date, current_position, description, responsibilities, technologies, enabled)
            $experiences = Experience::where(function($q) {
                $q->where('enabled', true)->orWhereNull('enabled');
            })->orderBy('start_date', 'desc')->get();

            if ($experiences->count() > 0) {
                $expStr = "## WORK EXPERIENCE\n";
                foreach ($experiences as $e) {
                    $end = $e->current_position ? 'Present' : ($e->end_date ? (is_string($e->end_date) ? $e->end_date : $e->end_date->format('M Y')) : 'N/A');
                    $start = $e->start_date ? (is_string($e->start_date) ? $e->start_date : $e->start_date->format('M Y')) : 'N/A';
                    $expStr .= "### Role: {$e->role} at {$e->company}\n";
                    $expStr .= "- Duration: {$start} - {$end}\n";
                    if ($e->location) $expStr .= "- Location: {$e->location}\n";
                    if ($e->description) $expStr .= "- Key Responsibilities & Achievements: {$e->description}\n";
                    if ($e->technologies) {
                        $techs = is_string($e->technologies) ? json_decode($e->technologies, true) : $e->technologies;
                        if (is_array($techs)) {
                            $expStr .= "- Tech Stack Used: " . implode(', ', $techs) . "\n";
                        }
                    }
                }
                $sections[] = trim($expStr);
            }

            // 7. Research Papers & Publications (Columns: title, authors, conference, journal, publisher, doi, year, abstract, status, paper_link, researchgate_link, enabled, publish_status)
            $researchList = Research::where(function($q) {
                $q->where('enabled', true)->orWhereNull('enabled');
            })->where(function($q) {
                $q->where('publish_status', 'published')->orWhereNull('publish_status');
            })->orderBy('year', 'desc')->get();

            if ($researchList->count() > 0) {
                $resStr = "## RESEARCH PAPERS & PUBLICATIONS\n";
                foreach ($researchList as $r) {
                    $resStr .= "### Research Paper Title: {$r->title}\n";
                    $resStr .= "- Authors: {$r->authors}\n";
                    $resStr .= "- Year: {$r->year}\n";
                    if ($r->conference) $resStr .= "- Conference: {$r->conference}\n";
                    if ($r->journal) $resStr .= "- Journal: {$r->journal}\n";
                    if ($r->publisher) $resStr .= "- Publisher: {$r->publisher}\n";
                    if ($r->doi) $resStr .= "- DOI: {$r->doi}\n";
                    if ($r->abstract) $resStr .= "- Abstract: {$r->abstract}\n";
                    if ($r->status) $resStr .= "- Status: {$r->status}\n";
                    if ($r->paper_link) $resStr .= "- Paper Link: {$r->paper_link}\n";
                    if ($r->researchgate_link) $resStr .= "- ResearchGate Link: {$r->researchgate_link}\n";
                }
                $sections[] = trim($resStr);
            }

            // 8. Education (Columns: university, degree, department, cgpa, duration, description, enabled)
            $educationList = Education::where(function($q) {
                $q->where('enabled', true)->orWhereNull('enabled');
            })->orderBy('sort_order')->get();

            if ($educationList->count() > 0) {
                $eduStr = "## EDUCATION\n";
                foreach ($educationList as $edu) {
                    $eduStr .= "### Degree: {$edu->degree} in {$edu->department}\n";
                    $eduStr .= "- Institution: {$edu->university}\n";
                    $eduStr .= "- Duration: {$edu->duration}\n";
                    $eduStr .= "- CGPA: {$edu->cgpa}\n";
                    if ($edu->description) $eduStr .= "- Details: {$edu->description}\n";
                }
                $sections[] = trim($eduStr);
            }

            // 9. Life Journey & Milestones (Columns: date, title, description, enabled)
            $journeys = Journey::where(function($q) {
                $q->where('enabled', true)->orWhereNull('enabled');
            })->orderBy('id', 'desc')->get();

            if ($journeys->count() > 0) {
                $jStr = "## LIFE JOURNEY & MILESTONES\n";
                foreach ($journeys as $j) {
                    $jStr .= "### Milestone ({$j->date}): {$j->title}\n";
                    $jStr .= "- Description: {$j->description}\n";
                }
                $sections[] = trim($jStr);
            }

            // 10. Certificates & Credentials (Columns: title, issuer, issue_date, credential_id, credential_url, enabled)
            $certificates = Certificate::where(function($q) {
                $q->where('enabled', true)->orWhereNull('enabled');
            })->orderBy('issue_date', 'desc')->get();

            if ($certificates->count() > 0) {
                $certStr = "## CERTIFICATES & CREDENTIALS\n";
                foreach ($certificates as $c) {
                    $certStr .= "### Certificate: {$c->title}\n";
                    $certStr .= "- Issuer: {$c->issuer}\n";
                    $certStr .= "- Issue Date: {$c->issue_date}\n";
                    if ($c->credential_id) $certStr .= "- Credential ID: {$c->credential_id}\n";
                    if ($c->credential_url) $certStr .= "- Verification Link: {$c->credential_url}\n";
                }
                $sections[] = trim($certStr);
            }

            // 11. Contact Information
            $contact = Contact::first();
            if ($contact) {
                $cStr = "## CONTACT DETAILS\n";
                if ($contact->email) $cStr .= "- Email: {$contact->email}\n";
                if ($contact->phone) $cStr .= "- Phone: {$contact->phone}\n";
                if ($contact->whatsapp) $cStr .= "- WhatsApp: {$contact->whatsapp}\n";
                if ($contact->location) $cStr .= "- Location: {$contact->location}\n";
                if ($contact->linkedin) $cStr .= "- LinkedIn: {$contact->linkedin}\n";
                if ($contact->github) $cStr .= "- GitHub: {$contact->github}\n";
                if ($contact->researchgate) $cStr .= "- ResearchGate: {$contact->researchgate}\n";
                $sections[] = trim($cStr);
            }

            // 12. Settings
            $setting = Setting::first();
            if ($setting) {
                $sStr = "## ADDITIONAL SYSTEM METADATA\n";
                if ($setting->resume_file) $sStr .= "- Resume Download Link: {$setting->resume_file}\n";
                if ($setting->github_username) $sStr .= "- GitHub Username: {$setting->github_username}\n";
                $sections[] = trim($sStr);
            }

            return implode("\n\n", $sections);
        } catch (\Exception $e) {
            Log::error('AiKnowledgeService buildFullContext Error: ' . $e->getMessage());
            return "";
        }
    }

    /**
     * Search relevant knowledge context (RAG Search).
     */
    public function searchRelevantContext(string $query): string
    {
        $fullContext = $this->getCachedContext();
        if (empty($fullContext)) {
            $fullContext = $this->buildFullContext();
        }

        $queryLower = strtolower($query);

        // Broad or general intent keywords return full context so LLM has complete awareness
        $broadKeywords = ['who', 'about', 'summary', 'overview', 'all', 'everything', 'tell me', 'hello', 'hi', 'siam', 'bayezid', 'skills', 'projects', 'work', 'experience', 'building', 'contact', 'yourself'];
        foreach ($broadKeywords as $keyword) {
            if (str_contains($queryLower, $keyword)) {
                return $fullContext;
            }
        }

        // Section-based token filter
        $sections = explode("\n\n", $fullContext);
        $matchedSections = [];
        $tokens = array_filter(explode(' ', preg_replace('/[^\w\s]/', '', $queryLower)));

        foreach ($sections as $section) {
            $sectionLower = strtolower($section);
            foreach ($tokens as $token) {
                if (strlen($token) > 2 && str_contains($sectionLower, $token)) {
                    $matchedSections[] = $section;
                    break;
                }
            }
        }

        if (count($matchedSections) > 0) {
            return implode("\n\n", array_unique($matchedSections));
        }

        return $fullContext;
    }
}
