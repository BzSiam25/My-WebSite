<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'university' => $this->university,
            'degree' => $this->degree,
            'department' => $this->department,
            'cgpa' => $this->cgpa,
            'duration' => $this->duration,
            'description' => $this->description,
            'enabled' => (bool) $this->enabled,
            'sort_order' => $this->sort_order,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
