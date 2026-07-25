<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\JourneyRequest;
use App\Http\Resources\JourneyResource;
use App\Services\JourneyService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JourneyController extends Controller
{
    use ApiResponse;

    protected JourneyService $service;

    public function __construct(JourneyService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        $items = $this->service->getPaginated($request->all(), (int) $request->input('per_page', 15));
        return $this->paginatedResponse(JourneyResource::collection($items)->resource);
    }

    public function store(JourneyRequest $request): JsonResponse
    {
        $item = $this->service->create($request->validated());
        return $this->successResponse(new JourneyResource($item), 'Journey created successfully', 201);
    }

    public function show(int $id): JsonResponse
    {
        $item = $this->service->findById($id);
        return $this->successResponse(new JourneyResource($item));
    }

    public function update(JourneyRequest $request, int $id): JsonResponse
    {
        $item = $this->service->update($id, $request->validated());
        return $this->successResponse(new JourneyResource($item), 'Journey updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->successResponse(null, 'Journey soft-deleted successfully');
    }

    public function restore(int $id): JsonResponse
    {
        $item = $this->service->restore($id);
        return $this->successResponse(new JourneyResource($item), 'Journey restored successfully');
    }

    public function toggleEnabled(int $id): JsonResponse
    {
        $item = $this->service->toggleField($id, 'enabled');
        return $this->successResponse(new JourneyResource($item), 'Status toggled');
    }

    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:journeys,id',
        ]);

        $this->service->reorder($request->input('ids'));
        return $this->successResponse(null, 'Reordered successfully');
    }
}
