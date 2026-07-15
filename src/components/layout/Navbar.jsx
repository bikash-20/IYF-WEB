import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { site } from '@/lib/site.js';
import { useScrolled } from '@/hooks/useScrollReveal.js';
import { cn } from '@/lib/cn.js';

export function Navbar() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile drawer when the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-500 ease-divine',
        scrolled
          ? 'bg-cream-50/85 backdrop-blur-md border-b border-temple-700/10'
          : 'bg-transparent',
      )}
    >
      <nav className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-glow rounded-full bg-saffron-500" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-saffron-500" />
          </span>
          <span className="font-display text-base font-medium tracking-tight text-temple-800 md:text-lg">
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
                  'rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300',
                  isActive
                    ? 'text-saffron-600'
                    : 'text-temple-700 hover:text-temple-900',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-temple-800/20 px-4 py-1.5 text-xs font-medium uppercase tracking-eyebrow text-temple-800 transition-all hover:border-saffron-500 hover:text-saffron-600"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-temple-800/15 text-temple-800 transition-colors hover:border-saffron-500 hover:text-saffron-600 md:hidden"
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
            className="absolute inset-x-0 top-full origin-top border-b border-temple-800/10 bg-cream-50 md:hidden"
          >
            <div className="container flex flex-col gap-1 py-6">
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
                className="mt-3 inline-flex items-center justify-center rounded-full bg-saffron-500 px-5 py-3 text-sm font-medium uppercase tracking-eyebrow text-cream-50"
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
