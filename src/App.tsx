import { lazy, Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

import { ResearchSection } from '@/features/home/ResearchSection';
import { CertificatesSection } from '@/features/home/CertificatesSection';
import { ProjectsSection } from '@/features/home/ProjectsSection';
import { PhotographySection } from '@/features/home/PhotographySection';
import { ResumeSection } from '@/features/home/ResumeSection';
import { ContactSection } from '@/features/home/ContactSection';

// Lazy loaded components for code splitting & performance
const AIAssistant = lazy(() =>
  import('@/features/ai/AIAssistant').then((m) => ({ default: m.AIAssistant }))
);

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

      <ResearchSection />
      <CertificatesSection />
      <ProjectsSection />
      <ResumeSection />
      <ContactSection />

      <BackToTop />
      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>
    </>
  );
}

function PhotographyPage() {
  return (
    <>
      <SEO title="Photography | Md. Bayezid Hasan Siam" />
      <ScrollProgress />
      <div className="pt-20">
        <PhotographySection />
      </div>
      <BackToTop />
    </>
  );
}

function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToHashElement />
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
            <Route
              path="/photography"
              element={
                <MainLayout>
                  <PhotographyPage />
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
