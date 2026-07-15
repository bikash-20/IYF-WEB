import { Link } from 'react-router-dom';
import { Clock, Sparkles } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section.jsx';
import { RadialLight } from '@/components/ui/RadialLight.jsx';
import { Reveal } from '@/components/ui/Reveal.jsx';
import { useCurrentProgram } from '@/hooks/useNow.js';

/**
 * TodaysDarshan — the "Arrival" moment after the hero.
 *
 * v0.2 changes:
 *   - Reads wall-clock BD time to decide which program is "now"
 *   - Soft saffron glow behind the card
 *   - Generous padding (section-pad) so it feels like a breathing moment,
 *     not a busy next-section
 *   - "Next" program shown to the right of the card
 *
 * v0.8.1: replaced Framer Motion `whileInView` with Reveal.
 */
export function TodaysDarshan() {
  const { current, next, bdMinutes } = useCurrentProgram();

  // Show times in 12h Bangladesh time for display
  const fmt = (m) => {
    const h24 = Math.floor(m / 60) % 24;
    const min = m % 60;
    const meridiem = h24 >= 12 ? 'PM' : 'AM';
    const h12 = ((h24 + 11) % 12) + 1;
    return `${h12}:${String(min).padStart(2, '0')} ${meridiem}`;
  };

  return (
    <Section variant="warm" pad="default">
      <Container>
        <div className="grid items-stretch gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="relative overflow-hidden rounded-editorial border border-temple-800/10 bg-cream-50/80 p-8 shadow-soft backdrop-blur-sm dark:border-white/8 dark:bg-ink-floating/80 dark:shadow-lift md:p-10">
              <RadialLight
                color="rgba(217,138,43,0.18)"
                size="50%"
                pos="100% 0%"
                className="!relative inset-0 h-full w-full"
              />
              <div className="relative flex items-center gap-3">
                <span className="inline-flex h-2 w-2 animate-glow rounded-full bg-saffron-500" aria-hidden />
                <div className="eyebrow">Now at the mandir</div>
              </div>

              {current ? (
                <>
                  <h3 className="mt-5 font-display text-display-md text-balance dark:text-fg-main">
                    {current.label}
                  </h3>
                  <p className="mt-4 max-w-prose text-base leading-relaxed text-temple-700/85 dark:text-fg-body dark:leading-dark">
                    {current.note}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[0.72rem] uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft">
                    <span className="inline-flex items-center gap-2">
                      <Clock size={12} />
                      Began {current.time}
                    </span>
                    <span className="text-temple-400 dark:text-fg-muted">·</span>
                    <span className="text-temple-700/70 dark:text-fg-muted">Bangladesh time {fmt(bdMinutes)}</span>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="mt-5 font-display text-display-md">
                    The mandir is quiet until next arati.
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-temple-700/85">
                    {next
                      ? `${next.label} begins at ${next.time}.`
                      : 'See the full daily schedule below.'}
                  </p>
                </>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4 md:col-span-5">
            <div className="rounded-editorial border border-temple-800/10 bg-cream-50/60 p-7 dark:border-white/8 dark:bg-ink-floating/65">
              <div className="eyebrow">Up next</div>
              {next && (
                <h4 className="mt-3 font-display text-2xl text-temple-800 dark:text-fg-main">
                  {next.label}
                </h4>
              )}
              <p className="mt-2 text-sm leading-relaxed text-temple-700/80 dark:text-fg-body dark:leading-dark">
                {next?.note}
              </p>
              <div className="mt-5 font-mono text-xs uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft">
                {next?.time}
              </div>
            </div>

            <Link
              to="/schedule"
              className="group inline-flex items-center justify-between gap-3 rounded-editorial border border-saffron-500/40 bg-saffron-500/[0.06] p-5 text-sm transition-all duration-500 hover:bg-saffron-500/[0.12]"
            >
              <span className="font-mono text-xs uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft">
                See the full day
              </span>
              <Sparkles size={14} className="text-saffron-500 transition-transform duration-300 group-hover:translate-x-0.5 dark:text-saffron-400" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}