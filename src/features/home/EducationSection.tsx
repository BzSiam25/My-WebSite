import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GlassCard } from '@/components/shared/GlassCard';
import { educationData } from '@/data/education';
import { GraduationCap } from 'lucide-react';

export function EducationSection() {
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
          {educationData.map((edu) => (
            <motion.div
              key={edu.id}
              variants={slideUpStagger}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground bg-background px-3 py-1 rounded-full border border-border/50">
                    {edu.duration}
                  </span>
                </div>

                <div className="mt-2">
                  <h3 className="font-heading font-bold text-xl leading-tight">
                    {edu.degree}
                  </h3>
                  <p className="text-primary font-medium mt-1.5">
                    {edu.institution}
                  </p>
                </div>

                {edu.description && (
                  <p className="text-muted-foreground text-sm mt-2 flex-grow leading-relaxed">
                    {edu.description}
                  </p>
                )}

                {edu.gpa && (
                  <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                      GPA
                    </span>
                    <span className="font-medium text-foreground">
                      {edu.gpa}
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
