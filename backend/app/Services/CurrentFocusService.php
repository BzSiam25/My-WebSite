<?php

namespace App\Services;

use App\Models\CurrentFocus;

class CurrentFocusService extends BaseCrudService
{
    protected string $modelClass = CurrentFocus::class;
    protected string $moduleName = 'current_focus';
}
