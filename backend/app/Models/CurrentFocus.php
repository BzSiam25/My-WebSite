<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CurrentFocus extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'current_focus';

    protected $fillable = [
        'title',
        'icon',
        'what',
        'why',
        'technology',
        'progress',
        'sort_order',
        'enabled',
    ];

    protected $casts = [
        'technology' => 'array',
        'enabled' => 'boolean',
        'sort_order' => 'integer',
    ];
}
