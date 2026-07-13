export interface Resume {
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
