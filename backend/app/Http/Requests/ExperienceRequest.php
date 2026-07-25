<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company' => 'required|string|max:191',
            'company_logo' => 'nullable|string',
            'role' => 'required|string|max:191',
            'employment_type' => 'nullable|string|max:191',
            'location' => 'nullable|string|max:191',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'current_position' => 'required|boolean',
            'description' => 'required|string',
            'responsibilities' => 'nullable|array',
            'technologies' => 'nullable|array',
            'sort_order' => 'nullable|integer',
            'enabled' => 'nullable|boolean',
        ];
    }
}
