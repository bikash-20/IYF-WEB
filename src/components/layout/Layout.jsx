import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';

/**
 * App shell. Pages are rendered between the navbar and footer.
 *
 * v0.7.3: removed the global mantra ticker that previously sat
 * between the navbar and the page content. The mantra is still on
 * the site — it now lives inside the About page and again at the
 * bottom of every page in the Footer — but it no longer breaks the
 * seamless dark surface between the glass navbar and the home hero.
 *
 * The top-edge saffron scroll-progress bar is off (removed in v0.7).
 * The `ScrollProgress` primitive was deleted in v1.0.0 — re-add from
 * git history if ever needed.
 *
 * v0.8: theme-aware surfaces. The wrapper carries the page bg + fg
 * for both modes; `bg-cream-50 text-temple-800` in light and
 * `dark:bg-ink-page dark:text-fg-main` in dark. The transition runs
 * 700ms via the `html` rule in `index.css` so flipping themes
 * cross-fades every layer, not just the wrapper.
 */
export function Layout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream-50 text-temple-800 dark:bg-ink-page dark:text-fg-main">
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
