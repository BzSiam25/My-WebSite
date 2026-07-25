<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SeoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mediaService = app(MediaService::class);

        return [
            'id' => $this->id,
            'site_title' => $this->site_title,
            'meta_description' => $this->meta_description,
            'keywords' => $this->keywords,
            'og_image' => $mediaService->getUrl($this->og_image),
            'twitter_card' => $this->twitter_card,
            'canonical_url' => $this->canonical_url,
            'robots' => $this->robots,
            'sitemap_url' => $this->sitemap_url,
            'json_ld' => $this->json_ld ?? [],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
