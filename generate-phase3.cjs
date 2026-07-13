const fs = require('fs');
const path = require('path');

const root = 'C:/Users/Bayzid/portfolio';

// Create directories
['src/hooks', 'src/features/home'].forEach((d) => {
  fs.mkdirSync(path.join(root, d), { recursive: true });
});

// Update tailwind.config.js
let twConfig = fs.readFileSync(path.join(root, 'tailwind.config.js'), 'utf8');
twConfig = twConfig.replace(
  'fontFamily: {',
  'fontFamily: {\n        heading: ["Space Grotesk", "sans-serif"],'
);
fs.writeFileSync(path.join(root, 'tailwind.config.js'), twConfig);

// Update main.tsx
let mainTsx = fs.readFileSync(path.join(root, 'src/main.tsx'), 'utf8');
mainTsx = mainTsx.replace(
  "import '@fontsource/inter/400.css';",
  "import '@fontsource/space-grotesk/400.css';\nimport '@fontsource/space-grotesk/500.css';\nimport '@fontsource/space-grotesk/600.css';\nimport '@fontsource/space-grotesk/700.css';\nimport '@fontsource/inter/400.css';"
);
fs.writeFileSync(path.join(root, 'src/main.tsx'), mainTsx);

// Write design-tokens.ts
fs.writeFileSync(
  path.join(root, 'src/lib/design-tokens.ts'),
  `export const tokens = {
  spacing: {
    section: "py-20 md:py-32",
    container: "px-6 md:px-12 lg:px-24",
  },
  radius: {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  },
  shadows: {
    subtle: "shadow-sm",
    elevated: "shadow-md",
    premium: "shadow-2xl shadow-primary/10",
  },
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 10,
    sticky: 40,
    popover: 50,
    modal: 100,
  },
  transition: {
    fast: "duration-150",
    normal: "duration-300",
    slow: "duration-500",
    easeSpring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    easeSmooth: "cubic-bezier(0.22, 1, 0.36, 1)"
  }
}
`
);

// Write motion.ts
fs.writeFileSync(
  path.join(root, 'src/lib/motion.ts'),
  `import type { Variants } from "framer-motion"

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export const slideUpStagger: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}
`
);

// Write hooks
fs.writeFileSync(
  path.join(root, 'src/hooks/useMediaQuery.ts'),
  `import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)
    
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [query])

  return matches
}
`
);

fs.writeFileSync(
  path.join(root, 'src/hooks/useScrollPosition.ts'),
  `import { useState, useEffect } from "react"

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => setScrollPosition(window.scrollY)
    window.addEventListener("scroll", updatePosition, { passive: true })
    updatePosition()
    return () => window.removeEventListener("scroll", updatePosition)
  }, [])

  return scrollPosition
}
`
);

fs.writeFileSync(
  path.join(root, 'src/hooks/useReducedMotion.ts'),
  `import { useReducedMotion as useFramerReducedMotion } from "framer-motion"

export function useReducedMotion() {
  const prefersReduced = useFramerReducedMotion()
  return prefersReduced ?? false
}
`
);

fs.writeFileSync(
  path.join(root, 'src/hooks/useTheme.ts'),
  `export { useTheme } from "@/components/providers/ThemeProvider"
`
);

// Write HeroSection.tsx
fs.writeFileSync(
  path.join(root, 'src/features/home/HeroSection.tsx'),
  `import { motion } from "framer-motion"
import { staggerContainer, slideUpStagger } from "@/lib/motion"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { siteConfig } from "@/data/config"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Abstract Background Glow (Vercel/Linear style) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-20" />
      
      <MaxWidthWrapper className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8"
        >
          {/* Badge */}
          <motion.div variants={slideUpStagger} className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Digital Product Engineer</span>
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1 
            variants={slideUpStagger}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-heading text-foreground"
          >
            Engineering premium <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/90 to-primary/40">
              digital experiences.
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={slideUpStagger}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {siteConfig.description} I bridge the gap between design and engineering to build scalable, high-performance web applications.
          </motion.p>
          
          {/* CTAs */}
          <motion.div variants={slideUpStagger} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Button size="lg" className="rounded-full px-8 h-12 text-base group">
              View Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base bg-background/50 backdrop-blur-sm">
              Read Research
            </Button>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-border to-transparent" />
      </motion.div>
    </section>
  )
}
`
);

// Update App.tsx
fs.writeFileSync(
  path.join(root, 'src/App.tsx'),
  `import { HelmetProvider, Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSection } from '@/features/home/HeroSection';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Premium Portfolio</title>
        <meta name="description" content="Digital Identity and Portfolio" />
      </Helmet>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <HeroSection />
                </MainLayout>
              }
            />
          </Routes>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;
`
);

// Update SectionHeading.tsx
let shTsx = fs.readFileSync(
  path.join(root, 'src/components/shared/SectionHeading.tsx'),
  'utf8'
);
shTsx = shTsx.replace(
  'h2 className="text-3xl font-bold tracking-tight md:text-4xl"',
  'h2 className="text-3xl font-bold tracking-tight md:text-4xl font-heading"'
);
fs.writeFileSync(
  path.join(root, 'src/components/shared/SectionHeading.tsx'),
  shTsx
);

// Update Navbar.tsx
let navTsx = fs.readFileSync(
  path.join(root, 'src/components/layout/Navbar.tsx'),
  'utf8'
);
navTsx = navTsx.replace(
  'className="font-bold text-xl tracking-tighter"',
  'className="font-bold text-xl tracking-tighter font-heading"'
);
fs.writeFileSync(path.join(root, 'src/components/layout/Navbar.tsx'), navTsx);

console.log('Phase 3 generated.');
