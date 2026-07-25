<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateAboutRequest;
use App\Http\Resources\AboutResource;
use App\Services\AboutService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class AboutController extends Controller
{
    use ApiResponse;

    protected AboutService $aboutService;

    public function __construct(AboutService $aboutService)
    {
        $this->aboutService = $aboutService;
    }

    public function show(): JsonResponse
    {
        $about = $this->aboutService->get();
        return $this->successResponse($about ? new AboutResource($about) : null);
    }

    public function update(UpdateAboutRequest $request): JsonResponse
    {
        $about = $this->aboutService->update($request->validated());
        return $this->successResponse(new AboutResource($about), 'About section updated successfully');
    }
}
