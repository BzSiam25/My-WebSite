const fs = require('fs');
const path = require('path');
const root = 'C:/Users/Bayzid/portfolio/src/data';

// contact.ts
fs.writeFileSync(path.join(root, 'contact.ts'), `export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  socials: { platform: string; url: string; icon: string }[];
}

export const contactData: ContactInfo = {
  email: '[contact@example.com]',
  phone: '[+1 (555) 000-0000]',
  location: '[City, Country]',
  socials: [
    { platform: 'GitHub', url: '#', icon: 'github' },
    { platform: 'LinkedIn', url: '#', icon: 'linkedin' },
    { platform: 'Twitter', url: '#', icon: 'twitter' },
  ],
};
`);

// photography.ts
fs.writeFileSync(path.join(root, 'photography.ts'), `export interface Photo {
  id: string;
  src: string;
  alt: string;
  location?: string;
  date?: string;
}

export const photos: Photo[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000&auto=format&fit=crop',
    alt: '[Photo description 1]',
    location: '[Location 1]',
    date: '[Date 1]',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    alt: '[Photo description 2]',
    location: '[Location 2]',
    date: '[Date 2]',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop',
    alt: '[Photo description 3]',
    location: '[Location 3]',
    date: '[Date 3]',
  },
];
`);

// resume.ts
fs.writeFileSync(path.join(root, 'resume.ts'), `export interface Resume {
  id: string;
  title: string;
  description: string;
  version: string;
  size: string;
  lastUpdated: string;
  link: string;
}

export const resumes: Resume[] = [
  {
    id: '1',
    title: '[Software Engineering Resume]',
    description: '[Detailed CV for technical roles.]',
    version: '[v1.0]',
    size: '[1.2 MB]',
    lastUpdated: '[Month YYYY]',
    link: '#',
  },
];
`);
