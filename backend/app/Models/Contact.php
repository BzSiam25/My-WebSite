<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'phone',
        'whatsapp',
        'linkedin',
        'github',
        'researchgate',
        'facebook',
        'twitter',
        'instagram',
        'youtube',
        'location',
        'google_maps',
        'portfolio_url',
    ];
}
