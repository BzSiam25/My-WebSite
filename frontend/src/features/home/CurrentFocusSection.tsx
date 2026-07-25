import { motion } from 'framer-motion';
import { staggerContainer, slideUpStagger } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Cpu, Eye, Code, Layers } from 'lucide-react';
import { useCurrentFocus } from '@/hooks/usePortfolio';

const renderIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Target': return <Target className="h-6 w-6" />;
    case 'Cpu': return <Cpu className="h-6 w-6" />;
    case 'Eye': return <Eye className="h-6 w-6" />;
    case 'Code': return <Code className="h-6 w-6" />;
    default: return <Layers className="h-6 w-6" />;
  }
};

export function CurrentFocusSection() {
  const { data: focusList = [] } = useCurrentFocus();

  if (!focusList || focusList.length === 0) {
    return null; // Gracefully omit section if database has zero focus entries
  }

  return (
    <SectionContainer id="current-focus" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading
          title="What I'm Building"
          subtitle="My current technical focus and ongoing professional commitments."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        >
          {focusList.map((focus: any) => (
            <motion.div key={focus.id || focus.title} variants={slideUpStagger}>
              <Card className="h-full bg-background/50 border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden group">
                <CardContent className="p-8 flex flex-col h-full gap-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {renderIcon(focus.icon)}
                    </div>
                    {focus.progress && (
                      <Badge variant="outline" className="border-primary/20 text-xs font-semibold bg-primary/5">
                        {focus.progress}
                      </Badge>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-3">{focus.title}</h3>
                    
                    <div className="space-y-4 text-sm">
                      {focus.what && (
                        <div>
                          <span className="font-semibold text-foreground/80 block mb-1">What:</span>
                          <p className="text-muted-foreground leading-relaxed">{focus.what}</p>
                        </div>
                      )}
                      {focus.why && (
                        <div>
                          <span className="font-semibold text-foreground/80 block mb-1">Why:</span>
                          <p className="text-muted-foreground leading-relaxed">{focus.why}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {Array.isArray(focus.technology) && focus.technology.length > 0 && (
                    <div className="mt-auto pt-6 border-t border-border/30">
                      <div className="flex flex-wrap gap-2">
                        {focus.technology.map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="bg-secondary/50 text-[10px]">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
