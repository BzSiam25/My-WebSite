<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EducationRequest;
use App\Http\Resources\EducationResource;
use App\Services\EducationService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    use ApiResponse;

    protected EducationService $service;

    public function __construct(EducationService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        $items = $this->service->getPaginated($request->all(), (int) $request->input('per_page', 15));
        return $this->paginatedResponse(EducationResource::collection($items)->resource);
    }

    public function store(EducationRequest $request): JsonResponse
    {
        $item = $this->service->create($request->validated());
        return $this->successResponse(new EducationResource($item), 'Education created successfully', 201);
    }

    public function show(int $id): JsonResponse
    {
        $item = $this->service->findById($id);
        return $this->successResponse(new EducationResource($item));
    }

    public function update(EducationRequest $request, int $id): JsonResponse
    {
        $item = $this->service->update($id, $request->validated());
        return $this->successResponse(new EducationResource($item), 'Education updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->successResponse(null, 'Education soft-deleted successfully');
    }

    public function restore(int $id): JsonResponse
    {
        $item = $this->service->restore($id);
        return $this->successResponse(new EducationResource($item), 'Education restored successfully');
    }

    public function toggleEnabled(int $id): JsonResponse
    {
        $item = $this->service->toggleField($id, 'enabled');
        return $this->successResponse(new EducationResource($item), 'Status toggled');
    }

    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:education,id',
        ]);

        $this->service->reorder($request->input('ids'));
        return $this->successResponse(null, 'Reordered successfully');
    }
}
