<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateHeroRequest;
use App\Http\Resources\HeroResource;
use App\Services\HeroService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class HeroController extends Controller
{
    use ApiResponse;

    protected HeroService $heroService;

    public function __construct(HeroService $heroService)
    {
        $this->heroService = $heroService;
    }

    public function show(): JsonResponse
    {
        $hero = $this->heroService->get();
        return $this->successResponse($hero ? new HeroResource($hero) : null);
    }

    public function update(UpdateHeroRequest $request): JsonResponse
    {
        $hero = $this->heroService->update($request->validated());
        return $this->successResponse(new HeroResource($hero), 'Hero section updated successfully');
    }
}
