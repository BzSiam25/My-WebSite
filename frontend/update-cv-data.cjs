const fs = require('fs');
const path = require('path');
const root = 'C:/Users/Bayzid/portfolio/src/data';

// config.ts
fs.writeFileSync(path.join(root, 'config.ts'), `export const siteConfig = {
  name: "Md. Bayezid Hasan Siam | Portfolio",
  author: "Md. Bayezid Hasan Siam",
  description: "An Ambitious CSE Graduate specializing in Web Development and AI/ML",
  url: "https://example.com",
  ogImage: "https://example.com/og.jpg",
  socials: [
    { platform: 'GitHub', href: 'https://github.com/BzSiam25', icon: 'github' },
    { platform: 'LinkedIn', href: 'https://linkedin.com/in/md-bayezid-hasan-siam-a8041725b', icon: 'linkedin' },
    { platform: 'Email', href: 'mailto:bayazidsiam5678@gmail.com', icon: 'email' },
  ],
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]
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
  introduction: 'An Ambitious CSE Graduate specializing in Web Development and AI/ML, with a strong foundational skill set in Python, JavaScript, and modern frameworks acquired through personal projects. As a Cisco Certified professional, I bring core knowledge of network architecture and system integration.',
  careerObjective: 'I am highly motivated to quickly learn new technologies and contribute effectively to challenging projects from day one.',
  coreStrengths: [
    'Web Development',
    'Machine Learning & AI',
    'Network Architecture',
    'System Integration'
  ],
  quickFacts: [
    { label: 'Location', value: 'Dhaka, Bangladesh' },
    { label: 'Degree', value: 'B.Sc in Computer Science and Engineering' },
    { label: 'Phone', value: '(+880) 17-6327-1609' },
    { label: 'Email', value: 'bayazidsiam5678@gmail.com' }
  ],
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

export const educationData: Education[] = [
  {
    id: '1',
    degree: 'B.Sc in Computer Science and Engineering',
    institution: 'Independent University, Bangladesh',
    duration: '2020 - 2025',
    description: 'Dhaka, Bangladesh',
  },
  {
    id: '2',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Sirajganj Government College',
    duration: '2019',
    description: 'Sirajganj, Bangladesh',
  },
];
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

export const experiences: Experience[] = [
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
      'Performance Tuning: Streamlined user authentication flows and redirects to ensure high performance and a seamless user experience across different platform sections.'
    ],
    technologies: ['ReactJS', 'Node.js', 'MongoDB', 'MySQL']
  },
  {
    id: '2',
    role: 'WEB DEVELOPER INTERN (REMOTE)',
    company: 'Cognifyz Technologies',
    duration: 'Nov. 2024 - Dec. 2024',
    description: [],
    technologies: ['Web Development']
  },
];
`);

// skills.ts
fs.writeFileSync(path.join(root, 'skills.ts'), `export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: 'Programming',
    skills: ['Python', 'JavaScript', 'PHP'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['ReactJS', 'Node.js'],
  },
  {
    title: 'Web Development',
    skills: ['HTML', 'CSS', 'MySQL', 'MongoDB', 'Bootstrap'],
  },
  {
    title: 'Software & Tools',
    skills: ['VS Code', 'Cisco Packet Tracer', 'Android Studio', 'Figma', 'Apache Netbeans', 'Anaconda'],
  },
  {
    title: 'Operating System',
    skills: ['Windows 10/11', 'macOS', 'Kali Linux'],
  },
  {
    title: 'Machine Learning & AI',
    skills: ['NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow/PyTorch'],
  },
  {
    title: 'Office Productivity',
    skills: ['Microsoft Office Collaboration Tools', 'Google Workspace'],
  }
];
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

export const research: ResearchItem[] = [
  {
    id: '1',
    title: 'An Enhanced Framework for Sustainable Education using Project-Based Learning',
    conference: 'IEEE SERA Conference',
    year: '2025',
    status: 'Published',
    link: 'https://doi.org/10.1109/SERA65747.2025.11154536',
    abstract: 'Empirically demonstrated significant learning gains in a N=100 study.',
  },
  {
    id: '2',
    title: 'DEEP LEARNING FOR THIRD MOLAR ANALYSIS ON PANORAMIC RADIOGRAPHS',
    conference: 'Group Research Project',
    year: 'Expected March 2026',
    status: 'In Progress',
    abstract: 'Developing a deep learning-based approach using Mask R-CNN, Cascade R-CNN, and YOLO11m for automated third molar segmentation and classification. Utilizing a specialized dataset of 20,000 dental images collected from the Middle East to ensure model robustness and diversity. Supervised by: MM Mahbubul Syeed, PhD, Professor, Dept. of CSE, IUB.',
    authors: 'Safiqul Islam, Zahidul Hasan Bhuiyan, Md. Ashrafuzzaman, Mohammad Khursheed Alam',
  }
];
`);

// certificates.ts
fs.writeFileSync(path.join(root, 'certificates.ts'), `export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Cisco Certified professional',
    issuer: 'Cisco',
    date: 'Unknown',
  }
];
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

export const projects: Project[] = [
  {
    id: '1',
    title: 'HOSPITAL MANAGEMENT SYSTEM',
    description: 'Developed a full-stack HMS for managing patient/doctor records and appointment bookings.',
    technologies: ['Web Development', 'Full-Stack'],
    category: 'Web Development',
    github: 'https://github.com/BzSiam25',
    status: 'Completed',
    featured: true,
  },
  {
    id: '2',
    title: 'EDU-PAY',
    description: 'Built a mobile app with a custom password-based payment system for academic fee management.',
    technologies: ['Mobile Application', 'Payment System'],
    category: 'Mobile App',
    github: 'https://github.com/BzSiam25',
    status: 'Completed',
    featured: true,
  },
  {
    id: '3',
    title: 'WEATHER APP',
    description: 'Created a real-time weather update application using OpenWeather API and Android Studio.',
    technologies: ['Android Studio', 'OpenWeather API'],
    category: 'Mobile App',
    github: 'https://github.com/BzSiam25',
    status: 'Completed',
    featured: true,
  }
];
`);
