<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CurrentFocusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:191',
            'icon' => 'nullable|string|max:191',
            'what' => 'required|string',
            'why' => 'required|string',
            'technology' => 'nullable|array',
            'progress' => 'nullable|string|max:191',
            'sort_order' => 'nullable|integer',
            'enabled' => 'nullable|boolean',
        ];
    }
}
