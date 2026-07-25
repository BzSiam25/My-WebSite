<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Research extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'research';

    protected $fillable = [
        'title',
        'authors',
        'conference',
        'journal',
        'publisher',
        'doi',
        'year',
        'abstract',
        'status',
        'research_area',
        'featured',
        'researchgate_link',
        'paper_link',
        'pdf',
        'images',
        'enabled',
        'publish_status',
    ];

    protected $casts = [
        'year' => 'integer',
        'featured' => 'boolean',
        'enabled' => 'boolean',
        'images' => 'array',
    ];
}
