<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSeoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'site_title' => 'required|string|max:191',
            'meta_description' => 'required|string',
            'keywords' => 'nullable|string',
            'og_image' => 'nullable|string',
            'twitter_card' => 'nullable|string|max:191',
            'canonical_url' => 'nullable|string',
            'robots' => 'nullable|string|max:191',
            'sitemap_url' => 'nullable|string',
            'json_ld' => 'nullable|array',
        ];
    }
}
