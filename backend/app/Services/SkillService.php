<?php

namespace App\Services;

use App\Models\Skill;

class SkillService extends BaseCrudService
{
    protected string $modelClass = Skill::class;
    protected string $moduleName = 'skills';
}
