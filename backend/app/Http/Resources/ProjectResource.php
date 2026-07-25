<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $mediaService = app(MediaService::class);

        $images = array_map(function ($img) use ($mediaService) {
            return $mediaService->getUrl($img);
        }, $this->images ?? []);

        $galleryImages = array_map(function ($img) use ($mediaService) {
            return $mediaService->getUrl($img);
        }, $this->gallery_images ?? []);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'category' => $this->category,
            'year' => $this->year,
            'role' => $this->role,
            'client' => $this->client,
            'duration' => $this->duration,
            'description' => $this->description,
            'full_description' => $this->full_description,
            'problem_statement' => $this->problem_statement,
            'solution' => $this->solution,
            'tech_stack' => $this->tech_stack ?? [],
            'images' => $images,
            'cover_image' => $mediaService->getUrl($this->cover_image),
            'gallery_images' => $galleryImages,
            'video' => $this->video,
            'video_url' => $this->video_url,
            'github_url' => $this->github_url,
            'live_url' => $this->live_url,
            'research_url' => $this->research_url,
            'tags' => $this->tags ?? [],
            'featured' => (bool) $this->featured,
            'publish_status' => $this->publish_status,
            'enabled' => (bool) $this->enabled,
            'seo_title' => $this->seo_title,
            'seo_description' => $this->seo_description,
            'sort_order' => $this->sort_order,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
