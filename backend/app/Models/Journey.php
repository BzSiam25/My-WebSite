<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Journey extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'date',
        'title',
        'description',
        'images',
        'videos',
        'enabled',
        'sort_order',
    ];

    protected $casts = [
        'images' => 'array',
        'videos' => 'array',
        'enabled' => 'boolean',
        'sort_order' => 'integer',
    ];
}
