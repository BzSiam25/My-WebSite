import React, { useState } from 'react';
import { getAuthToken, setAuthToken, apiRequest } from '@/services/api';
import { AdminLayout } from './layout/AdminLayout';
import type { AdminTab } from './layout/AdminSidebar';
import { DashboardOverview } from './modules/DashboardOverview';
import { HeroCMS } from './modules/HeroCMS';
import { AboutCMS } from './modules/AboutCMS';
import { CurrentFocusCMS } from './modules/CurrentFocusCMS';
import { ProjectsCMS } from './modules/ProjectsCMS';
import { ExperiencesCMS } from './modules/ExperiencesCMS';
import { SkillsCMS } from './modules/SkillsCMS';
import { EducationCMS } from './modules/EducationCMS';
import { ResearchCMS } from './modules/ResearchCMS';
import { JourneysCMS } from './modules/JourneysCMS';
import { CertificatesCMS } from './modules/CertificatesCMS';
import { ContactCMS } from './modules/ContactCMS';
import { SeoCMS } from './modules/SeoCMS';
import { SettingsCMS } from './modules/SettingsCMS';
import { AiSettingsCMS } from './modules/AiSettingsCMS';
import { MediaCMS } from './modules/MediaCMS';
import { AuditLogsCMS } from './modules/AuditLogsCMS';
import { BackupsCMS } from './modules/BackupsCMS';
import { Button } from '@/components/ui/button';
import { ShieldAlert, KeyRound } from 'lucide-react';

export function AdminPanel() {
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      const res = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.token) {
        setAuthToken(res.token);
        setToken(res.token);
      } else {
        setAuthError(res.message || 'Authentication failed');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Invalid admin credentials');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    setToken(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border/60 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              CMS Admin Portal
            </h1>
            <p className="text-xs text-muted-foreground">
              Sign in with your administrator credentials
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full mt-1.5 p-3 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1.5 p-3 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <Button type="submit" disabled={isLoggingIn} className="w-full py-3 rounded-xl font-semibold">
              {isLoggingIn ? 'Authenticating...' : 'Sign In to Admin Panel'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'hero':
        return <HeroCMS />;
      case 'about':
        return <AboutCMS />;
      case 'current-focus':
        return <CurrentFocusCMS />;
      case 'projects':
        return <ProjectsCMS />;
      case 'experiences':
        return <ExperiencesCMS />;
      case 'skills':
        return <SkillsCMS />;
      case 'education':
        return <EducationCMS />;
      case 'research':
        return <ResearchCMS />;
      case 'journeys':
        return <JourneysCMS />;
      case 'certificates':
        return <CertificatesCMS />;
      case 'contact':
        return <ContactCMS />;
      case 'seo':
        return <SeoCMS />;
      case 'settings':
        return <SettingsCMS />;
      case 'ai-settings':
        return <AiSettingsCMS />;
      case 'media':
        return <MediaCMS />;
      case 'audit-logs':
        return <AuditLogsCMS />;
      case 'backups':
        return <BackupsCMS />;
      default:
        return <DashboardOverview />;
    }
  };

  const TITLES: Record<AdminTab, string> = {
    dashboard: 'Dashboard & Analytics',
    hero: 'Hero Header Management',
    about: 'About & Core Strengths',
    'current-focus': 'Current Focus Management',
    projects: 'Projects CMS',
    experiences: 'Work Experience CMS',
    skills: 'Technical Skills CMS',
    education: 'Education CMS',
    research: 'Research & Publications',
    journeys: 'Life Journey Milestones',
    certificates: 'Certificates & Credentials',
    contact: 'Contact & Social Details',
    seo: 'SEO & OpenGraph Metadata',
    settings: 'System Settings & Branding',
    'ai-settings': 'AI Chatbot Settings',
    media: 'Media Asset Library',
    'audit-logs': 'Audit Log History',
    backups: 'Database Backups',
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onLogout={handleLogout}
      title={TITLES[activeTab]}
    >
      {renderTabContent()}
    </AdminLayout>
  );
}
