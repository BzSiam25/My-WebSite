<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AboutResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'biography' => $this->biography,
            'career_objective' => $this->career_objective,
            'core_strengths' => $this->core_strengths ?? [],
            'quick_facts' => $this->quick_facts ?? [],
            'statistics' => $this->statistics ?? [],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
