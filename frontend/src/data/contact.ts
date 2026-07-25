export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  socials: { platform: string; url: string; icon: string }[];
}

export const contactData: ContactInfo = {
  email: 'bayazidsiam5678@gmail.com',
  phone: '+8801763271609',
  location: 'Bashundhara R/A, Dhaka-1229, Bangladesh',
  socials: [
    { platform: 'GitHub', url: 'https://github.com/BzSiam25', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/md-bayezid-hasan-siam-a8041725b', icon: 'linkedin' },
    { platform: 'Twitter', url: '#', icon: 'twitter' },
  ],
};
