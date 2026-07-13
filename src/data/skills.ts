export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: 'Programming',
    skills: ['Python', 'JavaScript', 'PHP'],
  },
  {
    title: 'Web Development',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'Bootstrap',
      'Tailwind CSS',
      'React.js',
      'Node.js',
      'Express.js',
      'PHP',
      'MySQL',
      'MongoDB',
      'REST API',
    ],
  },
  {
    title: 'Machine Learning & Computer Vision',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'OpenCV',
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'NumPy',
      'Pandas',
      'YOLO',
      'Mask R-CNN',
      'Cascade R-CNN',
      'EfficientNet-B3',
      'Image Classification',
      'Object Detection',
      'Instance Segmentation',
      'Medical Image Analysis',
      'Dataset Annotation',
      'Model Training',
      'Model Evaluation',
    ],
  },
];
