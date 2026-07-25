import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { mediaService } from '@/services/mediaService';
import { getImageUrl } from '@/hooks/usePortfolio';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  folder = 'general',
  label = 'Upload Image',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const res = await mediaService.upload(file, folder);
      const url = res.url || res.data?.url || res.filepath;
      onChange(url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-border bg-muted/20 aspect-video max-w-sm flex items-center justify-center">
          <img
            src={getImageUrl(value)}
            alt="Upload Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border/60 rounded-xl bg-muted/10 hover:bg-muted/20 cursor-pointer transition-colors max-w-sm">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
            {uploading ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>
          <span className="text-xs font-medium text-foreground">
            {uploading ? 'Uploading...' : 'Click or drag image to upload'}
          </span>
          <span className="text-[10px] text-muted-foreground mt-1">
            PNG, JPG, WEBP up to 5MB
          </span>
        </label>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};
