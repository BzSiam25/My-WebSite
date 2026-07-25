<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SkillResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mediaService = app(MediaService::class);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'icon' => $this->icon,
            'category' => $this->category,
            'display_order' => $this->display_order,
            'enabled' => (bool) $this->enabled,
            'color' => $this->color,
            'icon_url' => $mediaService->getUrl($this->icon_url),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
