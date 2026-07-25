<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CertificateRequest;
use App\Http\Resources\CertificateResource;
use App\Services\CertificateService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    use ApiResponse;

    protected CertificateService $service;

    public function __construct(CertificateService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        $items = $this->service->getPaginated($request->all(), (int) $request->input('per_page', 15));
        return $this->paginatedResponse(CertificateResource::collection($items)->resource);
    }

    public function store(CertificateRequest $request): JsonResponse
    {
        $item = $this->service->create($request->validated());
        return $this->successResponse(new CertificateResource($item), 'Certificate created successfully', 201);
    }

    public function show(int $id): JsonResponse
    {
        $item = $this->service->findById($id);
        return $this->successResponse(new CertificateResource($item));
    }

    public function update(CertificateRequest $request, int $id): JsonResponse
    {
        $item = $this->service->update($id, $request->validated());
        return $this->successResponse(new CertificateResource($item), 'Certificate updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->successResponse(null, 'Certificate soft-deleted successfully');
    }

    public function restore(int $id): JsonResponse
    {
        $item = $this->service->restore($id);
        return $this->successResponse(new CertificateResource($item), 'Certificate restored successfully');
    }

    public function toggleEnabled(int $id): JsonResponse
    {
        $item = $this->service->toggleField($id, 'enabled');
        return $this->successResponse(new CertificateResource($item), 'Status toggled');
    }

    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:certificates,id',
        ]);

        $this->service->reorder($request->input('ids'));
        return $this->successResponse(null, 'Reordered successfully');
    }
}
