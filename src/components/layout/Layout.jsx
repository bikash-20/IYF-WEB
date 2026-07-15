import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { Ticker } from './Ticker.jsx';

/**
 * App shell. Pages are rendered between the navbar and footer; the
 * mantra ticker sits below the nav as a quiet, continuous rhythm.
 *
 * Note: the top-edge saffron scroll-progress bar was removed for v0.7
 * (visual chrome felt too SaaS-ish against the warm hero). The
 * `ScrollProgress` primitive still exists in `src/components/ui/` if
 * we want to bring it back as an off-by-default opt-in later.
 */
export function Layout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-temple-800">
      <Navbar />
      <Ticker />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
