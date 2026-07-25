export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  impactNarrative: string;
  technologies?: string[];
}

export const experiences: Experience[] = [
  {
    id: '3',
    role: 'Assistant Officer',
    company: 'Purbani Group',
    duration: 'May 2026 - Present',
    impactNarrative:
      'Spearheaded the design and implementation of enterprise ERP and inventory management systems. Optimized MySQL database architectures and developed secure, scalable role-based access control, directly driving efficiency in internal business operations.',
    technologies: [
      'PHP',
      'MySQL',
      'JavaScript',
      'HTML',
      'CSS',
      'Bootstrap',
      'AJAX',
      'Git',
    ],
  },
  {
    id: '1',
    role: 'WEB DEVELOPER (CONTRACTUAL)',
    company: 'SteerWeb',
    duration: 'Nov. 2025 - Present',
    impactNarrative:
      'Engineered a comprehensive job portal handling multi-module user preferences. Streamlined authentication flows and implemented advanced filtering logic, significantly improving platform performance and delivering a seamless user experience across job and tuition modules.',
    technologies: ['ReactJS', 'Node.js', 'MongoDB', 'MySQL'],
  },
  {
    id: '2',
    role: 'WEB DEVELOPER INTERN (REMOTE)',
    company: 'Cognifyz Technologies',
    duration: 'Nov. 2024 - Dec. 2024',
    impactNarrative:
      'Contributed to core web development initiatives, accelerating the delivery of interactive features and optimizing front-end responsiveness.',
    technologies: ['Web Development'],
  },
];
