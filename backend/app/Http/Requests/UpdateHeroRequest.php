<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHeroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:191',
            'short_name' => 'required|string|max:191',
            'designation' => 'required|string|max:191',
            'subtitle' => 'required|string',
            'description' => 'required|string',
            'resume_pdf' => 'nullable|string',
            'profile_image' => 'nullable|string',
            'hero_image' => 'nullable|string',
            'cta_buttons' => 'nullable|array',
            'social_links' => 'nullable|array',
        ];
    }
}
