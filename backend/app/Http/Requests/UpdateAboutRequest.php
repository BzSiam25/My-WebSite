<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAboutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'biography' => 'required|string',
            'career_objective' => 'required|string',
            'core_strengths' => 'nullable|array',
            'quick_facts' => 'nullable|array',
            'statistics' => 'nullable|array',
        ];
    }
}
