const fs = require('fs');
const path = require('path');

const root = 'C:/Users/Bayzid/portfolio';

const replacements = [
  {
    file: 'src/components/layout/MainLayout.tsx',
    search: 'import { ReactNode } from "react"',
    replace: 'import type { ReactNode } from "react"',
  },
  {
    file: 'src/components/layout/MaxWidthWrapper.tsx',
    search: 'import { ReactNode } from "react"',
    replace: 'import type { ReactNode } from "react"',
  },
  {
    file: 'src/components/layout/SectionContainer.tsx',
    search: 'import { ReactNode } from "react"',
    replace: 'import type { ReactNode } from "react"',
  },
  {
    file: 'src/components/shared/GlassCard.tsx',
    search: 'import { ReactNode, HTMLAttributes } from "react"',
    replace: 'import type { ReactNode, HTMLAttributes } from "react"',
  },
  {
    file: 'src/components/shared/SocialIcon.tsx',
    search: 'import { LucideIcon } from "lucide-react"',
    replace: 'import type { LucideIcon } from "lucide-react"',
  },
];

replacements.forEach(({ file, search, replace }) => {
  const p = path.join(root, file);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(search, replace);
  fs.writeFileSync(p, content);
});

// Fix Footer.tsx
const footerPath = path.join(root, 'src/components/layout/Footer.tsx');
let footerContent = fs.readFileSync(footerPath, 'utf8');
footerContent = footerContent
  .replace(
    'import { Github, Twitter, Linkedin, Mail } from "lucide-react"',
    'import { GitBranch, MessageSquare, Briefcase, Mail } from "lucide-react"'
  )
  .replace(
    'github: Github,\n  twitter: Twitter,\n  linkedin: Linkedin,\n  email: Mail,',
    'github: GitBranch,\n  twitter: MessageSquare,\n  linkedin: Briefcase,\n  email: Mail,'
  );
fs.writeFileSync(footerPath, footerContent);

console.log('TS fixes applied.');
