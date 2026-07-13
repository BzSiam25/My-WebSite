import { MaxWidthWrapper } from './MaxWidthWrapper';
import { footerData } from '@/data/footer';

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 md:py-10 lg:py-12 bg-background relative overflow-hidden">
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        
        {/* Title */}
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-[10px]">
          {footerData.title}
        </span>

        {/* Subtitle */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground whitespace-pre-line leading-[0.92] mb-[18px] max-w-[680px]">
          {footerData.subtitle}
        </h2>

        {/* Links List */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-6 mb-[18px]">
          {footerData.links.map((link) => (
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

        {/* Copyright */}
        <div className="text-xs md:text-sm text-muted-foreground/60 font-medium tracking-wide">
          {footerData.copyright}
        </div>
        
      </MaxWidthWrapper>
    </footer>
  );
}
