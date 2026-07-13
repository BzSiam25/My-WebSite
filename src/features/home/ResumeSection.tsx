import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { resumes } from '@/data/resume';
import { FileText, Download } from 'lucide-react';

export function ResumeSection() {
  return (
    <SectionContainer id="resume" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading
          title="Resume & CV"
          subtitle="Download detailed technical documentation of my career."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {resumes.map((resume) => (
            <motion.div key={resume.id} variants={slideUpStagger}>
              <Card className="h-full group hover:border-primary/50 transition-colors shadow-sm bg-background/50 backdrop-blur-sm">
                <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="font-semibold">
                    {resume.version}
                  </Badge>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 pt-2">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="font-heading text-xl leading-tight">
                      {resume.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {resume.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2 pb-4 border-b border-border/50">
                    <span>{resume.size}</span>
                    <span>•</span>
                    <span>Updated {resume.lastUpdated}</span>
                  </div>

                  <Button
                    className="w-full gap-2 rounded-full mt-2"
                    variant="outline"
                    asChild
                  >
                    <a
                      href={resume.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4" /> Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
