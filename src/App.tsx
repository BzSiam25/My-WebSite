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
import { CurrentFocusSection } from '@/features/home/CurrentFocusSection';
import { ProjectsSection } from '@/features/home/ProjectsSection';
import { ExperienceSection } from '@/features/home/ExperienceSection';
import { SkillsSection } from '@/features/home/SkillsSection';
import { ResearchSection } from '@/features/home/ResearchSection';
import { GithubSection } from '@/features/github/GithubSection';
import { PhotographySection } from '@/features/home/PhotographySection';
import { AdminPanel } from '@/features/admin/AdminPanel';
import { ContactPage } from '@/features/contact/ContactPage';

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
      <CurrentFocusSection />

      <SkillsSection />
      <GithubSection />
      <PhotographySection />

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

function JourneyPage() {
  return (
    <>
      <SEO title="Journey | Md. Bayezid Hasan Siam" />
      <ScrollProgress />
      <div className="pt-20">
        <ExperienceSection />
      </div>
      <BackToTop />
    </>
  );
}

function FeaturedWorkPage() {
  return (
    <>
      <SEO title="Featured Work | Md. Bayezid Hasan Siam" />
      <ScrollProgress />
      <div className="pt-20">
        <ProjectsSection />
      </div>
      <BackToTop />
    </>
  );
}

function ResearchPage() {
  return (
    <>
      <SEO title="Research | Md. Bayezid Hasan Siam" />
      <ScrollProgress />
      <div className="pt-20">
        <ResearchSection />
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
            <Route
              path="/journey"
              element={
                <MainLayout>
                  <JourneyPage />
                </MainLayout>
              }
            />
            <Route
              path="/research"
              element={
                <MainLayout>
                  <ResearchPage />
                </MainLayout>
              }
            />
            <Route
              path="/featured-work"
              element={
                <MainLayout>
                  <FeaturedWorkPage />
                </MainLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <MainLayout>
                  <ContactPage />
                </MainLayout>
              }
            />
            <Route
              path="/admin"
              element={<AdminPanel />}
            />
          </Routes>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;
