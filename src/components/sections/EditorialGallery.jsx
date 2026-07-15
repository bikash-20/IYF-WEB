import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeader } from '@/components/ui/SectionHeader.jsx';
import { galleryItems } from '@/data/gallery.js';
import { site } from '@/lib/site.js';
import { easeDivine } from '@/lib/motion.js';
import { cn } from '@/lib/cn.js';

/**
 * EditorialGallery — bento-grid layout, not Pinterest sprawl.
 *
 * v0.6: each tile is wrapped in a motion link with hover lift +
 * saffron glow + arrow nudge in the corner. Tiles now link to their
 * full-size asset so the affordance matches the styling.
 */
const spans = [
  'md:col-span-8 md:row-span-2',
  'md:col-span-4 md:row-span-1',
  'md:col-span-4 md:row-span-1',
  'md:col-span-4 md:row-span-1',
  'md:col-span-6 md:row-span-2',
  'md:col-span-6 md:row-span-1',
  'md:col-span-4 md:row-span-1',
  'md:col-span-4 md:row-span-1',
];

const gradients = [
  'from-saffron-500/30 to-maroon-700/40',
  'from-peacock-600/30 to-temple-700/40',
  'from-temple-600/30 to-peacock-700/40',
  'from-saffron-400/30 to-temple-700/40',
  'from-maroon-700/40 to-peacock-600/40',
  'from-peacock-700/40 to-temple-700/40',
];

export function EditorialGallery() {
  return (
    <Section variant="warm" pad="default">
      <Container>
        <SectionHeader
          eyebrow="Inside the mandir"
          title="Gallery"
          lede="Selected photographs from daily darshan, festivals, and youth programs at the temple."
        />

        <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:auto-rows-[200px] md:grid-cols-12 md:gap-5">
          {galleryItems.slice(0, 8).map((item, i) => (
            <motion.a
              key={item.id}
              href={item.src || site.contacts.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.caption || item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                ease: easeDivine,
                delay: i * 0.04,
              }}
              className={cn(
                'group relative overflow-hidden rounded-editorial shadow-soft outline-none ring-cream-50/0 transition-shadow duration-500 ease-divine hover:shadow-temple focus-visible:ring-2 focus-visible:ring-saffron-500/60 motion-reduce:transition-none',
                spans[i],
                'min-h-[260px] md:min-h-0',
              )}
            >
              {item.kind === 'image' ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-divine group-hover:scale-[1.06]"
                />
              ) : (
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br transition-transform duration-1000 ease-divine group-hover:scale-[1.06]',
                    gradients[(i - 2) % gradients.length],
                  )}
                  aria-hidden
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(15,13,20,0.65) 0%, rgba(15,13,20,0) 60%)',
                }}
                aria-hidden
              />
              {/* hover saffron sweep */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-saffron-500/0 via-saffron-500/10 to-saffron-500/0 opacity-0 transition-opacity duration-500 ease-divine group-hover:opacity-100 motion-reduce:transition-none"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-cream-50/90 text-temple-800 opacity-0 transition-all duration-500 ease-divine group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 scale-90 -translate-x-1 motion-reduce:transition-none"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="font-mono text-[0.65rem] uppercase tracking-eyebrow text-saffron-300/90">
                  {item.tag || 'IYF Sylhet'}
                </div>
                <div className="mt-1 font-display text-lg text-cream-50 md:text-xl transition-colors duration-300 ease-divine group-hover:text-saffron-200">
                  {item.caption || item.label}
                </div>
              </figcaption>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <motion.a
            href={site.contacts.youtube}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 360, damping: 24 }}
            className="group inline-flex items-center gap-3 rounded-full border border-temple-800/20 bg-cream-50 px-6 py-3 text-xs font-medium uppercase tracking-eyebrow text-temple-800 transition-all duration-300 hover:border-saffron-500 hover:bg-saffron-500/5 hover:text-saffron-600 motion-reduce:transition-none"
          >
            <Play size={12} className="text-saffron-500 transition-transform duration-300 group-hover:scale-110" />
            Watch on Gauradesh TV
          </motion.a>
        </div>
      </Container>
    </Section>
  );
}