import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';
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
    <Section variant="muted" id="media">
      <Container>
        <SectionHeading eyebrow="Watch & follow" title="Live Darshan & Media" />

        <div className="grid gap-5 md:grid-cols-2">
          <RevealOnScroll>
            <a
              href={site.contacts.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-xl2 border border-temple-800/10 bg-ink-900 text-cream-50"
            >
              <div
                className="absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-70"
                style={{
                  background:
                    'radial-gradient(60% 80% at 50% 40%, rgba(217,138,43,0.35) 0%, rgba(15,13,20,0) 70%)',
                }}
                aria-hidden
              />
              <div className="absolute left-5 top-5 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-400">
                Gauradesh TV — Live
              </div>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cream-50/30 bg-cream-50/10 backdrop-blur transition-transform duration-500 group-hover:scale-110">
                <Play size={20} className="ml-1 text-cream-50" />
              </div>
            </a>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.title}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl2 border border-temple-800/10 bg-cream-50 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron-500/40 hover:shadow-soft"
              >
                <div>
                  <div className="font-display text-lg text-temple-800">{l.title}</div>
                  <div className="text-xs text-temple-700/70">{l.sub}</div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-temple-700/50 transition-colors group-hover:text-saffron-500"
                />
              </a>
            ))}
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}
