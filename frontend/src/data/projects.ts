export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem?: string;
  solution?: string;
  architecture?: string;
  impact?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  status: string;
  featured: boolean;
  thumbnail?: string;
  caseStudy?: string;
  date?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'LAUNDRY VAI',
    category: 'Professional',
    description:
      'A full-stack B2B2C multi-vendor aggregator platform connecting local laundry service providers directly with customers.',
    problem: 'Local laundry services lack a unified digital platform, leading to inefficient booking and tracking for customers.',
    solution: 'An O2O (Online-to-Offline) multi-vendor marketplace streamlining order management, payments, and delivery tracking.',
    architecture: 'Microservices based backend with a responsive React frontend, utilizing real-time web sockets for order status.',
    impact: 'Successfully bridged the gap between local vendors and digital-first customers, enabling seamless local commerce.',
    technologies: ['Web Development', 'Full-Stack'],
    github: '',
    demo: '#',
    caseStudy: '#',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop',
    status: 'Completed',
    featured: true,
  },
  {
    id: '2',
    title: 'HOSPITAL MANAGEMENT SYSTEM',
    category: 'Personal',
    description:
      'A full-stack HMS for managing patient/doctor records and appointment bookings.',
    problem: 'Manual record-keeping in clinics leads to scheduling conflicts and lost patient histories.',
    solution: 'A centralized dashboard for doctors and patients to seamlessly manage appointments and medical records.',
    architecture: 'RESTful API architecture handling secure patient data and role-based access control.',
    impact: 'Drastically reduced appointment scheduling conflicts and improved patient data accessibility.',
    technologies: ['Web Development', 'Full-Stack'],
    github: 'https://github.com/BzSiam25',
    demo: '',
    thumbnail: 'https://images.unsplash.com/photo-1551076805-e18690c5e53b?q=80&w=2832&auto=format&fit=crop',
    status: 'Completed',
    featured: true,
  },
  {
    id: '3',
    title: 'EDU-PAY',
    category: 'Academic',
    description:
      'A mobile app with a custom password-based payment system for academic fee management.',
    problem: 'Traditional academic fee payment methods are often cumbersome and lack secure mobile accessibility.',
    solution: 'A specialized mobile payment application tailored specifically for educational institution fee collection.',
    architecture: 'Native mobile framework integrated with a custom encrypted transactional backend.',
    impact: 'Simplified the fee payment process, providing students with a fast and secure mobile alternative.',
    technologies: ['Mobile Application', 'Payment System'],
    github: 'https://github.com/BzSiam25',
    demo: '',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2940&auto=format&fit=crop',
    status: 'Completed',
    featured: false,
  },
  {
    id: '4',
    title: 'WEATHER APP',
    category: 'Personal',
    description:
      'A real-time weather update application using OpenWeather API and Android Studio.',
    problem: 'Users need instant, location-based weather updates with an intuitive mobile interface.',
    solution: 'A native Android application fetching and caching live meteorological data seamlessly.',
    architecture: 'MVVM architecture utilizing OpenWeather REST API and local SQLite caching.',
    impact: 'Provided a smooth, responsive native experience for daily weather forecasting.',
    technologies: ['Android Studio', 'OpenWeather API', 'Mobile Application'],
    github: 'https://github.com/BzSiam25',
    demo: '',
    thumbnail: 'https://images.unsplash.com/photo-1504608524841-42ce6f1225a4?q=80&w=2940&auto=format&fit=crop',
    status: 'Completed',
    featured: false,
  },
  {
    id: '5',
    title: 'DEEP LEARNING FOR THIRD MOLAR ANALYSIS',
    category: 'Research',
    description:
      'Deep learning-based approach using Mask R-CNN, Cascade R-CNN, and YOLO11m for automated third molar segmentation.',
    problem: 'Manual analysis of panoramic radiographs for third molar classification is time-consuming and prone to human error.',
    solution: 'An automated pipeline leveraging state-of-the-art object detection and instance segmentation models.',
    architecture: 'Ensemble of Mask R-CNN, Cascade R-CNN, and YOLO11m trained on a specialized 20,000 image dataset.',
    impact: 'Achieved high precision in dental image analysis, paving the way for AI-assisted dental diagnostics.',
    technologies: ['Mask R-CNN', 'Cascade R-CNN', 'YOLO11m', 'Deep Learning'],
    github: '',
    demo: '',
    thumbnail: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2864&auto=format&fit=crop',
    status: 'Completed',
    featured: true,
    date: '2026',
  },
  {
    id: '6',
    title: 'Sustainable Education via Project-Based Learning',
    category: 'Research',
    description:
      'Published Research Paper in IEEE SERA Conference, 2025. Empirically demonstrated significant learning gains.',
    problem: 'Traditional lecture-based education models often struggle with long-term student retention and engagement.',
    solution: 'A framework integrating project-based learning methodologies into technical curricula.',
    architecture: 'Empirical study involving an N=100 cohort, utilizing statistical analysis for performance evaluation.',
    impact: 'Demonstrated statistically significant improvements in student outcomes, published in a renowned IEEE conference.',
    technologies: ['Project-Based Learning', 'Educational Data Analysis'],
    github: '',
    demo: 'https://doi.org/10.1109/SERA65747.2025.11154536',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop',
    status: 'Published',
    featured: true,
    date: '2025',
  },
];
