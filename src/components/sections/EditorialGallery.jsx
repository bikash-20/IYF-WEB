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
 * v0.2: explicit spans per slot so the rhythm is intentional.
 * Slots: hero(wide) | portrait | landscape
 *        portrait | landscape | portrait
 *        portrait | hero(wide) | landscape
 *
 * Real images are `little-1.jpg` (slot 1) and `little-2.jpg` (slot 2);
 * remaining slots are tinted placeholders with the item's label.
 */
const spans = [
  'md:col-span-8 md:row-span-2',   // little-1 — hero wide
  'md:col-span-4 md:row-span-1',   // little-2 — portrait
  'md:col-span-4 md:row-span-1',   // placeholder
  'md:col-span-4 md:row-span-1',   // placeholder
  'md:col-span-6 md:row-span-2',   // placeholder
  'md:col-span-6 md:row-span-1',   // placeholder
  'md:col-span-4 md:row-span-1',   // placeholder
  'md:col-span-4 md:row-span-1',   // placeholder
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
    <Section variant="default" pad="default">
      <Container>
        <SectionHeader
          eyebrow="Inside the mandir"
          title="Gallery"
          lede="Selected photographs from daily darshan, festivals, and youth programs at the temple."
        />

        <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:auto-rows-[200px] md:grid-cols-12 md:gap-5">
          {galleryItems.slice(0, 8).map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: easeDivine, delay: i * 0.04 }}
              className={cn(
                'group relative overflow-hidden rounded-editorial shadow-soft',
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
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-divine group-hover:scale-[1.04]"
                />
              ) : (
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br',
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
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="font-mono text-[0.65rem] uppercase tracking-eyebrow text-saffron-300/90">
                  {i === 0 ? 'Sri Sri Radh Madhava' : 'IYF Sylhet'}
                </div>
                <div className="mt-1 font-display text-lg text-cream-50 md:text-xl">
                  {item.caption || item.label}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={site.contacts.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-temple-800/20 bg-cream-50 px-6 py-3 text-xs font-medium uppercase tracking-eyebrow text-temple-800 transition-all duration-300 hover:border-saffron-500 hover:text-saffron-600"
          >
            <Play size={12} className="text-saffron-500 transition-transform duration-300 group-hover:scale-110" />
            Watch on Gauradesh TV
          </a>
        </div>
      </Container>
    </Section>
  );
}