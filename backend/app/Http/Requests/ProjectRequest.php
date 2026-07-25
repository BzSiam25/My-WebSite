<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        return [
            'name' => 'required|string|max:191',
            'slug' => 'nullable|string|max:191|unique:projects,slug,' . $id,
            'category' => 'required|string|max:191',
            'year' => 'nullable|integer',
            'role' => 'nullable|string|max:191',
            'client' => 'nullable|string|max:191',
            'duration' => 'nullable|string|max:191',
            'description' => 'required|string',
            'full_description' => 'nullable|string',
            'problem_statement' => 'nullable|string',
            'solution' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'images' => 'nullable|array',
            'cover_image' => 'nullable|string',
            'gallery_images' => 'nullable|array',
            'video' => 'nullable|string',
            'video_url' => 'nullable|string',
            'github_url' => 'nullable|string',
            'live_url' => 'nullable|string',
            'research_url' => 'nullable|string',
            'tags' => 'nullable|array',
            'featured' => 'nullable|boolean',
            'publish_status' => 'nullable|in:published,draft',
            'enabled' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:191',
            'seo_description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ];
    }
}
