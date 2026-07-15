import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero.jsx';
import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';
import { galleryItems } from '@/data/gallery.js';
import { easeDivine } from '@/lib/motion.js';

export function GalleryPage() {
  useMeta({
    title: `Gallery — ${site.name}`,
    description:
      'Deity darshan, festival moments, and kirtan nights at the mandir.',
  });

  return (
    <motion.div {...pageEnter}>
      <PageHero
        breadcrumb="Gallery"
        eyebrow="Moments from the mandir"
        title="Gallery & Media"
        description="Deity darshan, festival crowds, kirtan nights — the two real temple photos sit in the darshan block below, others are placeholders in this concept."
      />

      <Section>
        <Container>
          <SectionHeading eyebrow="Deity darshan" title="From the altar" />
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {galleryItems.map((g, i) => (
              <motion.a
                key={g.id}
                href={g.src || site.contacts.facebook}
                target={g.src ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  ease: easeDivine,
                  delay: (i % 6) * 0.04,
                }}
                whileHover={{ y: -3 }}
                className="group block overflow-hidden rounded-xl2 border border-temple-800/10 bg-cream-100 shadow-soft outline-none transition-all duration-500 ease-divine hover:border-saffron-500/40 hover:shadow-temple motion-reduce:transition-none"
                style={{ aspectRatio: g.aspect }}
              >
                {g.kind === 'image' ? (
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-divine group-hover:scale-[1.06]"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-end p-4 grain"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(46,33,24,0.08) 0%, rgba(217,138,43,0.12) 100%)',
                    }}
                  >
                    <span className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-temple-700/80">
                      {g.label}
                    </span>
                  </div>
                )}
                {g.caption && (
                  <span className="block bg-cream-50 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-eyebrow text-temple-700/70 transition-colors duration-300 ease-divine group-hover:text-saffron-600">
                    {g.caption}
                  </span>
                )}
              </motion.a>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <SectionHeading eyebrow="Live & recorded" title="Watch on Gauradesh TV" />
          <motion.a
            href={site.contacts.youtube}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="group relative mx-auto flex max-w-2xl aspect-video items-center justify-center overflow-hidden rounded-xl2 border border-temple-800/10 bg-ink-900 text-cream-50 shadow-soft outline-none transition-shadow duration-500 ease-divine hover:shadow-temple motion-reduce:transition-none"
            aria-label="Open Gauradesh TV on YouTube"
          >
            <div
              className="absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-80"
              style={{
                background:
                  'radial-gradient(60% 80% at 50% 40%, rgba(217,138,43,0.4) 0%, rgba(15,13,20,0) 70%)',
              }}
              aria-hidden
            />
            <div className="absolute left-5 top-5 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-400">
              Gauradesh TV — Live
            </div>
            <motion.div
              whileHover={{ scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cream-50/30 bg-cream-50/10 backdrop-blur"
            >
              <span className="ml-1 text-xl text-cream-50">▶</span>
            </motion.div>
          </motion.a>
        </Container>
      </Section>
    </motion.div>
  );
}
