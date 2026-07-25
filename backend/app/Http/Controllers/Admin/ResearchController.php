<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResearchRequest;
use App\Http\Resources\ResearchResource;
use App\Services\ResearchService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ResearchController extends Controller
{
    use ApiResponse;

    protected ResearchService $service;

    public function __construct(ResearchService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        $items = $this->service->getPaginated($request->all(), (int) $request->input('per_page', 15));
        return $this->paginatedResponse(ResearchResource::collection($items)->resource);
    }

    public function store(ResearchRequest $request): JsonResponse
    {
        $item = $this->service->create($request->validated());
        return $this->successResponse(new ResearchResource($item), 'Research paper created successfully', 201);
    }

    public function show(int $id): JsonResponse
    {
        $item = $this->service->findById($id);
        return $this->successResponse(new ResearchResource($item));
    }

    public function update(ResearchRequest $request, int $id): JsonResponse
    {
        $item = $this->service->update($id, $request->validated());
        return $this->successResponse(new ResearchResource($item), 'Research paper updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->successResponse(null, 'Research paper soft-deleted successfully');
    }

    public function restore(int $id): JsonResponse
    {
        $item = $this->service->restore($id);
        return $this->successResponse(new ResearchResource($item), 'Research paper restored successfully');
    }

    public function togglePublish(int $id): JsonResponse
    {
        $item = $this->service->toggleField($id, 'publish_status');
        return $this->successResponse(new ResearchResource($item), 'Publish status toggled');
    }

    public function toggleFeatured(int $id): JsonResponse
    {
        $item = $this->service->toggleField($id, 'featured');
        return $this->successResponse(new ResearchResource($item), 'Featured status toggled');
    }

    public function toggleEnabled(int $id): JsonResponse
    {
        $item = $this->service->toggleField($id, 'enabled');
        return $this->successResponse(new ResearchResource($item), 'Enabled status toggled');
    }
}
