import { cn } from '@/lib/utils';
import type { ReactNode, HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function GlassCard({ className, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 shadow-xl dark:border-white/10 dark:bg-black/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
