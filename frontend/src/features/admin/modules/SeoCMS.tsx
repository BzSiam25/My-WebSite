import React, { useState, useEffect } from 'react';
import { seoService } from '@/services/seoService';
import { ImageUploader } from '../components/ImageUploader';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const SeoCMS: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    site_title: '',
    meta_description: '',
    keywords: '',
    og_image: '',
    twitter_card: 'summary_large_image',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    seoService.getAdmin().then((res) => {
      if (res && res.data) {
        setFormData(res.data);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);
    try {
      await seoService.updateAdmin(formData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating SEO settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border/60 shadow-sm max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-heading font-bold text-foreground">
          SEO & OpenGraph Metadata CMS
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Site Title</label>
            <input
              type="text"
              required
              value={formData.site_title || ''}
              onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Meta Description</label>
            <textarea
              required
              rows={3}
              value={formData.meta_description || ''}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Keywords (comma separated)</label>
            <input
              type="text"
              value={formData.keywords || ''}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          <ImageUploader
            value={formData.og_image}
            onChange={(url) => setFormData({ ...formData, og_image: url })}
            folder="general"
            label="OpenGraph Social Banner"
          />

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            {isSaved && <span className="text-xs font-semibold text-emerald-500">Saved successfully!</span>}
            <div className="ml-auto">
              <Button type="submit" disabled={isLoading} className="rounded-full">
                {isLoading ? 'Saving Changes...' : 'Save SEO Settings'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
