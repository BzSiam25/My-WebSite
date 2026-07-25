<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Services\AuditLogger;
use App\Services\MediaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    protected MediaService $mediaService;

    public function __construct(MediaService $mediaService)
    {
        $this->mediaService = $mediaService;
    }

    public function index(Request $request): JsonResponse
    {
        $query = Media::query();

        if ($search = $request->input('search')) {
            $query->where('filename', 'like', "%{$search}%");
        }

        if ($folder = $request->input('folder')) {
            $query->where('folder', $folder);
        }

        $perPage = (int) $request->input('per_page', 24);
        $items = $query->orderBy('id', 'desc')->paginate($perPage);

        // Transform paths to full URLs
        $items->getCollection()->transform(function ($media) {
            $media->url = $this->mediaService->getUrl($media->filepath);
            return $media;
        });

        return response()->json($items);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:10240', // Max 10MB
            'folder' => 'nullable|string|max:191',
        ]);

        $folder = $request->input('folder', 'general');
        $result = $this->mediaService->upload($request->file('file'), $folder);

        AuditLogger::log('uploaded', 'media', $result['id'], null, $result);

        return response()->json($result, 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $media = Media::findOrFail($id);
        $old = $media->toArray();

        $this->mediaService->delete($id);

        AuditLogger::log('deleted', 'media', $id, $old, null);

        return response()->json(['message' => 'Media deleted successfully']);
    }
}
