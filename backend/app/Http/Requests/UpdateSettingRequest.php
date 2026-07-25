<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'site_name' => 'required|string|max:191',
            'logo' => 'nullable|string',
            'favicon' => 'nullable|string',
            'footer_text' => 'nullable|string',
            'google_analytics' => 'nullable|string|max:191',
            'google_search_console' => 'nullable|string',
            'theme_settings' => 'nullable|array',
            'resume_file' => 'nullable|string',
            'github_username' => 'nullable|string|max:191',
        ];
    }
}
