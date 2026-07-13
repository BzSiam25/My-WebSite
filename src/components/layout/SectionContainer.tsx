import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function SectionContainer({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      {children}
    </section>
  );
}
