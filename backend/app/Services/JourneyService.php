<?php

namespace App\Services;

use App\Models\Journey;

class JourneyService extends BaseCrudService
{
    protected string $modelClass = Journey::class;
    protected string $moduleName = 'journeys';
}
