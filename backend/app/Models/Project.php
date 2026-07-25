<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'year',
        'role',
        'client',
        'duration',
        'description',
        'full_description',
        'problem_statement',
        'solution',
        'tech_stack',
        'images',
        'cover_image',
        'gallery_images',
        'video',
        'video_url',
        'github_url',
        'live_url',
        'research_url',
        'tags',
        'featured',
        'publish_status',
        'enabled',
        'seo_title',
        'seo_description',
        'sort_order',
    ];

    protected $casts = [
        'year' => 'integer',
        'featured' => 'boolean',
        'enabled' => 'boolean',
        'sort_order' => 'integer',
        'tech_stack' => 'array',
        'images' => 'array',
        'gallery_images' => 'array',
        'tags' => 'array',
    ];
}
