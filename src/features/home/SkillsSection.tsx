import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { skillsData } from '@/data/skills';

export function SkillsSection() {
  return (
    <SectionContainer id="skills" className="bg-background">
      <MaxWidthWrapper>
        <SectionHeading
          title="Technical Arsenal"
          subtitle="Tools and technologies I use to build scalable systems."
        />

        <div className="max-w-4xl mx-auto mt-16 md:mt-24 flex flex-col gap-16 md:gap-24">
          {skillsData.map((category) => (
            <motion.div
              key={category.title}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-col"
            >
              <motion.h3
                variants={slideUpStagger}
                className="text-2xl md:text-3xl font-medium tracking-tight text-foreground/90"
              >
                {category.title}
              </motion.h3>

              <motion.div
                variants={slideUpStagger}
                className="h-px w-full bg-border/40 mt-4 mb-8"
              />

              <div className="flex flex-wrap gap-3 md:gap-4">
                {category.skills.map((skill) => (
                  <motion.div key={skill} variants={slideUpStagger}>
                    <Badge
                      variant="outline"
                      className="px-4 py-2 md:px-5 md:py-2.5 rounded-full border-border/30 bg-muted/20 hover:bg-muted/50 hover:border-border/50 transition-all duration-300 font-medium text-[13px] md:text-[15px] text-foreground/70 hover:text-foreground/90 shadow-none backdrop-blur-md"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
