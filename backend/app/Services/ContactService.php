<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Support\Facades\Cache;

class ContactService
{
    public function get(): ?Contact
    {
        return Contact::first();
    }

    public function update(array $data): Contact
    {
        $contact = Contact::first() ?: new Contact();
        $old = $contact->toArray();

        $contact->fill($data);
        $contact->save();

        Cache::forget('portfolio_contact');

        AuditLogger::log(
            action: $contact->wasRecentlyCreated ? 'created' : 'updated',
            module: 'contact',
            recordId: $contact->id,
            oldValues: $old,
            newValues: $contact->toArray()
        );

        return $contact;
    }
}
