import React, { useState, useEffect } from 'react';
import { aiService } from '@/services/aiService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Save, Eye, EyeOff, RefreshCw, Power, Shield, Cpu, MessageSquare } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const AVAILABLE_MODULES = [
  'Hero', 'About', 'Current Focus', 'Projects', 'Skills', 'Experience',
  'Education', 'Research', 'Journeys', 'Certificates', 'Contact', 'SEO', 'Settings'
];

export const AiSettingsCMS: React.FC = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>({
    provider: 'gemini',
    system_prompt: "You are Siam's official Portfolio AI Assistant. Answer strictly based on Siam's live database knowledge context.",
    knowledge_base: '',
    model: 'gemini-1.5-flash',
    temperature: 0.7,
    max_tokens: 1000,
    api_key: '',
    openai_api_key: '',
    gemini_api_key: '',
    claude_api_key: '',
    greeting_message: "Hello! I am Siam's Portfolio AI Assistant. Ask me anything about his projects, skills, experience, or research!",
    fallback_message: "I don't currently have information about that in my portfolio.",
    is_enabled: true,
    allowed_modules: AVAILABLE_MODULES,
    rate_limit: 60,
    conversation_memory: 10,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
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
          provider: data.provider || 'gemini',
          system_prompt: data.system_prompt || "You are Siam's official Portfolio AI Assistant. Answer strictly based on Siam's live database knowledge context.",
          knowledge_base: data.knowledge_base || '',
          model: data.model || 'gemini-1.5-flash',
          temperature: data.temperature ?? 0.7,
          max_tokens: data.max_tokens ?? 1000,
          api_key: data.api_key || '',
          openai_api_key: data.openai_api_key || '',
          gemini_api_key: data.gemini_api_key || '',
          claude_api_key: data.claude_api_key || '',
          greeting_message: data.greeting_message || "Hello! I am Siam's Portfolio AI Assistant. Ask me anything about his projects, skills, experience, or research!",
          fallback_message: data.fallback_message || "I don't currently have information about that in my portfolio.",
          is_enabled: data.is_enabled ?? true,
          allowed_modules: data.allowed_modules || AVAILABLE_MODULES,
          rate_limit: data.rate_limit ?? 60,
          conversation_memory: data.conversation_memory ?? 10,
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
      setMessage({ type: 'success', text: 'Dynamic Portfolio AI Assistant settings saved successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error updating AI settings' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearCache = async () => {
    setIsClearingCache(true);
    try {
      await aiService.clearCache();
      setMessage({ type: 'success', text: 'AI Knowledge Context cache refreshed from live database!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to clear cache' });
    } finally {
      setIsClearingCache(false);
    }
  };

  const toggleShowKey = (field: string) => {
    setShowKey(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleModuleToggle = (mod: string) => {
    const current = formData.allowed_modules || [];
    if (current.includes(mod)) {
      setFormData({ ...formData, allowed_modules: current.filter((m: string) => m !== mod) });
    } else {
      setFormData({ ...formData, allowed_modules: [...current, mod] });
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        Loading Portfolio AI Assistant configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {message && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'}`}>
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs hover:underline opacity-80">Dismiss</button>
        </div>
      )}

      {/* Header & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border/60 p-5 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-lg font-heading font-bold text-foreground flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Portfolio AI Assistant (RAG Engine)
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Single Source of Truth: Answers strictly generated from live CMS database records
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClearCache}
            disabled={isClearingCache}
            className="rounded-full gap-2 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isClearingCache ? 'animate-spin' : ''}`} />
            Refresh RAG Cache
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Enable / Disable Status Card */}
        <Card className="bg-card border-border/60 shadow-sm">
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.is_enabled ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                <Power className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">AI Assistant Status</h3>
                <p className="text-xs text-muted-foreground">
                  {formData.is_enabled ? 'Public AI Chatbot is ACTIVE' : 'Public AI Chatbot is DISABLED'}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_enabled}
                onChange={(e) => setFormData({ ...formData, is_enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </CardContent>
        </Card>

        {/* LLM Provider & Credentials Card */}
        <Card className="bg-card border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-heading font-bold text-foreground flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              LLM Provider & Model Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  Primary Provider
                </label>
                <select
                  value={formData.provider}
                  onChange={(e) => {
                    const p = e.target.value;
                    let defaultModel = 'gemini-1.5-flash';
                    if (p === 'openai') defaultModel = 'gpt-4o-mini';
                    if (p === 'claude') defaultModel = 'claude-3-5-sonnet-20240620';
                    setFormData({ ...formData, provider: p, model: defaultModel });
                  }}
                  className="w-full p-2.5 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                >
                  <option value="gemini">Google Gemini AI</option>
                  <option value="openai">OpenAI (ChatGPT)</option>
                  <option value="claude">Anthropic Claude</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  Model Variant
                </label>
                <select
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full p-2.5 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                >
                  {formData.provider === 'gemini' && (
                    <>
                      <option value="gemini-1.5-flash">gemini-1.5-flash (Fastest & Recommended)</option>
                      <option value="gemini-1.5-pro">gemini-1.5-pro (High Accuracy)</option>
                      <option value="gemini-1.0-pro">gemini-1.0-pro</option>
                    </>
                  )}
                  {formData.provider === 'openai' && (
                    <>
                      <option value="gpt-4o-mini">gpt-4o-mini (Fast & Recommended)</option>
                      <option value="gpt-4o">gpt-4o (Omni High Capability)</option>
                      <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                    </>
                  )}
                  {formData.provider === 'claude' && (
                    <>
                      <option value="claude-3-5-sonnet-20240620">claude-3-5-sonnet (Recommended)</option>
                      <option value="claude-3-haiku-20240307">claude-3-haiku (Fast)</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  Max Output Tokens ({formData.max_tokens})
                </label>
                <input
                  type="number"
                  min="200"
                  max="4000"
                  value={formData.max_tokens}
                  onChange={(e) => setFormData({ ...formData, max_tokens: parseInt(e.target.value) || 1000 })}
                  className="w-full p-2.5 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                />
              </div>
            </div>

            {/* API Keys */}
            <div className="space-y-3 pt-2">
              {/* Gemini Key */}
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  Google Gemini API Key
                </label>
                <div className="relative">
                  <input
                    type={showKey['gemini'] ? 'text' : 'password'}
                    placeholder="AIzaSy..."
                    value={formData.gemini_api_key || formData.api_key || ''}
                    onChange={(e) => setFormData({ ...formData, gemini_api_key: e.target.value, api_key: e.target.value })}
                    className="w-full pr-10 p-2.5 text-xs bg-background border border-border rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey('gemini')}
                    aria-label="Toggle Gemini key visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showKey['gemini'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* OpenAI Key */}
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  OpenAI API Key (Optional)
                </label>
                <div className="relative">
                  <input
                    type={showKey['openai'] ? 'text' : 'password'}
                    placeholder="sk-proj-..."
                    value={formData.openai_api_key || ''}
                    onChange={(e) => setFormData({ ...formData, openai_api_key: e.target.value })}
                    className="w-full pr-10 p-2.5 text-xs bg-background border border-border rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey('openai')}
                    aria-label="Toggle OpenAI key visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showKey['openai'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Claude Key */}
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  Anthropic Claude API Key (Optional)
                </label>
                <div className="relative">
                  <input
                    type={showKey['claude'] ? 'text' : 'password'}
                    placeholder="sk-ant-..."
                    value={formData.claude_api_key || ''}
                    onChange={(e) => setFormData({ ...formData, claude_api_key: e.target.value })}
                    className="w-full pr-10 p-2.5 text-xs bg-background border border-border rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey('claude')}
                    aria-label="Toggle Claude key visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showKey['claude'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Persona & Messaging Rules */}
        <Card className="bg-card border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-heading font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-500" />
              Bot Persona & Messaging Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                System Prompt (RAG Instructions)
              </label>
              <textarea
                data-gramm="false"
                rows={3}
                required
                value={formData.system_prompt || ''}
                onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
                className="w-full p-3 text-xs bg-background border border-border rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  Custom Initial Greeting Message
                </label>
                <textarea
                  data-gramm="false"
                  rows={2}
                  value={formData.greeting_message || ''}
                  onChange={(e) => setFormData({ ...formData, greeting_message: e.target.value })}
                  className="w-full p-3 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  Fallback / Zero-Info Message
                </label>
                <textarea
                  data-gramm="false"
                  rows={2}
                  value={formData.fallback_message || ''}
                  onChange={(e) => setFormData({ ...formData, fallback_message: e.target.value })}
                  className="w-full p-3 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules & Security Controls */}
        <Card className="bg-card border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-heading font-bold text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              Allowed Knowledge Modules & Limits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-2">
                Active CMS Data Modules included in AI Context
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {AVAILABLE_MODULES.map((mod) => {
                  const isChecked = (formData.allowed_modules || []).includes(mod);
                  return (
                    <label key={mod} className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${isChecked ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-background border-border text-muted-foreground'}`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleModuleToggle(mod)}
                        className="rounded accent-primary"
                      />
                      <span>{mod}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  Rate Limit (Messages per hour)
                </label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={formData.rate_limit}
                  onChange={(e) => setFormData({ ...formData, rate_limit: parseInt(e.target.value) || 60 })}
                  className="w-full p-2.5 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block mb-1">
                  Conversation Memory Turns
                </label>
                <input
                  type="number"
                  min="2"
                  max="30"
                  value={formData.conversation_memory}
                  onChange={(e) => setFormData({ ...formData, conversation_memory: parseInt(e.target.value) || 10 })}
                  className="w-full p-2.5 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="rounded-full gap-2 px-8 h-12 text-sm font-semibold shadow-lg">
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Settings...' : 'Save All AI Assistant Settings'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
