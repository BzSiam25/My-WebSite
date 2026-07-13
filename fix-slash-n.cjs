const fs = require('fs');
const files = [
  'src/App.tsx',
  'src/data/about.ts',
  'src/data/certificates.ts',
  'src/data/education.ts',
  'src/data/experience.ts',
  'src/data/research.ts',
  'src/data/skills.ts',
  'src/features/home/AboutSection.tsx',
  'src/features/home/CertificatesSection.tsx',
  'src/features/home/EducationSection.tsx',
  'src/features/home/ExperienceSection.tsx',
  'src/features/home/ResearchSection.tsx',
  'src/features/home/SkillsSection.tsx',
];
files.forEach((f) => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/\\n/g, '');
  fs.writeFileSync(f, c);
});
console.log('Fixed files');
