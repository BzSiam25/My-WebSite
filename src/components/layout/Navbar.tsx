import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/data/config';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 inset-x-4 md:inset-x-0 z-50 flex justify-center">
      <div
        className={cn(
          'flex h-14 items-center justify-between px-6 transition-all duration-500 rounded-full w-full max-w-3xl',
          isScrolled
            ? 'bg-background/70 backdrop-blur-xl border border-border shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-background/40 backdrop-blur-md border border-border/50'
        )}
      >
        <Link 
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-bold text-lg tracking-tighter font-heading hover:opacity-80 transition-opacity"
        >
          Siam
          <span className="text-primary">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
