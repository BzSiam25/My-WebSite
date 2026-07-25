import { useQuery } from '@tanstack/react-query';
import type { AboutData } from '@/data/about';
import type { Certificate } from '@/data/certificates';
import type { Education } from '@/data/education';
import type { Experience } from '@/data/experience';
import type { Photo } from '@/data/photography';
import type { Project } from '@/data/projects';
import type { ResearchItem } from '@/data/research';
import type { SkillCategory } from '@/data/skills';
import { heroService } from '@/services/heroService';
import { aboutService } from '@/services/aboutService';
import { currentFocusService } from '@/services/currentFocusService';
import { experienceService } from '@/services/experienceService';
import { projectService } from '@/services/projectService';
import { skillService } from '@/services/skillService';
import { educationService } from '@/services/educationService';
import { researchService } from '@/services/researchService';
import { certificateService } from '@/services/certificateService';
import { journeyService } from '@/services/journeyService';
import { contactService } from '@/services/contactService';
import { seoService } from '@/services/seoService';
import { settingService } from '@/services/settingService';
import { apiRequest } from '@/services/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const getImageUrl = (url?: string) => {
  if (!url) return '';
  
  let cleanUrl = url;
  if (cleanUrl.startsWith('http://localhost/') && !cleanUrl.includes('localhost:8000/')) {
    cleanUrl = cleanUrl.replace('http://localhost/', 'http://localhost:8000/');
  }
  if (cleanUrl.startsWith('http://127.0.0.1/') && !cleanUrl.includes('127.0.0.1:8000/')) {
    cleanUrl = cleanUrl.replace('http://127.0.0.1/', 'http://127.0.0.1:8000/');
  }

  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return cleanUrl;
  }
  if (cleanUrl.startsWith('/storage') || cleanUrl.startsWith('/uploads')) {
    const base = API_BASE_URL.endsWith('/api') ? API_BASE_URL.slice(0, -4) : API_BASE_URL;
    return `${base}${cleanUrl}`;
  }
  return cleanUrl;
};

export function useHero() {
  return useQuery({
    queryKey: ['hero'],
    queryFn: async () => {
      const data = await heroService.getPublic();
      return {
        ...data,
        profile_image: getImageUrl(data.profile_image),
        hero_image: getImageUrl(data.hero_image)
      };
    },
  });
}

export function useAbout() {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const data = await aboutService.getPublic();
      const mapped: AboutData = {
        introduction: data.biography || '',
        careerMission: data.career_objective || '',
        personalPhilosophy: 'Code is not just logic; it\'s storytelling. I believe in writing software that is cinematic in its execution—where every interaction feels intentional and every architecture choice is driven by elegance and performance.',
        coreStrengths: data.core_strengths || []
      };
      return mapped;
    },
  });
}

export function useCurrentFocus() {
  return useQuery({
    queryKey: ['current-focus'],
    queryFn: async () => {
      const data = await currentFocusService.getPublic();
      return Array.isArray(data) ? data : [];
    },
  });
}

export function useExperiences() {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const data = await experienceService.getPublic();
      if (!Array.isArray(data)) return [];
      return data.map((exp: any): Experience => ({
        id: String(exp.id),
        role: exp.role,
        company: exp.company,
        duration: exp.duration || (exp.current_position ? `${exp.start_date?.substring(0,7)} - Present` : `${exp.start_date?.substring(0,7)} - ${exp.end_date?.substring(0,7)}`),
        impactNarrative: exp.description,
        technologies: exp.technologies || []
      }));
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await projectService.getPublic();
      if (!Array.isArray(data)) return [];
      return data.map((p: any): Project => ({
        id: String(p.id),
        title: p.name,
        category: p.category,
        description: p.description,
        problem: p.problem_statement,
        solution: p.solution,
        technologies: p.tech_stack || [],
        github: p.github_url || '',
        demo: p.live_url || '',
        status: p.featured ? 'Featured' : 'Completed',
        featured: p.featured,
        thumbnail: p.images && p.images.length > 0 ? getImageUrl(p.images[0]) : getImageUrl(p.cover_image),
        caseStudy: p.research_url || '',
        date: p.year ? String(p.year) : (p.created_at ? p.created_at.substring(0, 4) : '')
      }));
    },
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const data = await skillService.getPublic();
      if (!Array.isArray(data)) return [];
      const grouped: { [key: string]: string[] } = {};
      data.forEach((s: any) => {
        if (!grouped[s.category]) {
          grouped[s.category] = [];
        }
        grouped[s.category].push(s.name);
      });
      return Object.keys(grouped).map((title): SkillCategory => ({
        title,
        skills: grouped[title]
      }));
    },
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const data = await educationService.getPublic();
      if (!Array.isArray(data)) return [];
      return data.map((edu: any): Education => ({
        id: String(edu.id),
        degree: edu.degree,
        institution: edu.university,
        duration: edu.duration,
        gpa: edu.cgpa,
        description: edu.description
      }));
    },
  });
}

export function useResearch() {
  return useQuery({
    queryKey: ['research'],
    queryFn: async () => {
      const data = await researchService.getPublic();
      if (!Array.isArray(data)) return [];
      return data.map((res: any): ResearchItem => ({
        id: String(res.id),
        title: res.title,
        conference: res.conference || '',
        year: String(res.year),
        status: res.status,
        summary: res.abstract,
        paperLink: res.paper_link || res.researchgate_link || res.pdf || '',
        codeLink: res.doi || '',
        authors: res.authors
      }));
    },
  });
}

export function useCertificates() {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const data = await certificateService.getPublic();
      if (!Array.isArray(data)) return [];
      return data.map((cert: any): Certificate => ({
        id: String(cert.id),
        title: cert.title,
        issuer: cert.issuer,
        date: cert.issue_date || 'Unknown',
        link: cert.credential_url
      }));
    },
  });
}

export function useJourneys() {
  return useQuery({
    queryKey: ['journeys'],
    queryFn: () => journeyService.getPublic(),
  });
}

export function usePhotography() {
  return useQuery({
    queryKey: ['photography'],
    queryFn: async () => {
      const data = await apiRequest('/photography');
      if (!data || !Array.isArray(data.images)) return [];
      return data.images.map((img: any): Photo => ({
        id: String(img.id),
        src: getImageUrl(img.url),
        alt: img.caption || '',
        location: img.tags ? img.tags.join(', ') : '',
        date: img.created_at ? img.created_at.substring(0, 10) : ''
      }));
    },
  });
}

export function useContact() {
  return useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      const contact = await contactService.getPublic();
      const hero = await heroService.getPublic();
      return {
        email: contact.email || '',
        phone: contact.phone || '',
        location: contact.location || '',
        socials: (hero.social_links || []).map((s: any) => ({
          platform: s.platform,
          url: s.href,
          icon: s.icon
        }))
      };
    },
  });
}

export function useSeo() {
  return useQuery({
    queryKey: ['seo'],
    queryFn: () => seoService.getPublic(),
  });
}

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const data = await settingService.getPublic();
      return {
        ...data,
        logo: getImageUrl(data.logo),
        favicon: getImageUrl(data.favicon),
        resume_file: getImageUrl(data.resume_file)
      };
    },
  });
}

export function useGithub() {
  return useQuery({
    queryKey: ['github'],
    queryFn: () => apiRequest('/github'),
  });
}

export function useComingSoon() {
  return useQuery({
    queryKey: ['coming-soon'],
    queryFn: () => apiRequest('/coming-soon'),
  });
}
