const fs = require('fs');
const path = require('path');
const root = 'C:/Users/Bayzid/portfolio/src/data';

// config.ts
fs.writeFileSync(path.join(root, 'config.ts'), `export interface Social {
  platform: string;
  href: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "",
  author: "",
  description: "",
  url: "",
  ogImage: "",
  socials: [] as Social[],
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ] as NavLink[]
};
`);

// about.ts
fs.writeFileSync(path.join(root, 'about.ts'), `export interface AboutData {
  introduction: string;
  careerObjective: string;
  coreStrengths: string[];
  quickFacts: { label: string; value: string }[];
}

export const aboutData: AboutData = {
  introduction: '',
  careerObjective: '',
  coreStrengths: [],
  quickFacts: [],
};
`);

// education.ts
fs.writeFileSync(path.join(root, 'education.ts'), `export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  gpa?: string;
  description?: string;
}

export const educationData: Education[] = [];
`);

// experience.ts
fs.writeFileSync(path.join(root, 'experience.ts'), `export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  technologies?: string[];
}

export const experiences: Experience[] = [];
`);

// skills.ts
fs.writeFileSync(path.join(root, 'skills.ts'), `export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [];
`);

// research.ts
fs.writeFileSync(path.join(root, 'research.ts'), `export interface ResearchItem {
  id: string;
  title: string;
  conference: string;
  year: string;
  status: string;
  link?: string;
  abstract: string;
  authors?: string;
}

export const research: ResearchItem[] = [];
`);

// certificates.ts
fs.writeFileSync(path.join(root, 'certificates.ts'), `export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export const certificates: Certificate[] = [];
`);

// projects.ts
fs.writeFileSync(path.join(root, 'projects.ts'), `export interface Project {
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

export const projects: Project[] = [];
`);

// contact.ts
fs.writeFileSync(path.join(root, 'contact.ts'), `export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  socials: { platform: string; url: string; icon: string }[];
}

export const contactData: ContactInfo = {
  email: '',
  phone: '',
  location: '',
  socials: [],
};
`);

// photography.ts
fs.writeFileSync(path.join(root, 'photography.ts'), `export interface Photo {
  id: string;
  src: string;
  alt: string;
  location?: string;
  date?: string;
}

export const photos: Photo[] = [];
`);

// resume.ts
fs.writeFileSync(path.join(root, 'resume.ts'), `export interface Resume {
  id: string;
  title: string;
  description: string;
  version: string;
  size: string;
  lastUpdated: string;
  link: string;
}

export const resumes: Resume[] = [];
`);
