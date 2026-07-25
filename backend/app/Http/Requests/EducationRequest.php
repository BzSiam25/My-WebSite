<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EducationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'university' => 'required|string|max:191',
            'degree' => 'required|string|max:191',
            'department' => 'required|string|max:191',
            'cgpa' => 'required|string|max:191',
            'duration' => 'required|string|max:191',
            'description' => 'nullable|string',
            'enabled' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ];
    }
}
