import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section.jsx';
import { RadialLight } from '@/components/ui/RadialLight.jsx';
import { featuredFestival } from '@/data/featuredFestival.js';
import { easeDivine } from '@/lib/motion.js';

/**
 * FestivalCountdown — the next-featured festival with a live
 * countdown. Reads from `featuredFestival` config object — replace
 * the source (not the component) when you want a different festival
 * promoted.
 */
function diff(target) {
  const ms = new Date(target).getTime() - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1_000);
  return { days, hours, minutes, seconds, done: false };
}

export function FestivalCountdown() {
  const [t, setT] = useState(() => diff(featuredFestival.date));

  useEffect(() => {
    const id = setInterval(() => setT(diff(featuredFestival.date)), 1000);
    return () => clearInterval(id);
  }, []);

  const Cell = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span className="font-display text-4xl tabular-nums text-cream-50 md:text-5xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 font-mono text-[0.65rem] uppercase tracking-eyebrow text-saffron-300 dark:text-saffron-400 dark:glow-gold-soft">
        {label}
      </span>
    </div>
  );

  return (
    <Section variant="deep" pad="default">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.0, ease: easeDivine }}
          className="relative overflow-hidden rounded-editorial border border-cream-50/10 bg-ink-800/60 p-8 dark:border-saffron-400/15 dark:bg-ink-deep md:p-14"
        >
          <RadialLight
            color="rgba(217,138,43,0.22)"
            size="55%"
            pos="0% 0%"
            className="!relative inset-0 h-full w-full"
          />
          <RadialLight
            color="rgba(27,94,122,0.18)"
            size="60%"
            pos="100% 100%"
            className="!relative inset-0 h-full w-full"
          />
          <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay" aria-hidden />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="eyebrow text-saffron-300">Upcoming festival</div>
              <h3 className="mt-4 font-display text-display-md text-cream-50 text-balance dark:glow-gold-soft">
                {featuredFestival.title}
              </h3>
              <p className="mt-3 font-display text-base italic text-saffron-300">
                {featuredFestival.subtitle}
              </p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-cream-100/75">
                {featuredFestival.blurb}
              </p>

              <Link
                to={featuredFestival.href}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-saffron-400/40 px-5 py-2.5 text-xs font-medium uppercase tracking-eyebrow text-saffron-300 transition-all duration-300 hover:border-saffron-300 hover:bg-saffron-400/10"
              >
                All festivals <ArrowUpRight size={12} />
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-4 gap-3 md:gap-5">
                <Cell value={t.days} label="Days" />
                <Cell value={t.hours} label="Hours" />
                <Cell value={t.minutes} label="Min" />
                <Cell value={t.seconds} label="Sec" />
              </div>
              <div className="hr-soft bg-saffron-400/40" />
              <p className="font-mono text-[0.65rem] uppercase tracking-eyebrow text-cream-100/50">
                Until midnight arati ·{' '}
                {new Date(featuredFestival.date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}