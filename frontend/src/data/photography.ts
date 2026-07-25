export interface Photo {
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
