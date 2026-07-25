import React from 'react';
import { Menu, ExternalLink, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  title: string;
  onOpenMobileSidebar: () => void;
  userEmail?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  onOpenMobileSidebar,
  userEmail = 'admin@example.com',
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-border/60 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-xl text-muted-foreground hover:bg-muted lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-heading font-bold text-foreground tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm" className="rounded-full gap-1.5 text-xs">
          <a href="/" target="_blank" rel="noreferrer">
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/40 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="font-medium text-foreground">{userEmail}</span>
        </div>
      </div>
    </header>
  );
};
