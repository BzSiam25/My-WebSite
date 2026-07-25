<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'media';
    protected $fillable = ['filename', 'filepath', 'file_type', 'file_size', 'folder'];
}
