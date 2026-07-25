<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'site_name', 'logo', 'favicon', 'footer_text', 'google_analytics',
        'google_search_console', 'theme_settings', 'resume_file', 'github_username'
    ];
    protected $casts = [
        'theme_settings' => 'array',
    ];
}
