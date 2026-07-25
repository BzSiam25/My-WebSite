<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SkillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:191',
            'icon' => 'nullable|string|max:191',
            'category' => 'required|string|max:191',
            'display_order' => 'nullable|integer',
            'enabled' => 'nullable|boolean',
            'color' => 'nullable|string|max:191',
            'icon_url' => 'nullable|string',
        ];
    }
}
