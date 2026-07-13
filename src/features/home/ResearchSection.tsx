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
import { research } from '@/data/research';
import { BookOpen, ExternalLink } from 'lucide-react';

export function ResearchSection() {
  return (
    <SectionContainer id="research" className="bg-background">
      <MaxWidthWrapper>
        <SectionHeading
          title="Research"
          subtitle="Academic publications and ongoing explorations."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-6"
        >
          {research.map((item) => (
            <motion.div key={item.id} variants={slideUpStagger}>
              <Card className="hover:shadow-md transition-shadow border-border/50 bg-card/50 shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3">
                  <div className="flex flex-col gap-2.5">
                    <CardTitle className="font-heading text-xl leading-snug">
                      {item.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground font-medium">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" /> {item.conference}
                      </span>
                      <span className="opacity-50">•</span>
                      <span>{item.year}</span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      item.status === 'Published' ? 'default' : 'secondary'
                    }
                    className="shrink-0"
                  >
                    {item.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">
                    {item.abstract}
                  </p>
                </CardContent>
                {item.link && (
                  <CardFooter className="pt-2 pb-6">
                    <Button
                      variant="link"
                      className="px-0 h-auto text-primary font-semibold gap-1.5 hover:no-underline hover:text-primary/80 transition-colors"
                      asChild
                    >
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read Publication{' '}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
