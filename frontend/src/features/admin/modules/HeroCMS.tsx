import React, { useState, useEffect } from 'react';
import { heroService } from '@/services/heroService';
import { ImageUploader } from '../components/ImageUploader';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const HeroCMS: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    name: '',
    short_name: '',
    designation: '',
    subtitle: '',
    description: '',
    profile_image: '',
    hero_image: '',
    cta_buttons: [],
    social_links: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    heroService.getAdmin().then((res) => {
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
      await heroService.updateAdmin(formData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating hero section');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border/60 shadow-sm max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-heading font-bold text-foreground">
          Hero Header CMS
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Full Name</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Short Name</label>
              <input
                type="text"
                required
                value={formData.short_name || ''}
                onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Designation</label>
            <input
              type="text"
              required
              value={formData.designation || ''}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Subtitle</label>
            <input
              type="text"
              required
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Full Description</label>
            <textarea
              required
              rows={4}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader
              value={formData.profile_image}
              onChange={(url) => setFormData({ ...formData, profile_image: url })}
              folder="profile"
              label="Profile Avatar"
            />

            <ImageUploader
              value={formData.hero_image}
              onChange={(url) => setFormData({ ...formData, hero_image: url })}
              folder="profile"
              label="Hero Banner Image"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            {isSaved && <span className="text-xs font-semibold text-emerald-500">Saved successfully!</span>}
            <div className="ml-auto">
              <Button type="submit" disabled={isLoading} className="rounded-full">
                {isLoading ? 'Saving Changes...' : 'Save Hero Settings'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
