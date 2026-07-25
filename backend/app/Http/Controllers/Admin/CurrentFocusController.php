<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CurrentFocusRequest;
use App\Http\Resources\CurrentFocusResource;
use App\Services\CurrentFocusService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CurrentFocusController extends Controller
{
    use ApiResponse;

    protected CurrentFocusService $service;

    public function __construct(CurrentFocusService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        $items = $this->service->getPaginated($request->all(), (int) $request->input('per_page', 15));
        return $this->paginatedResponse(CurrentFocusResource::collection($items)->resource);
    }

    public function store(CurrentFocusRequest $request): JsonResponse
    {
        $item = $this->service->create($request->validated());
        return $this->successResponse(new CurrentFocusResource($item), 'Item created successfully', 201);
    }

    public function show(int $id): JsonResponse
    {
        $item = $this->service->findById($id);
        return $this->successResponse(new CurrentFocusResource($item));
    }

    public function update(CurrentFocusRequest $request, int $id): JsonResponse
    {
        $item = $this->service->update($id, $request->validated());
        return $this->successResponse(new CurrentFocusResource($item), 'Item updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->successResponse(null, 'Item soft-deleted successfully');
    }

    public function restore(int $id): JsonResponse
    {
        $item = $this->service->restore($id);
        return $this->successResponse(new CurrentFocusResource($item), 'Item restored successfully');
    }

    public function toggleEnabled(int $id): JsonResponse
    {
        $item = $this->service->toggleField($id, 'enabled');
        return $this->successResponse(new CurrentFocusResource($item), 'Status toggled');
    }

    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:current_focus,id',
        ]);

        $this->service->reorder($request->input('ids'));
        return $this->successResponse(null, 'Reordered successfully');
    }
}
