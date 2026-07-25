<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mediaService = app(MediaService::class);

        return [
            'id' => $this->id,
            'company' => $this->company,
            'company_logo' => $mediaService->getUrl($this->company_logo),
            'role' => $this->role,
            'employment_type' => $this->employment_type,
            'location' => $this->location,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'current_position' => (bool) $this->current_position,
            'description' => $this->description,
            'responsibilities' => $this->responsibilities ?? [],
            'technologies' => $this->technologies ?? [],
            'sort_order' => $this->sort_order,
            'enabled' => (bool) $this->enabled,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
