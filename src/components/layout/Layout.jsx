import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { Ticker } from './Ticker.jsx';
import { ScrollProgress } from '@/components/ui/ScrollProgress.jsx';

/**
 * App shell. Pages are rendered between the navbar and footer; the
 * mantra ticker sits below the nav as a quiet, continuous rhythm.
 * A saffron scroll-progress bar runs across the very top.
 */
export function Layout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-temple-800">
      <ScrollProgress />
      <Navbar />
      <Ticker />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
