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
import { projects } from '@/data/projects';
import { GitBranch, ExternalLink, Code2 } from 'lucide-react';

export function ProjectsSection() {
  return (
    <SectionContainer id="projects" className="bg-background">
      <MaxWidthWrapper>
        <SectionHeading
          title="Selected Projects"
          subtitle="A showcase of technical architecture and product engineering."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={slideUpStagger}
              className={project.featured ? 'lg:col-span-2' : 'col-span-1'}
            >
              <Card className="h-full flex flex-col group hover:border-primary/50 transition-colors shadow-sm bg-card/50 overflow-hidden">
                {project.thumbnail && (
                  <div className="w-full h-48 sm:h-64 overflow-hidden border-b border-border/50 bg-muted/50">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                <CardHeader className="pb-3 flex flex-col gap-2 pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <Badge
                      variant={project.featured ? 'default' : 'secondary'}
                      className="shrink-0"
                    >
                      {project.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold border border-border/50 px-2 py-0.5 rounded-md">
                      {project.status}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-2xl leading-tight mt-2 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-primary" />
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 flex-grow">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="bg-background/50 font-medium"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 pb-6 flex items-center gap-3 border-t border-border/30 mt-4">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-full"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitBranch className="h-4 w-4 mr-1.5" /> Code
                      </a>
                    </Button>
                  )}
                  {project.live && (
                    <Button size="sm" className="gap-2 rounded-full" asChild>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-1.5" /> Live Demo
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
