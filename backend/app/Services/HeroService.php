<?php

namespace App\Services;

use App\Models\Hero;
use Illuminate\Support\Facades\Cache;

class HeroService
{
    public function get(): ?Hero
    {
        return Hero::first();
    }

    public function update(array $data): Hero
    {
        $hero = Hero::first() ?: new Hero();
        $old = $hero->toArray();

        $hero->fill($data);
        $hero->save();

        Cache::forget('portfolio_hero');

        AuditLogger::log(
            action: $hero->wasRecentlyCreated ? 'created' : 'updated',
            module: 'hero',
            recordId: $hero->id,
            oldValues: $old,
            newValues: $hero->toArray()
        );

        return $hero;
    }
}
