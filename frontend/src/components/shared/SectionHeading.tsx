import { cn } from '@/lib/utils';

export function SectionHeading({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn('mb-12 flex flex-col items-start gap-4', className)}>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-heading">
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </div>
  );
}
