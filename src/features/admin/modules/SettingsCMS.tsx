import React, { useState, useEffect } from 'react';
import { settingService } from '@/services/settingService';
import { ImageUploader } from '../components/ImageUploader';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const SettingsCMS: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    site_name: '',
    logo: '',
    favicon: '',
    footer_text: '',
    github_username: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    settingService.getAdmin().then((res) => {
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
      await settingService.updateAdmin(formData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border/60 shadow-sm max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-heading font-bold text-foreground">
          System Settings & Branding CMS
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Site Name</label>
            <input
              type="text"
              required
              value={formData.site_name || ''}
              onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Footer Text</label>
            <input
              type="text"
              value={formData.footer_text || ''}
              onChange={(e) => setFormData({ ...formData, footer_text: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">GitHub Username (for API integrations)</label>
            <input
              type="text"
              value={formData.github_username || ''}
              onChange={(e) => setFormData({ ...formData, github_username: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUploader
              value={formData.logo}
              onChange={(url) => setFormData({ ...formData, logo: url })}
              folder="general"
              label="Site Logo"
            />

            <ImageUploader
              value={formData.favicon}
              onChange={(url) => setFormData({ ...formData, favicon: url })}
              folder="general"
              label="Favicon"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            {isSaved && <span className="text-xs font-semibold text-emerald-500">Saved successfully!</span>}
            <div className="ml-auto">
              <Button type="submit" disabled={isLoading} className="rounded-full">
                {isLoading ? 'Saving Changes...' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
