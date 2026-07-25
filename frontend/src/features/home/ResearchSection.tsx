import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Users } from 'lucide-react';
import { useResearch } from '@/hooks/usePortfolio';

export function ResearchSection() {
  const { data: research = [] } = useResearch();

  if (!research || research.length === 0) {
    return null; // Gracefully omit section if database has zero research papers
  }

  return (
    <SectionContainer id="research" className="bg-background">
      <MaxWidthWrapper>
        <SectionHeading
          title="Research & Publications"
          subtitle="Academic publications and ongoing explorations."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-8 mt-16 md:mt-20"
        >
          {research.map((item: any) => (
            <motion.div key={item.id} variants={slideUpStagger}>
              <Card className="overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 bg-muted/20 border-b border-border/40">
                  <div>
                    <Badge variant="outline" className="mb-2 bg-background/50 border-primary/20 text-primary text-xs">
                      {item.status} ({item.year})
                    </Badge>
                    <CardTitle className="text-xl md:text-2xl font-heading font-bold text-foreground">
                      {item.title}
                    </CardTitle>
                    {item.conference && (
                      <p className="text-sm font-medium text-muted-foreground mt-1 flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-primary" />
                        {item.conference}
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-6 space-y-4">
                  {item.authors && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                      <Users className="h-4 w-4 text-primary shrink-0" />
                      <span>{item.authors}</span>
                    </div>
                  )}

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>
                </CardContent>

                <CardFooter className="pt-4 border-t border-border/30 flex flex-wrap gap-4 bg-muted/10">
                  {item.paperLink && (
                    <Button asChild size="sm" variant="default" className="rounded-full shadow-sm">
                      <a href={item.paperLink} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Read Paper</span>
                      </a>
                    </Button>
                  )}
                  {item.codeLink && (
                    <Button asChild size="sm" variant="outline" className="rounded-full">
                      <a href={item.codeLink} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        <span>DOI / View Code</span>
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
