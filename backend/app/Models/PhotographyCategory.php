<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhotographyCategory extends Model
{
    protected $fillable = ['name', 'slug'];

    public function images()
    {
        return $this->hasMany(PhotographyImage::class, 'category_id');
    }
}
