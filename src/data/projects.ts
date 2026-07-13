export interface Project {
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
  features?: string[];
  image?: string;
  date?: string;
}

export const projects: Project[] = [
  {
    id: 'laundry-vai',
    title: 'LAUNDRY VAI',
    category: 'Professional',
    description:
      'Developed a full-stack B2B2C multi-vendor aggregator platform (O2O model) connecting local laundry service providers directly with customers.',
    technologies: ['Web Development', 'Full-Stack'],
    features: [
      'B2B2C multi-vendor aggregator platform (O2O model)',
      'Connects local laundry service providers directly with customers',
    ],
    github: '',
    live: '#',
    image: '',
    thumbnail: '',
    status: 'Completed',
    featured: true,
  },
  {
    id: '1',
    title: 'HOSPITAL MANAGEMENT SYSTEM',
    category: 'Personal',
    description:
      'Developed a full-stack HMS for managing patient/doctor records and appointment bookings.',
    technologies: ['Web Development', 'Full-Stack'],
    features: [
      'Patient and doctor record management',
      'Appointment bookings system',
    ],
    github: 'https://github.com/BzSiam25',
    live: '',
    image: '',
    thumbnail: '',
    status: 'Completed',
    featured: true,
  },
  {
    id: '2',
    title: 'EDU-PAY',
    category: 'Academic',
    description:
      'Built a mobile app with a custom password-based payment system for academic fee management.',
    technologies: ['Mobile Application', 'Payment System'],
    features: [
      'Custom password-based payment system',
      'Academic fee management',
    ],
    github: 'https://github.com/BzSiam25',
    live: '',
    image: '',
    thumbnail: '',
    status: 'Completed',
    featured: true,
  },
  {
    id: '3',
    title: 'WEATHER APP',
    category: 'Personal',
    description:
      'Created a real-time weather update application using OpenWeather API and Android Studio.',
    technologies: ['Android Studio', 'OpenWeather API', 'Mobile Application'],
    features: ['Real-time weather updates'],
    github: 'https://github.com/BzSiam25',
    live: '',
    image: '',
    thumbnail: '',
    status: 'Completed',
    featured: true,
  },
  {
    id: '4',
    title: 'DEEP LEARNING FOR THIRD MOLAR ANALYSIS ON PANORAMIC RADIOGRAPHS',
    category: 'Research',
    description:
      'Developed a deep learning-based approach using Mask R-CNN, Cascade R-CNN, and YOLO11m for automated third molar segmentation and classification.',
    technologies: ['Mask R-CNN', 'Cascade R-CNN', 'YOLO11m', 'Deep Learning'],
    features: [
      'Automated third molar segmentation and classification',
      'Utilizes a specialized dataset of 20,000 dental images collected from the Middle East for model robustness and diversity',
    ],
    github: '',
    live: '',
    image: '',
    thumbnail: '',
    status: 'Completed',
    featured: true,
    date: '2026',
  },
  {
    id: '5',
    title:
      'An Enhanced Framework for Sustainable Education using Project-Based Learning',
    category: 'Research',
    description:
      'Published Research Paper in IEEE SERA Conference, 2025. Empirically demonstrated significant learning gains in a N=100 study.',
    technologies: ['Project-Based Learning', 'Educational Data Analysis'],
    features: [
      'Empirically demonstrated significant learning gains in a N=100 study',
    ],
    github: '',
    live: 'https://doi.org/10.1109/SERA65747.2025.11154536',
    image: '',
    thumbnail: '',
    status: 'Published',
    featured: true,
    date: '2025',
  },
];
