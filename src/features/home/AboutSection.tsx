import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { Target, Compass } from 'lucide-react';
import { useAbout } from '@/hooks/usePortfolio';

export function AboutSection() {
  const { data: aboutData } = useAbout();

  if (!aboutData || (!aboutData.introduction && !aboutData.careerMission && (!aboutData.coreStrengths || aboutData.coreStrengths.length === 0))) {
    return null; // Gracefully omit if database has zero about content
  }

  return (
    <SectionContainer id="who-i-am" className="bg-background relative">
      <MaxWidthWrapper>
        <SectionHeading
          title="Who I Am"
          subtitle="My career mission, philosophy, and foundational strengths."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-12 max-w-4xl mx-auto items-center text-center mt-8"
        >
          {/* Introduction */}
          {aboutData.introduction && (
            <motion.h3
              variants={slideUpStagger}
              className="text-2xl md:text-3xl font-heading font-medium text-foreground leading-snug"
            >
              {aboutData.introduction}
            </motion.h3>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left">
            {/* Career Mission */}
            {aboutData.careerMission && (
              <motion.div
                variants={slideUpStagger}
                className="p-8 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <h4 className="font-heading font-semibold text-lg mb-4 flex items-center gap-3">
                  <Target className="h-5 w-5 text-primary" />
                  Career Mission
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData.careerMission}
                </p>
              </motion.div>
            )}

            {/* Personal Philosophy */}
            {aboutData.personalPhilosophy && (
              <motion.div
                variants={slideUpStagger}
                className="p-8 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <h4 className="font-heading font-semibold text-lg mb-4 flex items-center gap-3">
                  <Compass className="h-5 w-5 text-primary" />
                  Personal Philosophy
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData.personalPhilosophy}
                </p>
              </motion.div>
            )}
          </div>

          {/* Core Strengths */}
          {Array.isArray(aboutData.coreStrengths) && aboutData.coreStrengths.length > 0 && (
            <motion.div
              variants={slideUpStagger}
              className="flex flex-col gap-5 items-center w-full mt-4"
            >
              <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Core Strengths
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {aboutData.coreStrengths.map((strength) => (
                  <Badge
                    key={strength}
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium bg-background border border-border shadow-sm"
                  >
                    {strength}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
