import { motion, useReducedMotion } from 'framer-motion';
import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { Reveal } from '@/components/ui/Reveal.jsx';
import { Play, ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/site.js';

const links = [
  {
    title: 'Gauradesh TV',
    sub: 'YouTube · daily darshan & kirtan',
    href: site.contacts.youtube,
  },
  {
    title: 'IYF Sylhet',
    sub: 'Facebook · events & updates',
    href: site.contacts.facebook,
  },
  {
    title: 'ISKCON Sylhet',
    sub: 'Official temple center page',
    href: 'https://centers.iskcondesiretree.com/2011/06/06/sylhet/',
  },
];

export function MediaSection() {
  return (
    <Section variant="haze" id="media" pad="default">
      <Container>
        <SectionHeading eyebrow="Watch & follow" title="Live Darshan & Media" />

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <a
              href={site.contacts.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-xl2 border border-temple-800/10 bg-ink-900 text-cream-50 dark:border-white/8"
            >
              <div
                className="bg-radial-saffron-center absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-70"
                aria-hidden
              />
              <div className="absolute left-5 top-5 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-400 dark:glow-gold-soft">
                Gauradesh TV — Live
              </div>
              <div className="relative flex h-16 w-16 items-center justify-center">
                {/* v1.1: live pulse rings — two expanding saffron halos
                    breathe outward from the play button so the stream
                    reads as "live" at a glance. Skipped entirely for
                    reduced-motion users. */}
                <PulseRings />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cream-50/30 bg-cream-50/10 backdrop-blur transition-transform duration-500 group-hover:scale-110">
                  <Play size={20} className="ml-1 text-cream-50" />
                </div>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.title}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl2 border border-temple-800/10 bg-cream-50 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron-500/40 hover:shadow-soft dark:border-white/8 dark:bg-ink-floating/85 dark:hover:border-saffron-400/40 dark:hover:bg-ink-lift/85"
              >
                <div>
                  <div className="font-display text-lg text-temple-800 dark:text-fg-main">{l.title}</div>
                  <div className="text-xs text-temple-700/70 dark:text-fg-muted">{l.sub}</div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-temple-700/50 transition-colors group-hover:text-saffron-500 dark:text-fg-muted dark:group-hover:text-saffron-400"
                />
              </a>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/**
 * PulseRings — the "live" halo around the play button. Two saffron
 * rings expand and fade on an infinite loop, offset so the pulse
 * reads continuous rather than mechanical. Returns null under
 * prefers-reduced-motion.
 */
function PulseRings() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  const ring =
    'pointer-events-none absolute inset-0 rounded-full border border-saffron-400/50';

  return (
    <>
      <motion.span
        aria-hidden
        className={ring}
        animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.span
        aria-hidden
        className={ring}
        animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
      />
    </>
  );
}
