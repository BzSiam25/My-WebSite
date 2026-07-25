<?php

namespace App\Services;

use App\Models\Education;

class EducationService extends BaseCrudService
{
    protected string $modelClass = Education::class;
    protected string $moduleName = 'education';
}
