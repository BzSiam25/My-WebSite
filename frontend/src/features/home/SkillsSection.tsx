import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { useSkills } from '@/hooks/usePortfolio';

export function SkillsSection() {
  const { data: skillsData = [] } = useSkills();

  if (!skillsData || skillsData.length === 0) {
    return null; // Gracefully omit section if database has zero skills
  }

  return (
    <SectionContainer id="skills" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading
          title="Technical Expertise"
          subtitle="Engineering domains and specialized tools I leverage to build robust solutions."
        />

        <motion.div 
          className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {skillsData.map((category) => (
            <motion.div
              key={category.title}
              variants={slideUpStagger}
              className="h-full"
            >
              <Card className="h-full bg-card/40 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-heading text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-background/80 hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-border/50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
