<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BackupResource;
use App\Models\Backup;
use App\Services\AuditLogger;
use App\Services\BackupService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class BackupController extends Controller
{
    use ApiResponse;

    protected BackupService $service;

    public function __construct(BackupService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        $backups = $this->service->getPaginated((int) $request->input('per_page', 15));
        return $this->paginatedResponse(BackupResource::collection($backups)->resource);
    }

    public function createDatabaseBackup(): JsonResponse
    {
        try {
            $backupRecord = $this->service->createDatabaseDump();
            return $this->successResponse(new BackupResource($backupRecord), 'Database backup created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse('Backup creation failed: ' . $e->getMessage(), 500);
        }
    }

    public function download(int $id): BinaryFileResponse|JsonResponse
    {
        $backup = Backup::findOrFail($id);
        $fullPath = storage_path("app/public/{$backup->path}");

        if (!file_exists($fullPath)) {
            return $this->errorResponse('Backup file not found on server', 404);
        }

        AuditLogger::log('downloaded_backup', 'backups', $backup->id, null, null);

        return response()->download($fullPath, $backup->filename);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return $this->successResponse(null, 'Backup deleted successfully');
    }
}
