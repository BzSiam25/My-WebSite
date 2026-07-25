<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HeroResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mediaService = app(MediaService::class);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'short_name' => $this->short_name,
            'designation' => $this->designation,
            'subtitle' => $this->subtitle,
            'description' => $this->description,
            'resume_pdf' => $mediaService->getUrl($this->resume_pdf),
            'profile_image' => $mediaService->getUrl($this->profile_image),
            'hero_image' => $mediaService->getUrl($this->hero_image),
            'cta_buttons' => $this->cta_buttons ?? [],
            'social_links' => $this->social_links ?? [],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
