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

  // v0.8.1 Reveal system — single global IntersectionObserver.
  //
  // The old design (Framer Motion whileInView + safety timer) had a
  // theme-toggle bug: a parent re-render during theme toggle would
  // detach Framer's per-element observer; on reattach the observer
  // read "out of view" for one frame; with `once: true` that was
  // permanent, so the element stayed at opacity:0.
  //
  // The new design:
  //   1. <Reveal> renders plain nodes with data-reveal-target.
  //      No Framer Motion. CSS handles the fade.
  //   2. ONE IntersectionObserver, mounted here, watches every
  //      [data-reveal-target] node in the app shell.
  //   3. When a target enters the viewport, the observer sets
  //      data-reveal="yes" on it. CSS transitions handle the fade.
  //   4. A 2-second hard fallback timer sets data-reveal="yes" on
  //      every still-hidden target so nothing is ever stuck.
  //   5. The observer is set up once (top-level App effect), and is
  //      resilient to re-renders because it watches a parent
  //      subtree, not individual element instances.
  //   6. The observer is re-created on route change so newly-mounted
  //      pages get a fresh scan.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const root = document.getElementById('app-root') || document.body;

    const reveal = (el) => {
      if (el.getAttribute('data-reveal') === 'yes') return;
      el.setAttribute('data-reveal', 'yes');
    };

    // Hard fallback: after 1.4s, reveal everything regardless of
    // scroll position. This is the layer that catches theme-toggle
    // orphans and any IntersectionObserver misfires. Trimmed from
    // 2s to 1.4s so the wait never feels like a stall — the reveal
    // curve itself is 1.1s, so by the time the fallback fires the
    // user has already seen the cinematic settle complete.
    const fallback = window.setTimeout(() => {
      root.querySelectorAll('[data-reveal-target][data-reveal="no"]').forEach(reveal);
    }, 1400);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      },
      // amount: 0.01 = "fire as soon as 1% of the element peeks into
      // the viewport". Negative bottom rootMargin means the element
      // must be ≥ 15% into the viewport before we trigger — generous
      // enough that reveals fire BEFORE the user actually scrolls past
      // them, but not so eager that they trigger while the user is
      // skimming past fast. Feels proactive, not late.
      { threshold: 0.01, rootMargin: '0px 0px -15% 0px' },
    );

    // Observe existing + future targets. MutationObserver picks up
    // targets that mount after this effect runs (route changes,
    // lazy-loaded pages, theme-triggered re-renders).
    //
    // Important: IntersectionObserver only fires on FUTURE intersection
    // events, not on the current state. If a <Reveal> mounts already
    // inside the viewport (above-the-fold sections like the About
    // page's CTA buttons), no callback will ever fire for it — the
    // observer would wait forever. So scan() also synchronously
    // reveals any target whose rect is currently in the viewport.
    // This closes the "PLAN YOUR VISIT stays ghosted on /about" bug
    // where users saw opacity:0 content within the first ~2s on
    // initial page load before the hard fallback timer kicked in.
    const isInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Account for the observer's rootMargin: '0px 0px -10% 0px'
      // by treating anything above 10% from the bottom as in view.
      return rect.top < vh * 0.9 && rect.bottom > 0;
    };
    const scan = () => {
      root.querySelectorAll('[data-reveal-target]').forEach((el) => {
        if (el.getAttribute('data-reveal') === 'yes') return;
        if (isInViewport(el)) {
          reveal(el);
        } else {
          observer.observe(el);
        }
      });
    };
    scan();
    // Re-scan on the next paint so any targets that mounted in this
    // same tick (lazy-loaded pages under <Suspense mode="wait">,
    // whose children attach data-reveal-target *after* the initial
    // scan runs) are picked up immediately, before the 1.4s
    // fallback fires. Without this, a target that mounts at the same
    // time as the route change could be observed with a stale
    // getBoundingClientRect (parent layout still mid-transition) and
    // miss its initial-inViewport window.
    const raf = requestAnimationFrame(scan);
    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(root, { childList: true, subtree: true });

    // নতুন: attribute-level watcher — যদি কোনো element ইতিমধ্যে viewport-এ থাকা
    // অবস্থায় data-reveal="no"-তে regress করে (যেমন এই bug-টা), তাহলে সাথে সাথে
    // আবার reveal করে দেবে, শুধু childList mutation-এর অপেক্ষায় থাকবে না।
    const attributeObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.attributeName === 'data-reveal') {
          const el = m.target;
          const rect = el.getBoundingClientRect();
          const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
          if (inViewport && el.getAttribute('data-reveal') === 'no') {
            reveal(el);
          }
        }
      });
    });
    attributeObserver.observe(root, {
      attributes: true,
      attributeFilter: ['data-reveal'],
      subtree: true,
    });

    return () => {
      window.clearTimeout(fallback);
      cancelAnimationFrame(raf);
      observer.disconnect();
      mutationObserver.disconnect();
      attributeObserver.disconnect();
    };
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
