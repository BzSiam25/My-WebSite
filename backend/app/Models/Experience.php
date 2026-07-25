<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Experience extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company',
        'company_logo',
        'role',
        'employment_type',
        'location',
        'start_date',
        'end_date',
        'current_position',
        'description',
        'responsibilities',
        'technologies',
        'sort_order',
        'enabled',
    ];

    protected $casts = [
        'current_position' => 'boolean',
        'enabled' => 'boolean',
        'sort_order' => 'integer',
        'technologies' => 'array',
        'responsibilities' => 'array',
    ];
}
