const fs = require('fs');
const path = require('path');
const root = 'C:/Users/Bayzid/portfolio';

// Create directories if they don't exist
const dirs = [
  'src/features/ai',
  'src/features/github',
  'src/components/shared',
  'public',
];
dirs.forEach((d) => {
  const p = path.join(root, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Update config
fs.writeFileSync(
  path.join(root, 'src/data/config.ts'),
  `export const siteConfig = {
  name: "Siam | Portfolio",
  description: "Senior Software Architect and Full Stack Engineer",
  url: "https://example.com",
  ogImage: "https://example.com/og.jpg",
  socials: [
    "https://github.com/example",
    "https://linkedin.com/in/example"
  ]
};
`
);

// robots.txt and sitemap.xml
fs.writeFileSync(
  path.join(root, 'public/robots.txt'),
  `User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
`
);

fs.writeFileSync(
  path.join(root, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
);

// SEO.tsx
fs.writeFileSync(
  path.join(root, 'src/components/shared/SEO.tsx'),
  `import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/data/config';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export function SEO({ title, description, url, image }: SEOProps) {
  const finalTitle = title ? \`\${title} | \${siteConfig.name}\` : siteConfig.name;
  const finalDescription = description || siteConfig.description;
  const finalUrl = url || siteConfig.url;
  const finalImage = image || siteConfig.ogImage;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {\`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "\${siteConfig.name}",
            "url": "\${finalUrl}",
            "sameAs": \${JSON.stringify(siteConfig.socials)}
          }
        \`}
      </script>
    </Helmet>
  );
}
`
);

// ScrollProgress.tsx
fs.writeFileSync(
  path.join(root, 'src/components/shared/ScrollProgress.tsx'),
  `import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
}
`
);

// BackToTop.tsx
fs.writeFileSync(
  path.join(root, 'src/components/shared/BackToTop.tsx'),
  `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 z-40"
        >
          <Button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md hover:shadow-lg transition-all h-10 w-10 border border-border bg-background hover:bg-muted"
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5 text-foreground" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`
);

// GithubSection.tsx
fs.writeFileSync(
  path.join(root, 'src/features/github/GithubSection.tsx'),
  `import { motion } from "framer-motion"
import { slideUpStagger, staggerContainer } from "@/lib/motion"
import { SectionContainer } from "@/components/layout/SectionContainer"
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Card, CardTitle } from "@/components/ui/card"
import { GitBranch, Star, Activity, GitCommit } from "lucide-react"

export function GithubSection() {
  return (
    <SectionContainer id="github" className="bg-muted/30">
      <MaxWidthWrapper>
        <SectionHeading 
          title="Open Source" 
          subtitle="GitHub contributions, statistics, and public repositories."
        />
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Public Repos", value: "42", icon: <GitBranch className="h-4 w-4" /> },
              { label: "Stars Earned", value: "1.2k", icon: <Star className="h-4 w-4 text-yellow-500" /> },
              { label: "Commits", value: "3,500+", icon: <GitCommit className="h-4 w-4 text-primary" /> },
              { label: "Activity Score", value: "A+", icon: <Activity className="h-4 w-4 text-green-500" /> }
            ].map((stat, i) => (
              <motion.div key={i} variants={slideUpStagger}>
                <Card className="bg-background/50 border-border/50 shadow-sm p-4 flex flex-col gap-2 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                    {stat.icon} {stat.label}
                  </div>
                  <span className="text-xl sm:text-2xl font-bold font-heading">{stat.value}</span>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={slideUpStagger}>
            <Card className="p-6 bg-background/50 border-border/50 shadow-sm flex flex-col gap-4">
              <CardTitle className="text-lg font-heading flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Contribution Activity
              </CardTitle>
              <div className="w-full h-32 bg-muted/30 rounded-lg border border-border/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwdjhIOFYweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                <span className="text-sm text-muted-foreground font-medium relative z-10 flex items-center gap-2">
                  <GitBranch className="h-4 w-4" /> Connect GitHub API token to render live graph
                </span>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </SectionContainer>
  )
}
`
);

// AIAssistant.tsx
fs.writeFileSync(
  path.join(root, 'src/features/ai/AIAssistant.tsx'),
  `import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const mockResponses: Record<string, string> = {
  'default': "Hello! I am Siam's AI Assistant. I can help answer questions about his experience, projects, or skills based on his portfolio data. What would you like to know?",
  'experience': "Siam has 15+ years of experience in software engineering, currently working as a Lead Software Architect. He has led teams in migrating monoliths to microservices and reduced cloud infrastructure costs by 40%.",
  'skills': "He specializes in Full-Stack Architecture, React, Node.js, Go, and Cloud Infrastructure. You can find more details in the **Technical Arsenal** section.",
  'contact': "You can reach Siam via the contact section below or directly at his email."
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: mockResponses.default }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = mockResponses.default;
      const lower = userMsg.content.toLowerCase();
      if (lower.includes('experience') || lower.includes('work')) reply = mockResponses.experience;
      if (lower.includes('skill') || lower.includes('tech')) reply = mockResponses.skills;
      if (lower.includes('contact') || lower.includes('email')) reply = mockResponses.contact;

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          aria-label="Open AI Assistant"
        >
          <MessageSquare className="h-6 w-6 text-primary-foreground" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <span className="font-heading font-semibold text-lg">Ask Siam</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-muted/10">
              {messages.map((msg) => (
                <div key={msg.id} className={\`flex gap-3 \${msg.role === 'user' ? 'flex-row-reverse' : ''}\`}>
                  <div className={\`shrink-0 h-8 w-8 rounded-full flex items-center justify-center \${msg.role === 'user' ? 'bg-primary' : 'bg-secondary border border-border'}\`}>
                    {msg.role === 'user' ? <User className="h-4 w-4 text-primary-foreground" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={\`group relative max-w-[80%] rounded-2xl p-3 text-sm \${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-card border border-border rounded-tl-sm'}\`}>
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-sm dark:prose-invert max-w-none">
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                    
                    {msg.role === 'assistant' && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute -right-10 top-0 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                      >
                        {copiedId === msg.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="shrink-0 h-8 w-8 rounded-full bg-secondary border border-border flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 flex items-center justify-center gap-1 w-16 h-10">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Siam..."
                  className="flex-1 h-10 bg-background border border-border rounded-full px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button onClick={handleSend} disabled={!input.trim() || isTyping} className="h-10 w-10 rounded-full shrink-0" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                {['Experience?', 'Top Skills?'].map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => { setInput(suggestion); handleSend(); }}
                    className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-border/50 bg-secondary/50 hover:bg-secondary transition-colors whitespace-nowrap font-medium"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
`
);

// Updating App.tsx
const appTsx = `import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/shared/SEO';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { BackToTop } from '@/components/shared/BackToTop';
import { HeroSection } from '@/features/home/HeroSection';
import { AboutSection } from '@/features/home/AboutSection';
import { ExperienceSection } from '@/features/home/ExperienceSection';
import { SkillsSection } from '@/features/home/SkillsSection';
import { EducationSection } from '@/features/home/EducationSection';
import { GithubSection } from '@/features/github/GithubSection';
import { ResearchSection } from '@/features/home/ResearchSection';
import { CertificatesSection } from '@/features/home/CertificatesSection';
import { ProjectsSection } from '@/features/home/ProjectsSection';
import { PhotographySection } from '@/features/home/PhotographySection';
import { ResumeSection } from '@/features/home/ResumeSection';
import { ContactSection } from '@/features/home/ContactSection';

// Lazy loaded components for code splitting & performance
const AIAssistant = lazy(() => import('@/features/ai/AIAssistant').then(m => ({ default: m.AIAssistant })));

function Home() {
  return (
    <>
      <SEO />
      <ScrollProgress />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <GithubSection />
      <ResearchSection />
      <CertificatesSection />
      <ProjectsSection />
      <PhotographySection />
      <ResumeSection />
      <ContactSection />
      
      <BackToTop />
      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
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
`;
fs.writeFileSync(path.join(root, 'src/App.tsx'), appTsx);

// Update screenshot script to take AI assistant and Github
let s = fs.readFileSync(path.join(root, 'screenshot.cjs'), 'utf8');
s = s.replace(/desktop_phase5.png/g, 'desktop_phase6.png');
s = s.replace(/mobile_phase5.png/g, 'mobile_phase6.png');
s = s.replace(
  /console.log\('Mobile screenshot taken.'\);/g,
  `
    console.log('Mobile screenshot taken.');
    
    // Desktop Github Section
    await page.setViewport({ width: 1440, height: 900 });
    const githubElement = await page.$('#github');
    if (githubElement) {
      await page.evaluate(() => document.querySelector('#github').scrollIntoView());
      await wait(1000);
      await githubElement.screenshot({ path: path.join(destDir, 'github_section.png') });
      console.log('Github section screenshot taken.');
    }

    // Open AI Assistant
    const aiButton = await page.$('button[aria-label="Open AI Assistant"]');
    if (aiButton) {
      await aiButton.click();
      await wait(1000); // Wait for modal animation
      await page.screenshot({ path: path.join(destDir, 'ai_assistant.png'), fullPage: false });
      console.log('AI Assistant screenshot taken.');
    }
`
);
fs.writeFileSync(path.join(root, 'screenshot.cjs'), s);

console.log('Phase 6 scaffolding generated');
