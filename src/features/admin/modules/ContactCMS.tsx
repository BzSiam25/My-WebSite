import React, { useState, useEffect } from 'react';
import { contactService } from '@/services/contactService';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const ContactCMS: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    email: '',
    phone: '',
    whatsapp: '',
    location: '',
    github: '',
    linkedin: '',
    twitter: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    contactService.getAdmin().then((res) => {
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
      await contactService.updateAdmin(formData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating contact info');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border/60 shadow-sm max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-heading font-bold text-foreground">
          Contact & Social Links CMS
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Phone</label>
              <input
                type="text"
                required
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Location</label>
            <input
              type="text"
              required
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">GitHub Profile</label>
              <input
                type="text"
                value={formData.github || ''}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">LinkedIn Profile</label>
              <input
                type="text"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            {isSaved && <span className="text-xs font-semibold text-emerald-500">Saved successfully!</span>}
            <div className="ml-auto">
              <Button type="submit" disabled={isLoading} className="rounded-full">
                {isLoading ? 'Saving Changes...' : 'Save Contact Info'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
