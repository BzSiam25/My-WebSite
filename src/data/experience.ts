export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  technologies?: string[];
}

export const experiences: Experience[] = [
  {
    id: '3',
    role: 'Assistant Officer',
    company: 'Purbani Group',
    duration: 'May 2026 - Present',
    description: [
      'Developing and maintaining enterprise web applications.',
      'Designing and implementing ERP and Inventory Management systems.',
      'Building requisition, inventory, stock management, and reporting modules.',
      'Developing secure authentication and role-based access control.',
      'Optimizing MySQL database structure and SQL queries.',
      'Building responsive admin dashboards and internal business applications.',
      'Improving system performance, maintainability, and scalability.',
      'Collaborating with business stakeholders to deliver software solutions aligned with operational requirements.',
    ],
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
    description: [
      'Full-Stack Development (Ongoing): Engineering a comprehensive job portal with specialized modules for freshers and private tuition seekers.',
      'Advanced Search & Filtering: Implemented complex filtering logic in JobListings for Category, Job Type, Experience, and Location to ensure seamless navigation.',
      'Backend & Model Optimization: Refined JobSeeker models and authentication controllers to handle multi-module user preferences and secure session-based API access.',
      'System Integration: Bridging the gap between the Job and Tuition modules by optimizing API consumption and implementing permission-based access for guardian contact information.',
      'Performance Tuning: Streamlined user authentication flows and redirects to ensure high performance and a seamless user experience across different platform sections.',
    ],
    technologies: ['ReactJS', 'Node.js', 'MongoDB', 'MySQL'],
  },
  {
    id: '2',
    role: 'WEB DEVELOPER INTERN (REMOTE)',
    company: 'Cognifyz Technologies',
    duration: 'Nov. 2024 - Dec. 2024',
    description: [],
    technologies: ['Web Development'],
  },
];
