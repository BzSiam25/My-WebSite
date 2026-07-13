const fs = require('fs');
const path = require('path');

const root = 'C:/Users/Bayzid/portfolio';

// Data files
const data = {
  'src/data/about.ts': `export interface AboutData {
  introduction: string;
  careerObjective: string;
  coreStrengths: string[];
  quickFacts: { label: string; value: string }[];
}

export const aboutData: AboutData = {
  introduction: "I am a passionate software engineer focused on building robust, scalable, and visually stunning digital products. With a strong foundation in both design and engineering, I specialize in bridging the gap between complex system architecture and intuitive user interfaces.",
  careerObjective: "To lead and architect technical solutions that push the boundaries of modern web development while fostering a culture of continuous learning and engineering excellence.",
  coreStrengths: [
    "Full-Stack Architecture",
    "Performance Optimization",
    "UI/UX Design Systems",
    "Cloud Infrastructure"
  ],
  quickFacts: [
    { label: "Location", value: "San Francisco, CA" },
    { label: "Experience", value: "15+ Years" },
    { label: "Availability", value: "Open to opportunities" },
    { label: "Languages", value: "English, Spanish" }
  ]
};
`,
  'src/data/skills.ts': `export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Programming",
    skills: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "C++"]
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Vue", "Tailwind CSS", "Framer Motion", "WebGL"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "NestJS", "Django", "GraphQL", "gRPC"]
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Prisma"]
  },
  {
    title: "Networking & Cloud",
    skills: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Nginx"]
  },
  {
    title: "AI & ML",
    skills: ["TensorFlow", "PyTorch", "OpenAI API", "LangChain", "Vector DBs"]
  },
  {
    title: "Tools & Workflow",
    skills: ["Git", "Figma", "Jira", "Linear", "Vite", "Webpack"]
  }
];
`,
  'src/data/education.ts': `export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  gpa?: string;
  description?: string;
}

export const educationData: Education[] = [
  {
    id: "1",
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    duration: "2018 - 2020",
    gpa: "3.9/4.0",
    description: "Specialized in Artificial Intelligence and Distributed Systems. Published thesis on neural network optimization."
  },
  {
    id: "2",
    degree: "Bachelor of Science in Software Engineering",
    institution: "University of California, Berkeley",
    duration: "2014 - 2018",
    gpa: "3.8/4.0",
    description: "Minor in Mathematics. Led the university robotics team to a national championship."
  }
];
`,
  'src/data/experience.ts': `export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Lead Software Architect",
    company: "TechNexus Inc.",
    duration: "2020 - Present",
    description: [
      "Architected a microservices-based platform serving 5M+ daily active users.",
      "Reduced cloud infrastructure costs by 40% through container orchestration optimization.",
      "Led a cross-functional team of 12 engineers in migrating legacy monolith to Node.js and Go."
    ]
  },
  {
    id: "2",
    role: "Senior Full Stack Engineer",
    company: "Innovate Solutions",
    duration: "2018 - 2020",
    description: [
      "Developed high-performance React applications with complex state management.",
      "Implemented realtime WebSocket communication protocols for financial trading dashboard.",
      "Mentored junior engineers and established strict CI/CD guidelines."
    ]
  }
];
`,
  'src/data/research.ts': `export interface ResearchItem {
  id: string;
  title: string;
  conference: string;
  year: string;
  status: string;
  link?: string;
  abstract: string;
}

export const research: ResearchItem[] = [
  {
    id: "1",
    title: "Optimizing State Reconciliation in Large Scale Virtual DOMs",
    conference: "IEEE Conference on Web Engineering",
    year: "2022",
    status: "Published",
    link: "https://example.com/paper1",
    abstract: "This paper proposes a novel heuristic algorithm to reduce time complexity in virtual DOM diffing for massive data grids, resulting in a 30% performance gain."
  },
  {
    id: "2",
    title: "Distributed Caching Strategies for Edge Computing",
    conference: "ACM Symposium on Cloud Computing",
    year: "2023",
    status: "Under Review",
    abstract: "An analysis of geo-distributed cache invalidation techniques leveraging conflict-free replicated data types (CRDTs)."
  }
];
`,
  'src/data/certificates.ts': `export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export const certificates: Certificate[] = [
  {
    id: "1",
    title: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    date: "August 2022",
    link: "https://aws.amazon.com/verification"
  },
  {
    id: "2",
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "January 2023",
  },
  {
    id: "3",
    title: "Google Cloud Professional Data Engineer",
    issuer: "Google Cloud",
    date: "March 2021",
  }
];
`,
};

