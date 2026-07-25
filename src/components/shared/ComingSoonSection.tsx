import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Github } from '@/components/shared/CustomIcons';
import { useComingSoon } from '@/hooks/usePortfolio';
import { Link } from 'react-router-dom';

export function ComingSoonSection() {
  const { data: section, isLoading } = useComingSoon();

  if (isLoading || !section || !section.is_active) {
    return null;
  }

  const {
    label = 'MORE COMING SOON',
    title = 'More projects are on the way.',
    description = "I'm continuously building products, conducting research, and developing enterprise solutions.\nNew case studies and production projects will be published here regularly.",
    button_text = 'Explore GitHub',
    button_url = 'https://github.com/BzSiam25',
    show_button = true
  } = section;

  const isExternal = button_url.startsWith('http://') || button_url.startsWith('https://');

  return (
    <section className="py-8 md:py-10 w-full bg-background relative overflow-hidden flex flex-col items-center justify-center border-t border-border/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 blur-[80px] rounded-full pointer-events-none opacity-40" />
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-2xl px-6 mx-auto text-center flex flex-col items-center gap-6 relative z-10"
      >
        <motion.span
          variants={slideUpStagger}
          className="text-xs font-bold uppercase tracking-[0.25em] text-primary"
        >
          {label}
        </motion.span>

        <motion.h2
          variants={slideUpStagger}
          className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground leading-[1.15]"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={slideUpStagger}
          className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line max-w-xl"
        >
          {description}
        </motion.p>

        {show_button && button_text && (
          <motion.div variants={slideUpStagger} className="pt-4">
            <Button
              size="lg"
              className="rounded-full px-8 h-12 text-sm font-medium gap-2.5 shadow-md shadow-primary/10 hover:shadow-lg transition-all"
              asChild
            >
              {isExternal ? (
                <a
                  href={button_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  {button_text}
                </a>
              ) : (
                <Link to={button_url}>
                  <Github className="h-4 w-4" />
                  {button_text}
                </Link>
              )}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
