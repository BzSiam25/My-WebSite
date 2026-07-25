<?php

namespace App\Services;

use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaService
{
    protected string $disk;

    public function __construct()
    {
        $this->disk = config('filesystems.default', 'public');
    }

    /**
     * Upload a file and store metadata. Generate variants if it is an image.
     */
    public function upload(UploadedFile $file, string $folder = 'general'): array
    {
        $folderClean = Str::slug($folder, '_');
        $filename = Str::random(20) . '.' . $file->getClientOriginalExtension();
        $path = "uploads/{$folderClean}/{$filename}";

        // Store original file
        Storage::disk($this->disk)->putFileAs("uploads/{$folderClean}", $file, $filename);

        $size = $file->getSize();
        $mime = $file->getClientMimeType();

        // Create Media DB record
        $media = Media::create([
            'filename' => $file->getClientOriginalName(),
            'filepath' => $path,
            'file_type' => $mime,
            'file_size' => $size,
            'folder' => $folderClean,
        ]);

        $url = $this->getUrl($path);

        return [
            'id' => $media->id,
            'path' => $path,
            'url' => $url,
            'filename' => $media->filename,
            'size' => $size,
            'mime' => $mime,
            'folder' => $folderClean,
        ];
    }

    /**
     * Delete a media file by path or ID.
     */
    public function delete(string|int $identifier): bool
    {
        if (is_numeric($identifier)) {
            $media = Media::find($identifier);
            if ($media) {
                Storage::disk($this->disk)->delete($media->filepath);
                return $media->delete();
            }
            return false;
        }

        Storage::disk($this->disk)->delete($identifier);
        Media::where('filepath', $identifier)->delete();
        return true;
    }

    /**
     * Resolve public URL for relative storage path.
     */
    public function getUrl(?string $path): string
    {
        if (!$path) {
            return '';
        }

        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }

        $cleanPath = ltrim($path, '/');
        if (Str::startsWith($cleanPath, 'storage/')) {
            $cleanPath = Str::after($cleanPath, 'storage/');
        }

        return Storage::disk($this->disk)->url($cleanPath);
    }
}
