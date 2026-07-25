<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Skill extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'icon',
        'category',
        'display_order',
        'enabled',
        'color',
        'icon_url',
    ];

    protected $casts = [
        'enabled' => 'boolean',
        'display_order' => 'integer',
    ];
}
