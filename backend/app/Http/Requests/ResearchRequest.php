<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:191',
            'authors' => 'required|string|max:191',
            'conference' => 'nullable|string|max:191',
            'journal' => 'nullable|string|max:191',
            'publisher' => 'nullable|string|max:191',
            'doi' => 'nullable|string|max:191',
            'year' => 'required|integer',
            'abstract' => 'required|string',
            'status' => 'required|string|max:191',
            'research_area' => 'nullable|string|max:191',
            'featured' => 'nullable|boolean',
            'researchgate_link' => 'nullable|string',
            'paper_link' => 'nullable|string',
            'pdf' => 'nullable|string',
            'images' => 'nullable|array',
            'enabled' => 'nullable|boolean',
            'publish_status' => 'nullable|in:published,draft',
        ];
    }
}
