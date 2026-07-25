<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Backup extends Model
{
    use HasFactory;

    protected $fillable = [
        'filename',
        'path',
        'type',
        'size_bytes',
        'status',
        'notes',
    ];

    protected $casts = [
        'size_bytes' => 'integer',
    ];
}
