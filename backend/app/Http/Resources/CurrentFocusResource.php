<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CurrentFocusResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'icon' => $this->icon,
            'what' => $this->what,
            'why' => $this->why,
            'technology' => $this->technology ?? [],
            'progress' => $this->progress,
            'sort_order' => $this->sort_order,
            'enabled' => (bool) $this->enabled,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
