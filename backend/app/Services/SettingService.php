<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;

class SettingService
{
    public function get(): ?Setting
    {
        return Setting::first();
    }

    public function update(array $data): Setting
    {
        $setting = Setting::first() ?: new Setting();
        $old = $setting->toArray();

        $setting->fill($data);
        $setting->save();

        Cache::forget('portfolio_settings');

        AuditLogger::log(
            action: $setting->wasRecentlyCreated ? 'created' : 'updated',
            module: 'settings',
            recordId: $setting->id,
            oldValues: $old,
            newValues: $setting->toArray()
        );

        return $setting;
    }
}
