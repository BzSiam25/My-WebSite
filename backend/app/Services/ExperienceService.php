<?php

namespace App\Services;

use App\Models\Experience;

class ExperienceService extends BaseCrudService
{
    protected string $modelClass = Experience::class;
    protected string $moduleName = 'experience';
}
