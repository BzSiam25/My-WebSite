const fs = require('fs');
const path = require('path');
const root = 'C:/Users/Bayzid/portfolio';

// Data placeholders
const projectsData = `export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  github?: string;
  live?: string;
  status: string;
  featured: boolean;
  thumbnail?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "[Featured Project Title]",
    description: "[Project description detailing the problem, solution, and impact. To be provided.]",
    technologies: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
    category: "[Category]",
    github: "#",
    live: "#",
    status: "[Status]",
    featured: true
  },
  {
    id: "2",
    title: "[Secondary Project Title]",
    description: "[Shorter project description. To be provided.]",
    technologies: ["[Tech 1]", "[Tech 2]"],
    category: "[Category]",
    github: "#",
    status: "[Status]",
    featured: false
  }
];`;

const photographyData = `export interface Photo {
  id: string;
  src: string;
  alt: string;
  location?: string;
  date?: string;
}

export const photos: Photo[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000&auto=format&fit=crop", 
    alt: "[Photo description 1]",
    location: "[Location 1]",
    date: "[Date 1]"
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    alt: "[Photo description 2]",
    location: "[Location 2]",
    date: "[Date 2]"
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop",
    alt: "[Photo description 3]",
    location: "[Location 3]",
    date: "[Date 3]"
  }
];`;

const contactData = `export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  socials: { platform: string; url: string; icon: string }[];
}

export const contactData: ContactInfo = {
  email: "[contact@example.com]",
  phone: "[+1 (555) 000-0000]",
  location: "[City, Country]",
  socials: [
    { platform: "GitHub", url: "#", icon: "github" },
    { platform: "LinkedIn", url: "#", icon: "linkedin" },
    { platform: "Twitter", url: "#", icon: "twitter" }
  ]
};`;

const resumeData = `export interface Resume {
  id: string;
  title: string;
  description: string;
  version: string;
  size: string;
  lastUpdated: string;
  link: string;
}

export const resumes: Resume[] = [
  {
    id: "1",
    title: "[Software Engineering Resume]",
    description: "[Detailed CV for technical roles.]",
    version: "[v1.0]",
    size: "[1.2 MB]",
    lastUpdated: "[Month YYYY]",
    link: "#"
  }
];`;

fs.writeFileSync(path.join(root, 'src/data/projects.ts'), projectsData);
fs.writeFileSync(path.join(root, 'src/data/photography.ts'), photographyData);
fs.writeFileSync(path.join(root, 'src/data/contact.ts'), contactData);
fs.writeFileSync(path.join(root, 'src/data/resume.ts'), resumeData);

