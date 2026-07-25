<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CertificateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:191',
            'issuer' => 'required|string|max:191',
            'issue_date' => 'required|date',
            'credential_id' => 'nullable|string|max:191',
            'credential_url' => 'nullable|string',
            'image' => 'nullable|string',
            'enabled' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ];
    }
}
