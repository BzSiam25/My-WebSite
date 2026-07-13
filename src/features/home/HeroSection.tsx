import { motion } from 'framer-motion';
import { staggerContainer, slideUpStagger } from '@/lib/motion';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { siteConfig } from '@/data/config';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Github = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.6 5 2 5 2a5.3 5.3 0 0 0-.1 3.8A5.4 5.4 0 0 0 3 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path></svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
);

const SocialIcon = ({ name }: { name: string }) => {
  switch (name.toLowerCase()) {
    case 'github':
      return <Github className="h-5 w-5" />;
    case 'linkedin':
      return <Linkedin className="h-5 w-5" />;
    case 'email':
      return <Mail className="h-5 w-5" />;
    default:
      return null;
  }
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-end lg:justify-center overflow-hidden bg-background pt-24 lg:pt-0">
      {/* Premium Background Depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1000px] h-[400px] sm:h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-60 dark:opacity-30" />

      <MaxWidthWrapper className="relative z-10 w-full h-full flex flex-col justify-end lg:justify-center pt-10 lg:pt-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between w-full h-full gap-8 lg:gap-12"
        >
          {/* Left Side: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8 lg:w-[55%] order-2 lg:order-1 pb-16 lg:pb-0 z-10">
            

            {/* Main Headline */}
            <motion.h1
              variants={slideUpStagger}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-extrabold tracking-tighter font-heading text-foreground leading-[1.05]"
            >
              Md. Bayezid <br className="hidden xl:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground/90 to-muted-foreground/50">
                Hasan Siam
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={slideUpStagger}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed flex flex-col gap-1"
            >
              <span>Software Engineer</span>
              <span>AI & Computer Vision Researcher</span>
              <span>Open Source Learner</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={slideUpStagger}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="rounded-full px-8 h-12 text-base font-medium group w-full sm:w-auto shadow-xl shadow-primary/25"
                asChild
              >
                <a href="/#projects">
                  View Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 text-base font-medium w-full sm:w-auto bg-background/40 backdrop-blur-lg border-border/50 hover:bg-accent/50 hover:border-border transition-all"
                asChild
              >
                <a href="https://ieeexplore.ieee.org/document/11154536" target="_blank" rel="noopener noreferrer">
                  Read Research
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={slideUpStagger} className="flex items-center gap-4 pt-2">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
                  aria-label={social.platform}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Side: Portrait Image */}
          <motion.div
            variants={slideUpStagger}
            className="lg:w-[45%] flex justify-center lg:justify-end order-1 lg:order-2 self-end w-full relative z-0"
          >
            <img
              src="/profile-cutout.png"
              alt="Md. Bayezid Hasan Siam"
              loading="lazy"
              className="w-auto max-h-[55vh] sm:max-h-[70vh] lg:max-h-[95vh] object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_20px_30px_rgba(255,255,255,0.05)] -translate-y-4 lg:-translate-y-8 scale-110 lg:scale-125 origin-bottom pointer-events-none"
            />
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-muted-foreground z-20"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
