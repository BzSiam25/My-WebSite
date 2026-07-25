<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mediaService = app(MediaService::class);

        return [
            'id' => $this->id,
            'filename' => $this->filename,
            'filepath' => $this->filepath,
            'url' => $mediaService->getUrl($this->filepath),
            'file_type' => $this->file_type,
            'file_size' => $this->file_size,
            'folder' => $this->folder,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
