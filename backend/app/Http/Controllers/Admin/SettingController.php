<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateSettingRequest;
use App\Http\Resources\SettingResource;
use App\Services\SettingService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    use ApiResponse;

    protected SettingService $service;

    public function __construct(SettingService $service)
    {
        $this->service = $service;
    }

    public function show(): JsonResponse
    {
        $setting = $this->service->get();
        return $this->successResponse($setting ? new SettingResource($setting) : null);
    }

    public function update(UpdateSettingRequest $request): JsonResponse
    {
        $setting = $this->service->update($request->validated());
        return $this->successResponse(new SettingResource($setting), 'Settings updated successfully');
    }
}
