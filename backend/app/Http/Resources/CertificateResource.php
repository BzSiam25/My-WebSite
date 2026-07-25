<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mediaService = app(MediaService::class);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'issuer' => $this->issuer,
            'issue_date' => $this->issue_date,
            'credential_id' => $this->credential_id,
            'credential_url' => $this->credential_url,
            'image' => $mediaService->getUrl($this->image),
            'enabled' => (bool) $this->enabled,
            'sort_order' => $this->sort_order,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
