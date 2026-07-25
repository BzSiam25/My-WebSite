<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComingSoonSection extends Model
{
    protected $table = 'coming_soon_sections';

    protected $fillable = [
        'label',
        'title',
        'description',
        'button_text',
        'button_url',
        'show_button',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'show_button' => 'boolean',
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];
}
