import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * Reusable hero for subpages. Smaller and quieter than the home
 * hero — sets the page context, never competes with the content.
 */
export function PageHero({ eyebrow, title, description, breadcrumb }) {
  return (
    <section className="relative overflow-hidden border-b border-temple-800/10 bg-cream-100/60">
      <div className="pointer-events-none absolute inset-0 grain opacity-50" aria-hidden />
      <div className="container relative py-20 md:py-28">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-temple-700/70">
            <Link to="/" className="hover:text-saffron-600">
              Home
            </Link>
            <ChevronRight size={12} aria-hidden />
            <span className="text-temple-800">{breadcrumb}</span>
          </nav>
        )}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="mt-3 font-display text-display-lg text-balance text-temple-800">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-temple-700 md:text-lg">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
