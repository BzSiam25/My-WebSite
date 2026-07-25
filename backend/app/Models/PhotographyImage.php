<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhotographyImage extends Model
{
    protected $fillable = ['album_id', 'category_id', 'url', 'caption', 'tags'];
    protected $casts = [
        'tags' => 'array',
    ];

    public function album()
    {
        return $this->belongsTo(PhotographyAlbum::class, 'album_id');
    }

    public function category()
    {
        return $this->belongsTo(PhotographyCategory::class, 'category_id');
    }
}
