<?php

namespace App\Services;

use App\Models\Project;

class ProjectService extends BaseCrudService
{
    protected string $modelClass = Project::class;
    protected string $moduleName = 'projects';
}
