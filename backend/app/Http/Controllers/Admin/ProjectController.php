<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Services\ProjectService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    use ApiResponse;

    protected ProjectService $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index(Request $request): JsonResponse
    {
        $projects = $this->projectService->getPaginated(
            $request->all(),
            (int) $request->input('per_page', 15)
        );

        return $this->paginatedResponse(ProjectResource::collection($projects)->resource);
    }

    public function store(ProjectRequest $request): JsonResponse
    {
        $project = $this->projectService->create($request->validated());
        return $this->successResponse(new ProjectResource($project), 'Project created successfully', 201);
    }

    public function show(int $id): JsonResponse
    {
        $project = $this->projectService->findById($id);
        return $this->successResponse(new ProjectResource($project));
    }

    public function update(ProjectRequest $request, int $id): JsonResponse
    {
        $project = $this->projectService->update($id, $request->validated());
        return $this->successResponse(new ProjectResource($project), 'Project updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->projectService->delete($id);
        return $this->successResponse(null, 'Project soft-deleted successfully');
    }

    public function restore(int $id): JsonResponse
    {
        $project = $this->projectService->restore($id);
        return $this->successResponse(new ProjectResource($project), 'Project restored successfully');
    }

    public function togglePublish(int $id): JsonResponse
    {
        $project = $this->projectService->toggleField($id, 'publish_status');
        return $this->successResponse(new ProjectResource($project), 'Project publish status toggled');
    }

    public function toggleFeatured(int $id): JsonResponse
    {
        $project = $this->projectService->toggleField($id, 'featured');
        return $this->successResponse(new ProjectResource($project), 'Project featured status toggled');
    }

    public function toggleEnabled(int $id): JsonResponse
    {
        $project = $this->projectService->toggleField($id, 'enabled');
        return $this->successResponse(new ProjectResource($project), 'Project enabled status toggled');
    }

    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:projects,id',
        ]);

        $this->projectService->reorder($request->input('ids'));
        return $this->successResponse(null, 'Projects reordered successfully');
    }
}
