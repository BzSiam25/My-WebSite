# Siam | Portfolio

A premium, modern, and interactive portfolio designed for a Senior Software Architect and Full Stack Engineer. Built with a focus on performance, accessibility, and a world-class user experience.

## Features

- **Premium Design System**: Glassmorphism, dynamic animations, and meticulous typography (Space Grotesk & Inter).
- **Atomic Components**: Fully modular, highly reusable UI components (Cards, Badges, Sections).
- **AI Assistant**: Floating "Ask Siam" chatbot powered by local data with markdown support.
- **Data-Driven Architecture**: All business content is decoupled into `src/data` for easy updates.
- **GitHub Integration**: Open source showcase with contribution graph structure.
- **Scroll Interactions**: Scroll progress indicators, staggered reveal animations, back-to-top integrations.
- **Fully Responsive**: Flawless experience across Mobile, Tablet, Laptop, and Ultrawide displays.
- **Performance Optimized**: Lazy-loaded routes, optimized typography, zero bundle bloat.
- **SEO Ready**: JSON-LD structured data, Open Graph, dynamic Helmet configurations.

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (select primitives)
- **Routing**: React Router
- **SEO**: React Helmet Async

## Folder Structure

\`\`\`
src/
├── components/
│   ├── layout/       # Navbar, Footer, MainLayout, SectionContainer
│   ├── providers/    # ThemeProvider, ErrorBoundary
│   ├── shared/       # Reusable atoms (GlassCard, SEO, ScrollProgress)
│   └── ui/           # shadcn/ui primitives (Button, Card, Badge)
├── data/             # CMS layer (config, projects, experience, skills, etc.)
├── features/         # Complex domain components
│   ├── ai/           # AIAssistant module
│   ├── github/       # Open source integrations
│   └── home/         # Homepage sections (Hero, About, Projects, etc.)
├── hooks/            # Custom hooks (useTheme, useReducedMotion)
├── lib/              # Utilities, Design Tokens, Motion Variants
└── App.tsx           # Main application routing and lazy loading
\`\`\`

## Installation & Development

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/example/portfolio.git
   cd portfolio
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   The app will run on \`http://localhost:5173\` (or another port if busy).

## Build & Production

To generate a production-ready build:

\`\`\`bash
npm run typecheck
npm run build
\`\`\`

The optimized output will be in the \`dist/\` folder.

## Environment Variables

Copy the \`.env.example\` file to \`.env\`:
\`\`\`bash
cp .env.example .env
\`\`\`
*(Currently, no sensitive tokens are strictly required as data is local, but the architecture is prepared for external APIs).*

## Deployment Guide

This project is optimized for modern edge deployments like Vercel and Netlify.

**Vercel / Netlify:**
1. Connect your GitHub repository.
2. The platform will automatically detect Vite.
3. Build Command: \`npm run build\`
4. Output Directory: \`dist\`
5. Note: A \`vercel.json\` or \`netlify.toml\` handles single-page application (SPA) fallback routing.

## Future Roadmap

- **LLM API Integration**: Connect the local AI Assistant to OpenAI/Gemini via a serverless function.
- **GitHub API Integration**: Connect the GitHub Section to the GitHub GraphQL API for live commit tracking.
- **Blog Section**: Integrate MDX or a headless CMS (Sanity/Contentful) for writing technical articles.
