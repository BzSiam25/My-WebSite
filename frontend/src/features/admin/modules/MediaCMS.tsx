import React, { useState } from 'react';
import { useAdminMedia } from '../hooks/useAdminData';
import { mediaService } from '@/services/mediaService';
import { ImageUploader } from '../components/ImageUploader';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Copy, Check } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const MediaCMS: React.FC = () => {
  const queryClient = useQueryClient();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data, refetch } = useAdminMedia();

  const mediaList = data?.data || [];

  const handleCopyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsLoading(true);
    try {
      await mediaService.deleteAdmin(deleteId);
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
      setDeleteId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting media');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-heading font-bold text-foreground">Upload Media</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader
            onChange={() => refetch()}
            folder="general"
            label="Upload New Media Item"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mediaList.map((item: any) => (
          <div key={item.id} className="relative group border border-border/60 rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-square bg-muted/20 flex items-center justify-center overflow-hidden">
              <img src={item.url} alt={item.filename} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-2 text-[10px] truncate font-medium text-foreground">{item.filename}</div>
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="sm" variant="outline" onClick={() => handleCopyUrl(item.id, item.url)} className="h-7 w-7 p-0">
                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
              <Button size="sm" variant="destructive" onClick={() => setDeleteId(item.id)} className="h-7 w-7 p-0">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Media"
        message="Are you sure you want to permanently delete this media file?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isLoading}
      />
    </div>
  );
};
