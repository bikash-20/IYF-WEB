import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout.jsx';
import { ScrollToTop } from '@/components/layout/ScrollToTop.jsx';
import { RouteFallback } from '@/components/layout/RouteFallback.jsx';
import { HomePage } from '@/pages/HomePage.jsx';
import { InstallBanner } from '@/components/pwa/InstallBanner.jsx';

// Route-level code splitting. The home page is the most-visited screen
// and stays in the initial bundle. Everything else is split out so the
// first paint is fast.
const AboutPage = lazy(() => import('@/pages/AboutPage.jsx').then((m) => ({ default: m.AboutPage })));
const SchedulePage = lazy(() =>
  import('@/pages/SchedulePage.jsx').then((m) => ({ default: m.SchedulePage })),
);
const EventsPage = lazy(() =>
  import('@/pages/EventsPage.jsx').then((m) => ({ default: m.EventsPage })),
);
const GalleryPage = lazy(() =>
  import('@/pages/GalleryPage.jsx').then((m) => ({ default: m.GalleryPage })),
);
const CoursesPage = lazy(() =>
  import('@/pages/CoursesPage.jsx').then((m) => ({ default: m.CoursesPage })),
);
const DonatePage = lazy(() =>
  import('@/pages/DonatePage.jsx').then((m) => ({ default: m.DonatePage })),
);
const ContactPage = lazy(() =>
  import('@/pages/ContactPage.jsx').then((m) => ({ default: m.ContactPage })),
);
const VisitPage = lazy(() =>
  import('@/pages/VisitPage.jsx').then((m) => ({ default: m.VisitPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage.jsx').then((m) => ({ default: m.NotFoundPage })),
);

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // PWA shortcuts land at /?source=pwa&goto=schedule etc. We honour the
  // `goto` hint once, then strip the query so the URL stays clean.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(location.search);
    const goto = params.get('goto');
    if (location.pathname === '/' && goto) {
      params.delete('source');
      params.delete('goto');
      const next = `/${goto}${params.toString() ? `?${params.toString()}` : ''}`;
      navigate(next, { replace: true });
    }
  }, [location.pathname, location.search, navigate]);

  // v0.8 Reveal safety net — Framer Motion's `whileInView` relies on
  // an IntersectionObserver that, on rare occasions (slow hydration,
  // heavy bundle, dev tools throttling), can leave elements stuck at
  // opacity:0. We schedule a one-shot global release: after 1500ms,
  // any element still at opacity:0 inside the app shell is forced to
  // opacity:1, transform:none. This guarantees no content is ever
  // permanently hidden by a broken animation.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const release = () => {
      const root = document.getElementById('app-root') || document.body;
      const stuck = root.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]');
      stuck.forEach((el) => {
        // Only release on-screen elements — off-screen ones may
        // legitimately be in their pre-reveal state waiting to scroll.
        const r = el.getBoundingClientRect();
        const onScreen =
          r.bottom > 0 && r.right > 0 && r.top < window.innerHeight && r.left < window.innerWidth;
        if (onScreen) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.filter = 'none';
        }
      });
      document.documentElement.setAttribute('data-reveal', 'ready');
    };
    const timer = window.setTimeout(release, 1500);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/visit" element={<VisitPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <InstallBanner />
    </Layout>
  );
}
