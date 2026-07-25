import React, { useState, useEffect } from 'react';
import { aboutService } from '@/services/aboutService';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const AboutCMS: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    biography: '',
    career_objective: '',
    core_strengths: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [newStrength, setNewStrength] = useState('');

  useEffect(() => {
    aboutService.getAdmin().then((res) => {
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
      await aboutService.updateAdmin(formData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating about section');
    } finally {
      setIsLoading(false);
    }
  };

  const addStrength = () => {
    if (!newStrength.trim()) return;
    setFormData({
      ...formData,
      core_strengths: [...(formData.core_strengths || []), newStrength.trim()],
    });
    setNewStrength('');
  };

  const removeStrength = (idx: number) => {
    const list = [...(formData.core_strengths || [])];
    list.splice(idx, 1);
    setFormData({ ...formData, core_strengths: list });
  };

  return (
    <Card className="bg-card border-border/60 shadow-sm max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-heading font-bold text-foreground">
          About & Core Strengths CMS
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Biography / Introduction</label>
            <textarea
              required
              rows={4}
              value={formData.biography || ''}
              onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Career Objective / Mission</label>
            <textarea
              required
              rows={3}
              value={formData.career_objective || ''}
              onChange={(e) => setFormData({ ...formData, career_objective: e.target.value })}
              className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
            />
          </div>

          {/* Core Strengths Chips */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Core Strengths</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newStrength}
                onChange={(e) => setNewStrength(e.target.value)}
                placeholder="Add a core strength..."
                className="flex-1 p-2 text-xs bg-background border border-border rounded-xl"
              />
              <Button type="button" size="sm" onClick={addStrength} className="rounded-xl">
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {(formData.core_strengths || []).map((s: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-muted border border-border/60 text-foreground"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeStrength(idx)}
                    className="text-muted-foreground hover:text-destructive text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            {isSaved && <span className="text-xs font-semibold text-emerald-500">Saved successfully!</span>}
            <div className="ml-auto">
              <Button type="submit" disabled={isLoading} className="rounded-full">
                {isLoading ? 'Saving Changes...' : 'Save About Settings'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
