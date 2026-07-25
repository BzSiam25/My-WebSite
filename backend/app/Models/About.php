<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $table = 'about';
    protected $fillable = [
        'biography', 'career_objective', 'core_strengths', 'quick_facts', 'statistics'
    ];
    protected $casts = [
        'core_strengths' => 'array',
        'quick_facts' => 'array',
        'statistics' => 'array',
    ];
}
