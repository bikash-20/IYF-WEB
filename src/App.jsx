import { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout.jsx';
import { ScrollToTop } from '@/components/layout/ScrollToTop.jsx';
import { RouteFallback } from '@/components/layout/RouteFallback.jsx';
import { HomePage } from '@/pages/HomePage.jsx';

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
    </Layout>
  );
}
