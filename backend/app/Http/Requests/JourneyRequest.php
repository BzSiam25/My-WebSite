<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JourneyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => 'required|string|max:191',
            'title' => 'required|string|max:191',
            'description' => 'required|string',
            'images' => 'nullable|array',
            'videos' => 'nullable|array',
            'enabled' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ];
    }
}
