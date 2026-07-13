export interface Education {
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
