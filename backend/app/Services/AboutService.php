<?php

namespace App\Services;

use App\Models\About;

class AboutService
{
    public function get(): ?About
    {
        return About::first();
    }

    public function update(array $data): About
    {
        $about = About::first() ?: new About();
        $old = $about->toArray();

        $about->fill($data);
        $about->save();

        AuditLogger::log(
            action: $about->wasRecentlyCreated ? 'created' : 'updated',
            module: 'about',
            recordId: $about->id,
            oldValues: $old,
            newValues: $about->toArray()
        );

        return $about;
    }
}
