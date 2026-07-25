<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $fillable = [
        'title', 'slug', 'body', 'category_id', 'tags', 'cover_image',
        'seo_title', 'seo_description', 'seo_keywords', 'draft', 'published_at'
    ];
    protected $casts = [
        'draft' => 'boolean',
        'tags' => 'array',
        'published_at' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'category_id');
    }
}
