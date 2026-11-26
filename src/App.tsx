import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import HomePage from './pages/HomePage';

const loadProjectsPage = () => import('./pages/ProjectsPage');
const loadProjectDetailPage = () => import('./pages/ProjectDetailPage');
const loadStudioPage = () => import('./pages/StudioPage');
const loadMethodPage = () => import('./pages/MethodPage');
const loadContactPage = () => import('./pages/ContactPage');
const loadPrivacyPage = () => import('./pages/PrivacyPage');
const loadNotFoundPage = () => import('./pages/NotFoundPage');

const ProjectsPage = lazy(loadProjectsPage);
const ProjectDetailPage = lazy(loadProjectDetailPage);
const StudioPage = lazy(loadStudioPage);
const MethodPage = lazy(loadMethodPage);
const ContactPage = lazy(loadContactPage);
const PrivacyPage = lazy(loadPrivacyPage);
const NotFoundPage = lazy(loadNotFoundPage);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function RoutePrefetcher() {
  useEffect(() => {
    const prefetch = () => {
      void loadProjectsPage();
      void loadProjectDetailPage();
      void loadStudioPage();
      void loadMethodPage();
      void loadContactPage();
      void loadPrivacyPage();
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = globalThis.setTimeout(prefetch, 600);
    return () => globalThis.clearTimeout(timer);
  }, []);

  return null;
}

function PageFallback() {
  return <div className="min-h-screen bg-[#F2EFE9]" aria-hidden="true" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RoutePrefetcher />
      <div className="min-h-screen flex flex-col bg-[#F2EFE9] text-[#191B1A]">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projetos" element={<ProjectsPage />} />
              <Route path="/projetos/:slug" element={<ProjectDetailPage />} />
              <Route path="/estudio" element={<StudioPage />} />
              <Route path="/metodo" element={<MethodPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/privacidade" element={<PrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
