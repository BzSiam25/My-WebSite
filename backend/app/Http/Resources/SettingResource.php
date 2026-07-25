<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mediaService = app(MediaService::class);

        return [
            'id' => $this->id,
            'site_name' => $this->site_name,
            'logo' => $mediaService->getUrl($this->logo),
            'favicon' => $mediaService->getUrl($this->favicon),
            'footer_text' => $this->footer_text,
            'google_analytics' => $this->google_analytics,
            'google_search_console' => $this->google_search_console,
            'theme_settings' => $this->theme_settings ?? [],
            'resume_file' => $mediaService->getUrl($this->resume_file),
            'github_username' => $this->github_username,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
