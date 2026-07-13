import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { experiences } from '@/data/experience';
import { Briefcase } from 'lucide-react';

export function ExperienceSection() {
  return (
    <SectionContainer id="experience" className="bg-background">
      <MaxWidthWrapper>
        <SectionHeading
          title="Experience"
          subtitle="My professional journey in software engineering."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative border-l border-border/50 ml-3 md:ml-6 flex flex-col gap-12"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={slideUpStagger}
              className="relative pl-8 md:pl-10"
            >
              {/* Timeline Node */}
              <div className="absolute -left-4 top-1 h-8 w-8 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center shadow-sm">
                <Briefcase className="h-3.5 w-3.5 text-primary" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-xl font-bold text-foreground leading-tight">
                  {exp.role}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm font-medium text-muted-foreground mb-2">
                  <span className="text-primary font-semibold">
                    {exp.company}
                  </span>
                  <span className="hidden sm:inline opacity-50">•</span>
                  <span>{exp.duration}</span>
                </div>

                <ul className="flex flex-col gap-2.5 mt-1">
                  {exp.description.map((desc, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground text-[15px] relative pl-5 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:bg-muted-foreground/40 before:rounded-full"
                    >
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
