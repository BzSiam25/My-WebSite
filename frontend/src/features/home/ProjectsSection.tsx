import { motion } from 'framer-motion';
import { slideUpStagger, staggerContainer } from '@/lib/motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight, Layers, Target, Lightbulb } from 'lucide-react';
import { Github } from '@/components/shared/CustomIcons';
import { useProjects } from '@/hooks/usePortfolio';

export function ProjectsSection() {
  const { data: projects = [] } = useProjects();

  if (!projects || projects.length === 0) {
    return null; // Gracefully omit section if database has zero projects
  }

  const featuredProjects = projects.filter((p: any) => p.featured || p.status === 'Featured');
  const displayList = featuredProjects.length > 0 ? featuredProjects : projects;

  return (
    <SectionContainer id="projects" className="bg-muted/30 pt-0 md:pt-0 pb-0 md:pb-0">
      <MaxWidthWrapper>
        <div className="pt-4 pb-0 md:pt-6 md:pb-0">
          <SectionHeading
            title="Featured Work"
            subtitle="A showcase of technical architecture and product engineering."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-8 flex flex-col gap-8 md:gap-10"
          >
            {displayList.map((project: any, index: number) => (
              <motion.div
                key={project.id}
                variants={slideUpStagger}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center`}
              >
                {/* Project Visuals */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-700"></div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/40 bg-card shadow-sm group-hover:shadow-lg transition-all duration-500 transform group-hover:-translate-y-1">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop';
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted/40 text-muted-foreground">
                        <Layers className="h-12 w-12 opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border border-border/50 font-medium">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {project.date || 'Project'}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>

                  {(project.problem || project.solution) && (
                    <div className="flex flex-col gap-3 p-4 rounded-xl bg-card/60 border border-border/40 text-xs md:text-sm">
                      {project.problem && (
                        <div className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground"><strong className="text-foreground font-medium">Problem:</strong> {project.problem}</span>
                        </div>
                      )}
                      {project.solution && (
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground"><strong className="text-foreground font-medium">Solution:</strong> {project.solution}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tech Stack */}
                  {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string) => (
                        <Badge key={tech} variant="outline" className="text-xs font-normal border-border/60 bg-muted/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Action Links */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    {project.demo && project.demo !== '#' && (
                      <Button asChild size="sm" className="rounded-full shadow-sm">
                        <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                          <span>Live Demo</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                    {project.github && project.github !== '#' && (
                      <Button asChild variant="outline" size="sm" className="rounded-full border-border/60">
                        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                          <Github className="h-3.5 w-3.5" />
                          <span>Source Code</span>
                        </a>
                      </Button>
                    )}
                    {project.caseStudy && project.caseStudy !== '#' && (
                      <Button asChild variant="ghost" size="sm" className="rounded-full">
                        <a href={project.caseStudy} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-primary">
                          <span>Case Study</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </SectionContainer>
  );
}
