<?php

namespace App\Services;

use App\Models\Seo;
use Illuminate\Support\Facades\Cache;

class SeoService
{
    public function get(): ?Seo
    {
        return Seo::first();
    }

    public function update(array $data): Seo
    {
        $seo = Seo::first() ?: new Seo();
        $old = $seo->toArray();

        $seo->fill($data);
        $seo->save();

        Cache::forget('portfolio_seo');

        AuditLogger::log(
            action: $seo->wasRecentlyCreated ? 'created' : 'updated',
            module: 'seo',
            recordId: $seo->id,
            oldValues: $old,
            newValues: $seo->toArray()
        );

        return $seo;
    }
}
