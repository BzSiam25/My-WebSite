<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhotographyAlbum extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'cover_image'];

    public function images()
    {
        return $this->hasMany(PhotographyImage::class, 'album_id');
    }
}
