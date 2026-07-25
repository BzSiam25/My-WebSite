<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SkillRequest;
use App\Http\Resources\SkillResource;
use App\Services\SkillService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    use ApiResponse;

    protected SkillService $service;

    public function __construct(SkillService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        $items = $this->service->getPaginated($request->all(), (int) $request->input('per_page', 50));
        return $this->paginatedResponse(SkillResource::collection($items)->resource);
    }

    public function store(SkillRequest $request): JsonResponse
    {
        $item = $this->service->create($request->validated());
        return $this->successResponse(new SkillResource($item), 'Skill created successfully', 201);
    }

    public function show(int $id): JsonResponse
    {
        $item = $this->service->findById($id);
        return $this->successResponse(new SkillResource($item));
    }

    public function update(SkillRequest $request, int $id): JsonResponse
    {
        $item = $this->service->update($id, $request->validated());
        return $this->successResponse(new SkillResource($item), 'Skill updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->successResponse(null, 'Skill soft-deleted successfully');
    }

    public function restore(int $id): JsonResponse
    {
        $item = $this->service->restore($id);
        return $this->successResponse(new SkillResource($item), 'Skill restored successfully');
    }

    public function toggleEnabled(int $id): JsonResponse
    {
        $item = $this->service->toggleField($id, 'enabled');
        return $this->successResponse(new SkillResource($item), 'Status toggled');
    }

    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:skills,id',
        ]);

        $this->service->reorder($request->input('ids'));
        return $this->successResponse(null, 'Reordered successfully');
    }
}
