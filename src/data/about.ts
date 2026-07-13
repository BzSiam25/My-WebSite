export interface AboutData {
  introduction: string;
  careerObjective: string;
  coreStrengths: string[];
  quickFacts: { label: string; value: string }[];
}

export const aboutData: AboutData = {
  introduction:
    'An Ambitious CSE Graduate specializing in Web Development and AI/ML, with a strong foundational skill set in Python, JavaScript, and modern frameworks acquired through personal projects. As a Cisco Certified professional, I bring core knowledge of network architecture and system integration.',
  careerObjective:
    'I am highly motivated to quickly learn new technologies and contribute effectively to challenging projects from day one.',
  coreStrengths: [
    'Web Development',
    'Machine Learning & AI',
    'Network Architecture',
    'System Integration',
  ],
  quickFacts: [
    { label: 'Location', value: 'Dhaka, Bangladesh' },
    { label: 'Degree', value: 'B.Sc in Computer Science and Engineering' },
    { label: 'Phone', value: '(+880) 17-6327-1609' },
    { label: 'Email', value: 'bayazidsiam5678@gmail.com' },
  ],
};
