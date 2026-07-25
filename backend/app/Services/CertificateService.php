<?php

namespace App\Services;

use App\Models\Certificate;

class CertificateService extends BaseCrudService
{
    protected string $modelClass = Certificate::class;
    protected string $moduleName = 'certificates';
}
