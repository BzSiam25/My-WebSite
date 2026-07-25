import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { Mail, Phone, BookOpen, Globe } from 'lucide-react';
import { Github, Linkedin } from '@/components/shared/CustomIcons';
import { useContact } from '@/hooks/usePortfolio';

const renderContactIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'email': return <Mail className="h-5 w-5" />;
    case 'phone':
    case 'whatsapp': return <Phone className="h-5 w-5" />;
    case 'linkedin': return <Linkedin className="h-5 w-5" />;
    case 'github': return <Github className="h-5 w-5" />;
    case 'researchgate': return <BookOpen className="h-5 w-5" />;
    default: return <Globe className="h-5 w-5" />;
  }
};

export function ContactSection() {
  const { data: contactData } = useContact();

  const links: Array<{ name: string; href: string }> = [];

  if (contactData?.email) {
    links.push({ name: 'Email', href: `mailto:${contactData.email}` });
  }
  if (contactData?.phone) {
    links.push({ name: 'Phone', href: `tel:${contactData.phone}` });
  }
  if (Array.isArray(contactData?.socials)) {
    contactData.socials.forEach((s: any) => {
      if (s.url) {
        links.push({ name: s.platform || 'Social', href: s.url });
      }
    });
  }

  return (
    <SectionContainer id="contact" className="bg-muted/20 relative overflow-hidden py-24 md:py-32">
      <MaxWidthWrapper className="flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col items-center w-full max-w-4xl"
        >
          <motion.h2 
            variants={slideUpStagger}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold tracking-tighter text-foreground mb-16 leading-[1.1]"
          >
            Let's build something<br/>meaningful together.
          </motion.h2>

          {links.length > 0 && (
            <motion.div 
              variants={slideUpStagger}
              className="flex flex-wrap justify-center gap-4 md:gap-6 w-full"
            >
              {links.map((link, idx) => (
                <a
                  key={link.name + idx}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 px-6 py-4 rounded-full bg-card/60 border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm text-sm md:text-base font-medium group"
                >
                  <span className="text-muted-foreground group-hover:text-primary-foreground transition-colors">
                    {renderContactIcon(link.name)}
                  </span>
                  <span>{link.name}</span>
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
