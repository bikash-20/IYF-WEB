import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { site } from '@/lib/site.js';
import { useScrolled } from '@/hooks/useScrollReveal.js';
import { useTheme } from '@/features/theme/useTheme.js';
import { ThemeToggle } from '@/features/theme/ThemeToggle.jsx';
import { cn } from '@/lib/cn.js';

/**
 * Navbar — sticky, glass, 88px tall.
 *
 * Three tint modes:
 *   - "hero"   — over the dark hero, glass-deep (dark frosted)
 *   - "tinted" — once scrolled past hero, glass-tinted (warm frosted)
 *   - "glass"  — top of non-home pages, glass (neutral frosted)
 *
 * The "Arrival" transition happens here: as soon as the user scrolls
 * past 80px on the home page, the navbar flips from glass-deep to
 * glass-tinted, matching the warm-beige atmosphere that follows the
 * hero. It's a one-shot colour swap that signals "you've stepped
 * inside the temple."
 */
export function Navbar() {
  const scrolled = useScrolled(80);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme } = useTheme();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Three navbar tints:
  //   - "hero"     — over the home hero (always dark by design).
  //                  Dark theme reads as a continuation of the hero's
  //                  deep-ink instead of a glass-on-glass clash.
  //   - "tinted"   — once scrolled past hero on home, or at the top
  //                  of any non-home page. Warm cream in light, dark
  //                  ink with 5% white border in dark.
  //   - "glass"    — top of the home page only when scrolled? — we
  //                  don't use this on home because the hero is right
  //                  under it; reserved for future pages that might
  //                  sit over light photos.
  // In dark mode, navbar glass uses rgba(20,18,25,.72) + 24px blur
  // so it floats, not stamps.
  const heroMode = !scrolled && pathname === '/';
  const isDark = theme === 'dark';
  // Dark-mode "tinted" still wants the deep glass for any non-hero
  // situation so the navbar sits clearly above the page.
  const navClass = heroMode
    ? 'glass-deep'
    : isDark
      ? 'glass-tinted'
      : scrolled
        ? 'glass-tinted'
        : 'glass';

  return (
    <header
      data-theme-mode={heroMode ? 'hero' : isDark ? 'tinted-dark' : 'tinted'}
      className={cn(
        'sticky top-0 z-40 transition-all duration-700 ease-divine',
        navClass,
      )}
    >
      <nav className="container flex h-[72px] items-center justify-between md:h-[88px]">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-glow rounded-full bg-saffron-500" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-saffron-500" />
          </span>
          <span
            className={cn(
              'font-display text-base font-medium tracking-tight md:text-lg transition-colors duration-700',
              heroMode
                ? 'text-cream-50'
                : isDark
                  ? 'text-fg-main dark:text-fg-main'
                  : 'text-temple-800',
            )}
          >
            {site.short}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  // v0.7: animated underline grows from the left instead
                  // of an abrupt color snap. Saffron on light, cream on dark.
                  'link-underline rounded-full px-4 py-2 text-sm transition-colors duration-300',
                  heroMode
                    ? isActive
                      ? 'text-saffron-300'
                      : 'text-cream-100/80 hover:text-cream-50'
                    : isDark
                      ? isActive
                        ? 'text-saffron-400 glow-gold-soft'
                        : 'text-fg-body/85 hover:text-fg-main'
                      : isActive
                        ? 'text-saffron-600'
                        : 'text-temple-700 hover:text-temple-900',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            to="/contact"
            className={cn(
              // v0.7: solid saffron fill, lifts on hover, soft saffron
              // shadow. In dark mode the same saffron reads as oil-lamp
              // warmth — text stays dark for contrast against the
              // bright fill.
              'group/cta inline-flex items-center gap-2 rounded-full bg-saffron-500 px-5 py-2 text-xs font-medium uppercase tracking-eyebrow text-temple-800 shadow-soft transition-[background-color,color,box-shadow,transform] duration-300 ease-divine will-change-transform',
              'hover:-translate-y-0.5 hover:bg-saffron-400 hover:shadow-saffron motion-reduce:transition-none motion-reduce:hover:translate-y-0',
              isDark && 'glow-gold-soft',
            )}
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors',
              heroMode
                ? 'border-cream-50/25 text-cream-50 hover:border-saffron-400'
                : isDark
                  ? 'border-white/8 text-fg-body hover:border-saffron-400 hover:text-saffron-400'
                  : 'border-temple-800/15 text-temple-800 hover:border-saffron-500 hover:text-saffron-600',
            )}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'absolute inset-x-0 top-full origin-top border-b backdrop-blur-xl md:hidden',
              isDark
                ? 'border-white/8 bg-ink-section/95 text-fg-main'
                : 'border-temple-800/10 bg-cream-50/95 text-temple-800',
            )}
          >
            <div className="container flex flex-col gap-1 py-8">
              {site.nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-3 text-lg font-display',
                      isActive
                        ? isDark
                          ? 'text-saffron-400'
                          : 'text-saffron-600'
                        : isDark
                          ? 'text-fg-body hover:text-fg-main'
                          : 'text-temple-800',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="cta-solid mt-4 px-5 py-3 text-sm"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
