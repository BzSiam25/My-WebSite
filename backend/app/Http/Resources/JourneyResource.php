<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JourneyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mediaService = app(MediaService::class);

        $images = array_map(function ($img) use ($mediaService) {
            return $mediaService->getUrl($img);
        }, $this->images ?? []);

        return [
            'id' => $this->id,
            'date' => $this->date,
            'title' => $this->title,
            'description' => $this->description,
            'images' => $images,
            'videos' => $this->videos ?? [],
            'enabled' => (bool) $this->enabled,
            'sort_order' => $this->sort_order,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
