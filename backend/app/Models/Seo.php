<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seo extends Model
{
    protected $table = 'seos';
    protected $fillable = [
        'site_title', 'meta_description', 'keywords', 'og_image', 'twitter_card',
        'canonical_url', 'robots', 'sitemap_url', 'json_ld'
    ];
    protected $casts = [
        'json_ld' => 'array',
    ];
}
