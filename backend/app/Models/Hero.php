<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    protected $table = 'hero';
    protected $fillable = [
        'name', 'short_name', 'designation', 'subtitle', 'description',
        'resume_pdf', 'profile_image', 'hero_image', 'cta_buttons', 'social_links'
    ];
    protected $casts = [
        'cta_buttons' => 'array',
        'social_links' => 'array',
    ];
}
