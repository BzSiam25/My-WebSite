import React from 'react';
import {
  LayoutDashboard,
  User,
  Zap,
  Briefcase,
  FolderGit2,
  Cpu,
  GraduationCap,
  BookOpen,
  Milestone,
  Award,
  Mail,
  Search,
  Settings,
  Image as ImageIcon,
  History,
  Database,
  Bot,
  LogOut,
  X,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'hero'
  | 'about'
  | 'current-focus'
  | 'projects'
  | 'experiences'
  | 'skills'
  | 'education'
  | 'research'
  | 'journeys'
  | 'certificates'
  | 'contact'
  | 'seo'
  | 'settings'
  | 'ai-settings'
  | 'media'
  | 'audit-logs'
  | 'backups';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
  userRole?: string;
}

const NAV_ITEMS: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'hero', label: 'Hero Header', icon: User },
  { id: 'about', label: 'About & Strengths', icon: User },
  { id: 'current-focus', label: 'Current Focus', icon: Zap },
  { id: 'projects', label: 'Projects CMS', icon: FolderGit2 },
  { id: 'experiences', label: 'Work Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills & Tech', icon: Cpu },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'research', label: 'Research Papers', icon: BookOpen },
  { id: 'journeys', label: 'Life Journeys', icon: Milestone },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'contact', label: 'Contact Info', icon: Mail },
  { id: 'seo', label: 'SEO & Metadata', icon: Search },
  { id: 'settings', label: 'System Settings', icon: Settings },
  { id: 'ai-settings', label: 'AI Chatbot Settings', icon: Bot },
  { id: 'media', label: 'Media Library', icon: ImageIcon },
  { id: 'audit-logs', label: 'Audit Trail', icon: History },
  { id: 'backups', label: 'Database Backups', icon: Database },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen,
  onCloseMobile,
  onLogout,
  userRole = 'Super Admin',
}) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r border-border/60 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 px-6 border-b border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md">
              A
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm text-foreground tracking-tight">
                Admin Panel
              </h2>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                {userRole}
              </p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            aria-label="Close mobile sidebar"
            className="p-1 rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                aria-label={`Navigate to ${item.label}`}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-3 border-t border-border/60">
          <button
            onClick={onLogout}
            aria-label="Sign Out"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
