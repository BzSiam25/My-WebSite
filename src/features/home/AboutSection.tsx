import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import { Badge } from '@/components/ui/badge';
import { aboutData } from '@/data/about';
import { User } from 'lucide-react';

export function AboutSection() {
  return (
    <SectionContainer id="about" className="bg-background relative">
      <MaxWidthWrapper>
        <SectionHeading
          title="About Me"
          subtitle="A brief introduction to who I am and what drives me."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <motion.p
              variants={slideUpStagger}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              {aboutData.introduction}
            </motion.p>
            <motion.div
              variants={slideUpStagger}
              className="p-6 rounded-xl border border-border bg-card/50 shadow-sm"
            >
              <h3 className="font-heading font-semibold text-xl mb-3 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Career Objective
              </h3>
              <p className="text-muted-foreground">
                {aboutData.careerObjective}
              </p>
            </motion.div>

            <motion.div
              variants={slideUpStagger}
              className="flex flex-col gap-3"
            >
              <h3 className="font-heading font-semibold text-lg">
                Core Strengths
              </h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.coreStrengths.map((strength) => (
                  <Badge
                    key={strength}
                    variant="secondary"
                    className="px-3 py-1 text-sm font-medium"
                  >
                    {strength}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-1"
          >
            <GlassCard className="flex flex-col gap-4">
              <h3 className="font-heading font-semibold text-lg border-b border-border/50 pb-2">
                Quick Facts
              </h3>
              <ul className="flex flex-col gap-3">
                {aboutData.quickFacts.map((fact) => (
                  <li key={fact.label} className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      {fact.label}
                    </span>
                    <span className="font-medium text-foreground">
                      {fact.value}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