// Sections
const sections = {
  'src/features/home/ProjectsSection.tsx': `import { motion } from "framer-motion"
import { slideUpStagger, staggerContainer } from "@/lib/motion"
import { SectionContainer } from "@/components/layout/SectionContainer"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import { Github, ExternalLink, Code2 } from "lucide-react"

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
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={slideUpStagger} className={project.featured ? "lg:col-span-2" : "col-span-1"}>
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
                    <Badge variant={project.featured ? "default" : "secondary"} className="shrink-0">
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
                    {project.technologies.map(tech => (
                      <Badge key={tech} variant="outline" className="bg-background/50 font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2 pb-6 flex items-center gap-3 border-t border-border/30 mt-4">
                  {project.github && (
                    <Button variant="outline" size="sm" className="gap-2 rounded-full" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1.5" /> Code
                      </a>
                    </Button>
                  )}
                  {project.live && (
                    <Button size="sm" className="gap-2 rounded-full" asChild>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
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
  )
}`,

  'src/features/home/PhotographySection.tsx': `import { motion } from "framer-motion"
import { slideUpStagger, staggerContainer } from "@/lib/motion"
import { SectionContainer } from "@/components/layout/SectionContainer"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { photos } from "@/data/photography"
import { MapPin } from "lucide-react"

export function PhotographySection() {
  return (
    <SectionContainer id="photography" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading 
          title="Photography" 
          subtitle="Visual storytelling through a different lens."
        />
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {photos.map((photo) => (
            <motion.div key={photo.id} variants={slideUpStagger} className="break-inside-avoid relative group overflow-hidden rounded-xl bg-muted border border-border/50 shadow-sm">
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                {photo.location && (
                  <p className="text-white font-medium flex items-center gap-1.5 text-sm">
                    <MapPin className="h-3.5 w-3.5" /> {photo.location}
                  </p>
                )}
                {photo.date && (
                  <p className="text-white/80 text-xs mt-1">{photo.date}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  )
}`,

  'src/features/home/ContactSection.tsx': `import { motion } from "framer-motion"
import { slideUpStagger, staggerContainer } from "@/lib/motion"
import { SectionContainer } from "@/components/layout/SectionContainer"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { GlassCard } from "@/components/shared/GlassCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { contactData } from "@/data/contact"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function ContactSection() {
  return (
    <SectionContainer id="contact" className="bg-background relative overflow-hidden">
      <MaxWidthWrapper>
        <SectionHeading 
          title="Get in Touch" 
          subtitle="Open for new opportunities and collaborations."
        />
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        >
          {/* Contact Details Card */}
          <motion.div variants={slideUpStagger} className="h-full">
            <GlassCard className="h-full flex flex-col gap-8 justify-center p-8 sm:p-10">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-3xl font-bold">Let's Connect</h3>
                <p className="text-muted-foreground">Reach out via email or connect on social platforms. I typically respond within 24 hours.</p>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 group">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Email</span>
                    <a href={\`mailto:\${contactData.email}\`} className="font-medium hover:text-primary transition-colors">{contactData.email}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Location</span>
                    <span className="font-medium">{contactData.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Phone</span>
                    <span className="font-medium">{contactData.phone}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Quick Action Card (Design Only) */}
          <motion.div variants={slideUpStagger} className="h-full">
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col p-2 sm:p-4 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 flex-grow justify-center">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-muted-foreground px-1">Name</label>
                  <input type="text" placeholder="Your Name" disabled className="h-12 w-full rounded-md border border-border/50 bg-background/50 px-4 text-sm opacity-60 cursor-not-allowed" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-muted-foreground px-1">Email</label>
                  <input type="email" placeholder="you@example.com" disabled className="h-12 w-full rounded-md border border-border/50 bg-background/50 px-4 text-sm opacity-60 cursor-not-allowed" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-muted-foreground px-1">Message</label>
                  <textarea placeholder="How can I help you?" disabled className="min-h-[120px] w-full rounded-md border border-border/50 bg-background/50 p-4 text-sm opacity-60 cursor-not-allowed resize-none" />
                </div>
                <Button className="w-full h-12 rounded-full mt-2 gap-2" disabled>
                  <Send className="h-4 w-4" /> Send Message
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2 font-medium uppercase tracking-wider opacity-70">
                  (Form functionality currently disabled)
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  )
}`,

  'src/features/home/ResumeSection.tsx': `import { motion } from "framer-motion"
import { slideUpStagger, staggerContainer } from "@/lib/motion"
import { SectionContainer } from "@/components/layout/SectionContainer"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { resumes } from "@/data/resume"
import { FileText, Download } from "lucide-react"

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
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {resumes.map((resume) => (
            <motion.div key={resume.id} variants={slideUpStagger}>
              <Card className="h-full group hover:border-primary/50 transition-colors shadow-sm bg-background/50 backdrop-blur-sm">
                <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="font-semibold">{resume.version}</Badge>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 pt-2">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="font-heading text-xl leading-tight">{resume.title}</CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">{resume.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2 pb-4 border-b border-border/50">
                    <span>{resume.size}</span>
                    <span>•</span>
                    <span>Updated {resume.lastUpdated}</span>
                  </div>
                  
                  <Button className="w-full gap-2 rounded-full mt-2" variant="outline" asChild>
                    <a href={resume.link} target="_blank" rel="noopener noreferrer">
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
  )
}`,
};

Object.entries(sections).forEach(([file, content]) => {
  fs.writeFileSync(path.join(root, file), content);
});

const appFile = path.join(root, 'src/App.tsx');
let appCode = fs.readFileSync(appFile, 'utf8');

const imports = `import { ProjectsSection } from '@/features/home/ProjectsSection';
import { PhotographySection } from '@/features/home/PhotographySection';
import { ContactSection } from '@/features/home/ContactSection';
import { ResumeSection } from '@/features/home/ResumeSection';
`;

appCode = appCode.replace(
  "import { CertificatesSection } from '@/features/home/CertificatesSection';",
  `import { CertificatesSection } from '@/features/home/CertificatesSection';\n${imports}`
);

appCode = appCode.replace(
  '<CertificatesSection />',
  `<CertificatesSection />
      <ProjectsSection />
      <PhotographySection />
      <ResumeSection />
      <ContactSection />`
);

fs.writeFileSync(appFile, appCode);
console.log('Phase 5 generated.');
