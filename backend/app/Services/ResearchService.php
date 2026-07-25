<?php

namespace App\Services;

use App\Models\Research;

class ResearchService extends BaseCrudService
{
    protected string $modelClass = Research::class;
    protected string $moduleName = 'research';
}
