import type { LucideIcon } from 'lucide-react';

export function SocialIcon({
  icon: Icon,
  href,
  label,
}: {
  icon: LucideIcon;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
