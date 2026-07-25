<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email|max:191',
            'phone' => 'required|string|max:191',
            'whatsapp' => 'nullable|string|max:191',
            'linkedin' => 'nullable|string',
            'github' => 'nullable|string',
            'researchgate' => 'nullable|string',
            'facebook' => 'nullable|string',
            'twitter' => 'nullable|string',
            'instagram' => 'nullable|string',
            'youtube' => 'nullable|string',
            'location' => 'required|string|max:191',
            'google_maps' => 'nullable|string',
            'portfolio_url' => 'nullable|string',
        ];
    }
}
