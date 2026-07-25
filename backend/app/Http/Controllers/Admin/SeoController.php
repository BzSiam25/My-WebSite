<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateSeoRequest;
use App\Http\Resources\SeoResource;
use App\Services\SeoService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class SeoController extends Controller
{
    use ApiResponse;

    protected SeoService $service;

    public function __construct(SeoService $service)
    {
        $this->service = $service;
    }

    public function show(): JsonResponse
    {
        $seo = $this->service->get();
        return $this->successResponse($seo ? new SeoResource($seo) : null);
    }

    public function update(UpdateSeoRequest $request): JsonResponse
    {
        $seo = $this->service->update($request->validated());
        return $this->successResponse(new SeoResource($seo), 'SEO settings updated successfully');
    }
}
