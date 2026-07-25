import { useLocation } from 'react-router-dom';
import { footerData as fallbackData } from '@/data/footer';
import { useSettings, useContact } from '@/hooks/usePortfolio';
import { MaxWidthWrapper } from './MaxWidthWrapper';

export function Footer() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  const { data: settings } = useSettings();
  const { data: contact } = useContact();

  const title = fallbackData.title;
  const subtitle = settings?.footer_text ? `Let's build something\nmeaningful together.` : fallbackData.subtitle;
  const copyright = `© ${new Date().getFullYear()} ${settings?.footer_text || 'Md. Bayezid Hasan Siam'}. All rights reserved.`;

  const links = contact?.socials ? [
    { label: "Email", href: `mailto:${contact.email}`, external: false },
    ...contact.socials
      .filter((s: any) => s.platform.toLowerCase() !== 'email')
      .map((s: any) => ({
        label: s.platform,
        href: s.url,
        external: true
      }))
  ] : fallbackData.links;

  return (
    <footer id="contact" className="border-t border-border/50 py-8 md:py-10 lg:py-12 bg-background relative overflow-hidden">
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        
        {!isContactPage && (
          <>
            {/* Title */}
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-[10px]">
              {title}
            </span>

            {/* Subtitle */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground whitespace-pre-line leading-[0.92] mb-[18px] max-w-[680px]">
              {subtitle}
            </h2>

            {/* Links List */}
            <div className="flex flex-wrap justify-center gap-5 md:gap-6 mb-[18px]">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-foreground text-base md:text-lg font-medium transition-colors duration-300 underline-offset-8 hover:underline"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </>
        )}

        {/* Copyright */}
        <div className="text-xs md:text-sm text-muted-foreground/60 font-medium tracking-wide">
          {copyright}
        </div>
        
      </MaxWidthWrapper>
    </footer>
  );
}
