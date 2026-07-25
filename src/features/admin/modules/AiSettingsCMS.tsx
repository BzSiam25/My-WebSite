import React, { useState, useEffect } from 'react';
import { aiService } from '@/services/aiService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Key, Database, Save, Eye, EyeOff } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const AiSettingsCMS: React.FC = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>({
    system_prompt: '',
    knowledge_base: '',
    model: 'gemini-1.5-flash',
    temperature: 0.7,
    api_key: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const data = await aiService.getAdmin();
      if (data && Object.keys(data).length > 0) {
        setFormData({
          system_prompt: data.system_prompt || '',
          knowledge_base: data.knowledge_base || '',
          model: data.model || 'gemini-1.5-flash',
          temperature: data.temperature ?? 0.7,
          api_key: data.api_key || '',
        });
      }
    } catch (err: any) {
      console.error('Failed to load AI settings', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await aiService.updateAdmin(formData);
      queryClient.invalidateQueries({ queryKey: ['ai-settings'] });
      setMessage({ type: 'success', text: 'AI Chatbot settings updated successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error updating AI settings' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        Loading AI Chatbot configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {message && (
        <div className={`p-4 rounded-xl text-xs font-semibold ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Gemini API Key Card */}
        <Card className="bg-card border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-heading font-bold text-foreground flex items-center gap-2">
              <Key className="w-4 h-4 text-primary" />
              Google Gemini API Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                Gemini API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  placeholder="AIzaSy..."
                  value={formData.api_key || ''}
                  onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                  className="w-full pr-10 p-3 text-xs bg-background border border-border rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  aria-label={showKey ? 'Hide API key' : 'Show API key'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                Leave empty to run in <strong>Offline Knowledge-Base Mode</strong>. Obtain a free key from{' '}
                <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-primary underline">
                  Google AI Studio
                </a>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  LLM Model
                </label>
                <select
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full p-2.5 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="gemini-1.5-flash">gemini-1.5-flash (Fast & Recommended)</option>
                  <option value="gemini-1.5-pro">gemini-1.5-pro (High Reasoning)</option>
                  <option value="gemini-1.0-pro">gemini-1.0-pro</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  Temperature ({formData.temperature})
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                  className="w-full mt-2 accent-primary cursor-pointer"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Prompt Card */}
        <Card className="bg-card border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-heading font-bold text-foreground flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-500" />
              Bot Persona & System Prompt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              data-gramm="false"
              rows={4}
              required
              value={formData.system_prompt || ''}
              onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
              placeholder="You are Siam's AI assistant..."
              className="w-full p-3 text-xs bg-background border border-border rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </CardContent>
        </Card>

        {/* Knowledge Base Card */}
        <Card className="bg-card border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-heading font-bold text-foreground flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" />
              Knowledge Base Context
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              data-gramm="false"
              rows={8}
              required
              value={formData.knowledge_base || ''}
              onChange={(e) => setFormData({ ...formData, knowledge_base: e.target.value })}
              placeholder="Insert factual portfolio context..."
              className="w-full p-3 text-xs bg-background border border-border rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="rounded-full gap-2 px-6">
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Settings...' : 'Save AI Settings'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