// Section Components
const sections = {
  'src/features/home/AboutSection.tsx': `import { motion } from "framer-motion"
import { slideUpStagger, staggerContainer } from "@/lib/motion"
import { SectionContainer } from "@/components/layout/SectionContainer"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { GlassCard } from "@/components/shared/GlassCard"
import { Badge } from "@/components/ui/badge"
import { aboutData } from "@/data/about"
import { User } from "lucide-react"

export function AboutSection() {
  return (
    <SectionContainer id="about" className="bg-background relative">
      <MaxWidthWrapper>
        <SectionHeading 
          title="About Me" 
          subtitle="A brief introduction to who I am and what drives me."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <motion.p variants={slideUpStagger} className="text-lg text-muted-foreground leading-relaxed">
              {aboutData.introduction}
            </motion.p>
            <motion.div variants={slideUpStagger} className="p-6 rounded-xl border border-border bg-card/50 shadow-sm">
              <h3 className="font-heading font-semibold text-xl mb-3 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Career Objective
              </h3>
              <p className="text-muted-foreground">{aboutData.careerObjective}</p>
            </motion.div>
            
            <motion.div variants={slideUpStagger} className="flex flex-col gap-3">
              <h3 className="font-heading font-semibold text-lg">Core Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.coreStrengths.map((strength) => (
                  <Badge key={strength} variant="secondary" className="px-3 py-1 text-sm font-medium">
                    {strength}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-1"
          >
            <GlassCard className="flex flex-col gap-4">
              <h3 className="font-heading font-semibold text-lg border-b border-border/50 pb-2">Quick Facts</h3>
              <ul className="flex flex-col gap-3">
                {aboutData.quickFacts.map((fact) => (
                  <li key={fact.label} className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{fact.label}</span>
                    <span className="font-medium text-foreground">{fact.value}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </SectionContainer>
  )
}
`,

  'src/features/home/SkillsSection.tsx': `import { motion } from "framer-motion"
import { slideUpStagger, staggerContainer } from "@/lib/motion"
import { SectionContainer } from "@/components/layout/SectionContainer"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { skillsData } from "@/data/skills"

export function SkillsSection() {
  return (
    <SectionContainer id="skills" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading 
          title="Technical Arsenal" 
          subtitle="Tools and technologies I use to build scalable systems."
        />
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((category) => (
            <motion.div key={category.title} variants={slideUpStagger}>
              <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-heading">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="bg-background hover:bg-muted transition-colors font-medium">
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  )
}
`,

  'src/features/home/ExperienceSection.tsx': `import { motion } from "framer-motion"
import { slideUpStagger, staggerContainer } from "@/lib/motion"
import { SectionContainer } from "@/components/layout/SectionContainer"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { experiences } from "@/data/experience"
import { Briefcase } from "lucide-react"

export function ExperienceSection() {
  return (
    <SectionContainer id="experience" className="bg-background">
      <MaxWidthWrapper>
        <SectionHeading 
          title="Experience" 
          subtitle="My professional journey in software engineering."
        />
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l border-border/50 ml-3 md:ml-6 flex flex-col gap-12"
        >
          {experiences.map((exp, index) => (
            <motion.div key={exp.id} variants={slideUpStagger} className="relative pl-8 md:pl-10">
              {/* Timeline Node */}
              <div className="absolute -left-4 top-1 h-8 w-8 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center shadow-sm">
                <Briefcase className="h-3.5 w-3.5 text-primary" />
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-xl font-bold text-foreground leading-tight">{exp.role}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm font-medium text-muted-foreground mb-2">
                  <span className="text-primary font-semibold">{exp.company}</span>
                  <span className="hidden sm:inline opacity-50">•</span>
                  <span>{exp.duration}</span>
                </div>
                
                <ul className="flex flex-col gap-2.5 mt-1">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-muted-foreground text-[15px] relative pl-5 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:bg-muted-foreground/40 before:rounded-full">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  )
}
`,

  'src/features/home/EducationSection.tsx': `import { motion } from "framer-motion"
import { slideUpStagger, staggerContainer } from "@/lib/motion"
import { SectionContainer } from "@/components/layout/SectionContainer"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { GlassCard } from "@/components/shared/GlassCard"
import { educationData } from "@/data/education"
import { GraduationCap } from "lucide-react"

export function EducationSection() {
  return (
    <SectionContainer id="education" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading 
          title="Education" 
          subtitle="Academic background and foundational learning."
        />
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {educationData.map((edu) => (
            <motion.div key={edu.id} variants={slideUpStagger} className="h-full">
              <GlassCard className="h-full flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground bg-background px-3 py-1 rounded-full border border-border/50">{edu.duration}</span>
                </div>
                
                <div className="mt-2">
                  <h3 className="font-heading font-bold text-xl leading-tight">{edu.degree}</h3>
                  <p className="text-primary font-medium mt-1.5">{edu.institution}</p>
                </div>
                
                {edu.description && (
                  <p className="text-muted-foreground text-sm mt-2 flex-grow leading-relaxed">{edu.description}</p>
                )}
                
                {edu.gpa && (
                  <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">GPA</span>
                    <span className="font-medium text-foreground">{edu.gpa}</span>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  )
}
`,

  'src/features/home/ResearchSection.tsx': `import { motion } from "framer-motion"
import { slideUpStagger, staggerContainer } from "@/lib/motion"
import { SectionContainer } from "@/components/layout/SectionContainer"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { research } from "@/data/research"
import { BookOpen, ExternalLink } from "lucide-react"

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
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-6"
        >
          {research.map((item) => (
            <motion.div key={item.id} variants={slideUpStagger}>
              <Card className="hover:shadow-md transition-shadow border-border/50 bg-card/50 shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3">
                  <div className="flex flex-col gap-2.5">
                    <CardTitle className="font-heading text-xl leading-snug">{item.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground font-medium">
                      <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {item.conference}</span>
                      <span className="opacity-50">•</span>
                      <span>{item.year}</span>
                    </div>
                  </div>
                  <Badge variant={item.status === "Published" ? "default" : "secondary"} className="shrink-0">
                    {item.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">{item.abstract}</p>
                </CardContent>
                {item.link && (
                  <CardFooter className="pt-2 pb-6">
                    <Button variant="link" className="px-0 h-auto text-primary font-semibold gap-1.5 hover:no-underline hover:text-primary/80 transition-colors" asChild>
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        Read Publication <ExternalLink className="h-3.5 w-3.5" />
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
  )
}
`,

  'src/features/home/CertificatesSection.tsx': `import { motion } from "framer-motion"
import { slideUpStagger, staggerContainer } from "@/lib/motion"
import { SectionContainer } from "@/components/layout/SectionContainer"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { certificates } from "@/data/certificates"
import { Award, ExternalLink } from "lucide-react"

export function CertificatesSection() {
  return (
    <SectionContainer id="certificates" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading 
          title="Certifications" 
          subtitle="Professional credentials and recognized expertise."
        />
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert) => (
            <motion.div key={cert.id} variants={slideUpStagger} className="h-full">
              <Card className="h-full group hover:border-primary/50 transition-colors shadow-sm bg-background/50 backdrop-blur-sm">
                <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
                  <div className="p-2.5 bg-background rounded-full border border-border/60 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity p-1">
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  )}
                </CardHeader>
                <CardContent className="flex flex-col gap-1.5 pt-1">
                  <CardTitle className="font-heading text-lg leading-tight mb-1">{cert.title}</CardTitle>
                  <p className="text-sm font-semibold text-foreground/80">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{cert.date}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  )
}
`,
};

const appTsx = `import { HelmetProvider, Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSection } from '@/features/home/HeroSection';
import { AboutSection } from '@/features/home/AboutSection';
import { ExperienceSection } from '@/features/home/ExperienceSection';
import { SkillsSection } from '@/features/home/SkillsSection';
import { EducationSection } from '@/features/home/EducationSection';
import { ResearchSection } from '@/features/home/ResearchSection';
import { CertificatesSection } from '@/features/home/CertificatesSection';

function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ResearchSection />
      <CertificatesSection />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Premium Portfolio</title>
        <meta name="description" content="Digital Identity and Portfolio" />
      </Helmet>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />
          </Routes>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;
`;

Object.entries(data).forEach(([file, content]) => {
  fs.writeFileSync(path.join(root, file), content.trim() + '\\n');
});

Object.entries(sections).forEach(([file, content]) => {
  fs.writeFileSync(path.join(root, file), content.trim() + '\\n');
});

fs.writeFileSync(path.join(root, 'src/App.tsx'), appTsx.trim() + '\\n');

console.log('Phase 4 generated successfully.');
