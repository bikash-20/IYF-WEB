import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { site } from '@/lib/site.js';
import { useScrolled } from '@/hooks/useScrollReveal.js';
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

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const dark = !scrolled && pathname === '/';

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-700 ease-divine',
        dark ? 'glass-deep' : scrolled ? 'glass-tinted' : 'glass',
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
              dark ? 'text-cream-50' : 'text-temple-800',
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
                  'relative rounded-full px-4 py-2 text-sm transition-colors duration-300',
                  dark
                    ? isActive
                      ? 'text-saffron-300'
                      : 'text-cream-100/80 hover:text-cream-50'
                    : isActive
                      ? 'text-saffron-600'
                      : 'text-temple-700 hover:text-temple-900',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-saffron-500/70"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-eyebrow transition-all duration-300',
              dark
                ? 'border-cream-50/30 text-cream-50 hover:border-saffron-400 hover:text-saffron-300'
                : 'border-temple-800/20 text-temple-800 hover:border-saffron-500 hover:text-saffron-600',
            )}
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden',
            dark
              ? 'border-cream-50/25 text-cream-50 hover:border-saffron-400'
              : 'border-temple-800/15 text-temple-800 hover:border-saffron-500 hover:text-saffron-600',
          )}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full origin-top border-b border-temple-800/10 bg-cream-50/95 backdrop-blur-xl md:hidden"
          >
            <div className="container flex flex-col gap-1 py-8">
              {site.nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-3 text-lg font-display',
                      isActive ? 'text-saffron-600' : 'text-temple-800',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-saffron-500 px-5 py-3 text-sm font-medium uppercase tracking-eyebrow text-cream-50"
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
