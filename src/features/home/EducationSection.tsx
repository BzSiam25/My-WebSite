import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import { GraduationCap } from 'lucide-react';
import { useEducation } from '@/hooks/usePortfolio';

export function EducationSection() {
  const { data: educationList = [] } = useEducation();

  if (!educationList || educationList.length === 0) {
    return null; // Gracefully omit section if database has zero education records
  }

  return (
    <SectionContainer id="education" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading
          title="Education"
          subtitle="Academic background and foundational learning."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {educationList.map((edu: any) => (
            <motion.div
              key={edu.id || edu.degree}
              variants={slideUpStagger}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  {edu.duration && (
                    <span className="text-sm font-medium text-muted-foreground bg-background px-3 py-1 rounded-full border border-border/50">
                      {edu.duration}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-primary font-medium">{edu.institution}</p>
                </div>

                {edu.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                )}

                {edu.gpa && (
                  <div className="mt-auto pt-4 border-t border-border/30">
                    <span className="text-xs text-muted-foreground">
                      CGPA: <strong className="text-foreground">{edu.gpa}</strong>
                    </span>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
