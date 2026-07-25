export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: 'Web Development',
    skills: [
      'React.js',
      'Node.js',
      'Express.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
      'PHP',
    ],
  },
  {
    title: 'Enterprise Systems',
    skills: [
      'MySQL',
      'MongoDB',
      'REST API',
      'System Architecture',
    ],
  },
  {
    title: 'AI',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'NumPy',
      'Pandas',
      'Model Training',
      'Model Evaluation',
    ],
  },
  {
    title: 'Computer Vision',
    skills: [
      'OpenCV',
      'YOLO',
      'Mask R-CNN',
      'Cascade R-CNN',
      'EfficientNet-B3',
      'Image Classification',
      'Object Detection',
      'Instance Segmentation',
      'Medical Image Analysis',
    ],
  },
  {
    title: 'Dev Tools',
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'Jupyter',
      'Dataset Annotation',
    ],
  },
  {
    title: 'Networking',
    skills: [
      'TCP/IP',
      'HTTP/HTTPS',
      'API Design',
    ],
  },
];
