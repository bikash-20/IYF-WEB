import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Clock } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeader } from '@/components/ui/SectionHeader.jsx';
import { useCurrentProgram, useNow } from '@/hooks/useNow.js';
import { featuredFestival } from '@/data/featuredFestival.js';
import { todaysThought } from '@/content/thoughtOfTheDay.js';
import { todaysVerse } from '@/content/verseOfTheDay.js';
import { easeDivine, stagger, fadeUp } from '@/lib/motion.js';

/**
 * TodaysTemple — the home-page "what is alive at the mandir right now"
 * experience. v0.4 rewrite:
 *
 *   - Stacked rows (not a cramped 12-col grid). Each row gets its
 *     full height to breathe.
 *     Row 1: Live schedule (full width)
 *     Row 2: Thought + Verse (1:1)
 *     Row 3: Festival countdown (full width)
 *   - RadialLight removed from inside cards — it bled visibly on
 *     bright surfaces. The atmosphere itself carries the warmth now.
 *   - Festival countdown memoized so the page is steady.
 */

function minutesUntil(timeStr, now) {
  const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const meridiem = m[3].toUpperCase();
  if (meridiem === 'PM' && h !== 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  const target = h * 60 + min;
  let diff = target - now;
  if (diff < 0) diff += 24 * 60;
  return diff;
}

function pretty(diff) {
  if (diff == null) return '';
  if (diff < 60) return `in ${diff} min`;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (m === 0) return `in ${h} h`;
  return `in ${h} h ${m} m`;
}

function useFestivalCountdown() {
  const ms = useNow(1000);
  const target = new Date(featuredFestival.date).getTime();
  const diff = Math.max(0, target - ms);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  return { days, hours, minutes, diff };
}

export function TodaysTemple() {
  const { schedule, current, bdMinutes, closedTemple } = useCurrentProgram();
  const thought = todaysThought();
  const verse = todaysVerse();
  const countdown = useFestivalCountdown();

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
        <SectionHeader
          eyebrow="Today at the mandir"
          title="Today's Temple"
          lede="What is alive at the mandir right now, what to read for a quiet minute, and what is coming next."
        />

        {/* ---- Row 1: Live schedule (full width) --------------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.05)}
          className="relative overflow-hidden rounded-editorial border border-temple-800/10 bg-cream-50/85 p-7 shadow-soft backdrop-blur-sm md:p-10"
        >
          <div className="tex-overlay tex-paper" aria-hidden />

          <div className="relative">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="eyebrow">Live schedule</div>
              <div className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-temple-600/70 dark:text-fg-muted">
                Bangladesh · {fmt(bdMinutes)}
              </div>
            </div>

            <h3 className="mt-4 font-display text-display-md text-balance text-temple-900 dark:text-fg-main dark:glow-gold-soft">
              {current
                ? current.label
                : closedTemple
                ? 'The mandir is closed.'
                : 'Quiet until the next programme.'}
            </h3>

            {current && (
              <p className="mt-3 max-w-prose text-base leading-relaxed text-temple-800/80 dark:text-fg-body dark:leading-dark">
                {current.note}
              </p>
            )}

            <ul className="mt-7 divide-y divide-temple-800/[0.08]">
              {schedule.map((p) => {
                const isLive = p.status === 'live';
                const isDone = p.status === 'done';
                return (
                  <motion.li
                    key={p.id}
                    variants={fadeUp}
                    className={`grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-3 md:gap-6 ${
                      isDone ? 'opacity-55' : ''
                    }`}
                  >
                    <span className="font-mono text-[0.68rem] uppercase tracking-eyebrow text-saffron-600 tabular-nums">
                      {p.time}
                    </span>
                    <span className={`font-display text-base ${
                        isLive ? 'text-saffron-gradient italic dark:glow-gold-soft' : 'text-temple-800 dark:text-fg-main'
                      }`}>
                      {p.label}
                    </span>
                    <span className="text-right">
                      {isLive ? (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-600">
                          <span className="relative inline-block h-1.5 w-1.5">
                            <span className="absolute inset-0 animate-glow rounded-full bg-saffron-500" />
                            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-saffron-500" />
                          </span>
                          Now
                        </span>
                      ) : isDone ? (
                        <Check size={12} className="inline-block text-temple-500" aria-label="Completed" />
                      ) : (
                        <span className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-temple-700/70 dark:text-fg-muted">
                          {pretty(minutesUntil(p.time, bdMinutes))}
                        </span>
                      )}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <Link
              to="/schedule"
              className="mt-7 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-eyebrow text-saffron-600 transition-colors duration-300 hover:text-saffron-700 dark:text-saffron-400 dark:hover:text-saffron-300 dark:glow-gold-soft"
            >
              Full day & weekly rotation <ArrowUpRight size={12} />
            </Link>
          </div>
        </motion.div>

        {/* ---- Row 2: Thought + Verse -------------------------------- */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: easeDivine, delay: 0.05 }}
            className="relative overflow-hidden rounded-editorial border border-temple-800/10 bg-cream-50/80 p-7 shadow-soft backdrop-blur-sm md:p-10"
          >
            <div className="tex-overlay tex-linen" aria-hidden />
            <div className="relative">
              <div className="eyebrow">Thought of the day</div>
              <p className="mt-4 font-display text-2xl italic leading-snug text-balance text-temple-900 md:text-3xl dark:text-fg-main dark:glow-gold-soft">
                {thought.text}
              </p>
              <div className="mt-5 font-mono text-[0.62rem] uppercase tracking-eyebrow text-temple-600/70 dark:text-fg-muted">
                — {thought.author}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: easeDivine, delay: 0.12 }}
            className="relative overflow-hidden rounded-editorial border border-temple-800/10 bg-cream-50/80 p-7 shadow-soft backdrop-blur-sm md:p-10"
          >
            <div className="tex-overlay tex-cloth" aria-hidden />
            <div className="relative">
              <div className="eyebrow">Verse of the day</div>
              <p className="mt-4 font-display text-xl leading-snug text-temple-900 md:text-2xl dark:text-fg-main">
                {verse.sanskrit}
              </p>
              <p className="mt-2 text-sm italic text-temple-700/85 dark:text-fg-body dark:leading-dark">
                {verse.transliteration}
              </p>
              <p className="mt-4 text-base leading-relaxed text-temple-800 dark:text-fg-body dark:leading-dark">
                {verse.translation}
              </p>
              <div className="mt-5 font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-600 dark:text-saffron-400 dark:glow-gold-soft">
                {verse.reference}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---- Row 3: Festival countdown (full width) --------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: easeDivine, delay: 0.15 }}
          className="relative mt-6 overflow-hidden rounded-editorial border border-cream-50/10 bg-ink-800/75 p-7 shadow-soft md:p-10"
        >
          <div className="tex-overlay tex-stone" aria-hidden />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="eyebrow text-saffron-300">Upcoming festival</div>
              <h3 className="mt-3 font-display text-3xl text-cream-50 md:text-display-md text-balance">
                {featuredFestival.title}
              </h3>
              <p className="mt-1 font-display text-base italic text-saffron-300">
                {featuredFestival.subtitle}
              </p>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-cream-100/80">
                {featuredFestival.blurb}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-5">
              <CountCell value={countdown.days} label="Days" />
              <span className="font-display text-3xl text-cream-100/25 md:text-4xl">·</span>
              <CountCell value={countdown.hours} label="Hours" />
              <span className="font-display text-3xl text-cream-100/25 md:text-4xl">·</span>
              <CountCell value={countdown.minutes} label="Min" />
              <Link
                to={featuredFestival.href}
                className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-saffron-400/40 text-saffron-300 transition-all duration-300 hover:border-saffron-300 hover:bg-saffron-400/10"
                aria-label="See festival details"
              >
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center gap-2 text-xs text-temple-700/70 dark:text-fg-muted">
          <Clock size={12} className="text-temple-500 dark:text-fg-muted" />
          <span>Live schedule ticks every minute. Times follow Bangladesh Standard Time (UTC+6).</span>
        </div>
      </Container>
    </Section>
  );
}

function CountCell({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-4xl tabular-nums text-cream-50 md:text-5xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-300">
        {label}
      </span>
    </div>
  );
}