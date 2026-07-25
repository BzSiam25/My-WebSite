<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResearchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mediaService = app(MediaService::class);

        $images = array_map(function ($img) use ($mediaService) {
            return $mediaService->getUrl($img);
        }, $this->images ?? []);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'authors' => $this->authors,
            'conference' => $this->conference,
            'journal' => $this->journal,
            'publisher' => $this->publisher,
            'doi' => $this->doi,
            'year' => $this->year,
            'abstract' => $this->abstract,
            'status' => $this->status,
            'research_area' => $this->research_area,
            'featured' => (bool) $this->featured,
            'researchgate_link' => $this->researchgate_link,
            'paper_link' => $this->paper_link,
            'pdf' => $mediaService->getUrl($this->pdf),
            'images' => $images,
            'enabled' => (bool) $this->enabled,
            'publish_status' => $this->publish_status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
