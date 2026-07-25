import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { BriefcaseBusiness, Calendar } from 'lucide-react';
import { useExperiences } from '@/hooks/usePortfolio';

export function ExperienceSection() {
  const { data: experiences = [] } = useExperiences();

  if (!experiences || experiences.length === 0) {
    return null; // Gracefully omit section if database has zero experiences
  }

  return (
    <SectionContainer id="experience" className="bg-background">
      <MaxWidthWrapper>
        <div className="py-16 md:py-24">
          <SectionHeading
            title="Professional Journey"
            subtitle="A timeline of my professional growth, focusing on impact and engineering excellence."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-16 md:mt-24 max-w-4xl mx-auto"
          >
            <div className="relative border-l-2 border-primary/20 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2 flex flex-col gap-16 md:gap-24">
              {experiences.map((exp: any, index: number) => (
                <motion.div
                  key={exp.id}
                  variants={slideUpStagger}
                  className={`relative flex flex-col md:flex-row items-start ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[-21px] md:left-1/2 md:-translate-x-1/2 top-0 md:top-2 h-10 w-10 rounded-full bg-background border-4 border-primary/20 shadow-sm flex items-center justify-center z-10 transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`pl-8 md:pl-0 w-full md:w-1/2 ${
                      index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'
                    }`}
                  >
                    <div className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                      
                      <div className="relative z-10 flex flex-col gap-4">
                        {/* Header */}
                        <div className={`flex flex-col gap-1 ${index % 2 === 0 ? '' : 'md:items-end'}`}>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                            <BriefcaseBusiness className="h-3.5 w-3.5" />
                            {exp.company}
                          </span>
                          <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                            {exp.role}
                          </h3>
                        </div>

                        {/* Duration */}
                        <div className={`flex items-center gap-2 text-xs font-medium text-muted-foreground ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
                          <span>{exp.duration}</span>
                        </div>

                        {/* Impact Narrative */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exp.impactNarrative}
                        </p>

                        {/* Technologies */}
                        {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                          <div className={`flex flex-wrap gap-1.5 pt-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                            {exp.technologies.map((tech: string) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-[11px] px-2.5 py-0.5 font-normal bg-secondary/50 border border-border/30"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
