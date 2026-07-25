export interface Certificate {
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
  },
];
