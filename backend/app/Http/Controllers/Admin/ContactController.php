<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateContactRequest;
use App\Http\Resources\ContactResource;
use App\Services\ContactService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    use ApiResponse;

    protected ContactService $service;

    public function __construct(ContactService $service)
    {
        $this->service = $service;
    }

    public function show(): JsonResponse
    {
        $contact = $this->service->get();
        return $this->successResponse($contact ? new ContactResource($contact) : null);
    }

    public function update(UpdateContactRequest $request): JsonResponse
    {
        $contact = $this->service->update($request->validated());
        return $this->successResponse(new ContactResource($contact), 'Contact information updated successfully');
    }
}
