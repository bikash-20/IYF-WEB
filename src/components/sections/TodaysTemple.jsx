import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Clock } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeader } from '@/components/ui/SectionHeader.jsx';
import { RadialLight } from '@/components/ui/RadialLight.jsx';
import { useCurrentProgram, useNow } from '@/hooks/useNow.js';
import { featuredFestival } from '@/data/featuredFestival.js';
import { todaysThought } from '@/content/thoughtOfTheDay.js';
import { todaysVerse } from '@/content/verseOfTheDay.js';
import { easeDivine, stagger, fadeUp } from '@/lib/motion.js';

/**
 * TodaysTemple — the home-page "what is alive at the mandir right now"
 * experience. v0.3 replaces the single TodaysDarshan card with a
 * layered composition:
 *
 *   1. Live schedule with status per program (live / upcoming / done)
 *   2. Thought of the Day (curated, rotated by day-of-year)
 *   3. Verse of the Day (Sanskrit + transliteration + translation)
 *   4. Upcoming Festival (countdown against featuredFestival.js)
 *
 * No fake "live" data — every value is a function of wall-clock time
 * and curated content.
 */

function minutesUntil(timeStr) {
  const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const meridiem = m[3].toUpperCase();
  if (meridiem === 'PM' && h !== 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  const target = h * 60 + min;
  const now = new Date();
  const bd = (now.getUTCHours() * 60 + now.getUTCMinutes() + 6 * 60 + 24 * 60) % (24 * 60);
  let diff = target - bd;
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

        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          {/* ---- Live schedule card ----------------------------------- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger(0.06)}
            className="relative overflow-hidden rounded-editorial border border-temple-800/10 bg-cream-50/85 p-7 shadow-soft backdrop-blur-sm md:col-span-7 md:p-10"
          >
            <div className="tex-overlay tex-paper" aria-hidden />
            <RadialLight
              color="rgba(217,138,43,0.20)"
              size="55%"
              pos="100% 0%"
              className="!relative inset-0 h-full w-full"
            />

            <div className="relative">
              <div className="flex items-baseline justify-between gap-4">
                <div className="eyebrow">Live schedule</div>
                <div className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-temple-600/70">
                  BD · {fmt(bdMinutes)}
                </div>
              </div>

              <h3 className="mt-4 font-display text-display-md text-balance text-temple-900">
                {current
                  ? current.label
                  : closedTemple
                  ? 'The mandir is closed.'
                  : 'Quiet until the next programme.'}
              </h3>

              <ul className="mt-6 space-y-1">
                {schedule.map((p) => {
                  const isLive = p.status === 'live';
                  const isDone = p.status === 'done';
                  return (
                    <motion.li
                      key={p.id}
                      variants={fadeUp}
                      className={`grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-t border-temple-800/[0.08] py-3 ${
                        isDone ? 'opacity-55' : ''
                      }`}
                    >
                      <span className="font-mono text-[0.68rem] uppercase tracking-eyebrow text-saffron-600 tabular-nums">
                        {p.time}
                      </span>
                      <span
                        className={`font-display text-base ${
                          isLive ? 'text-saffron-gradient italic' : 'text-temple-800'
                        }`}
                      >
                        {p.label}
                      </span>
                      <span className="text-right">
                        {isLive ? (
                          <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-600">
                            <span className="inline-flex h-1.5 w-1.5">
                              <span className="absolute inset-0 animate-glow rounded-full bg-saffron-500" />
                              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-saffron-500" />
                            </span>
                            Now
                          </span>
                        ) : isDone ? (
                          <Check size={12} className="inline-block text-temple-500" aria-label="Completed" />
                        ) : (
                          <span className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-temple-700/70">
                            {pretty(minutesUntil(p.time))}
                          </span>
                        )}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>

              <Link
                to="/schedule"
                className="mt-7 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-eyebrow text-saffron-600 transition-colors duration-300 hover:text-saffron-700"
              >
                Full day & weekly rotation <ArrowUpRight size={12} />
              </Link>
            </div>
          </motion.div>

          {/* ---- Thought + Verse stack -------------------------------- */}
          <div className="flex flex-col gap-5 md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: easeDivine, delay: 0.05 }}
              className="relative overflow-hidden rounded-editorial border border-temple-800/10 bg-cream-50/80 p-7 shadow-soft backdrop-blur-sm"
            >
              <div className="tex-overlay tex-linen" aria-hidden />
              <div className="relative">
                <div className="eyebrow">Thought of the day</div>
                <p className="mt-4 font-display text-2xl italic leading-snug text-balance text-temple-900">
                  {thought.text}
                </p>
                <div className="mt-4 font-mono text-[0.62rem] uppercase tracking-eyebrow text-temple-600/70">
                  — {thought.author}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: easeDivine, delay: 0.12 }}
              className="relative overflow-hidden rounded-editorial border border-temple-800/10 bg-cream-50/80 p-7 shadow-soft backdrop-blur-sm"
            >
              <div className="tex-overlay tex-cloth" aria-hidden />
              <div className="relative">
                <div className="eyebrow">Verse of the day</div>
                <p className="mt-4 font-display text-xl leading-snug text-temple-900">
                  {verse.sanskrit}
                </p>
                <p className="mt-2 text-sm italic text-temple-700/85">
                  {verse.transliteration}
                </p>
                <p className="mt-4 text-base leading-relaxed text-temple-800">
                  {verse.translation}
                </p>
                <div className="mt-4 font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-600">
                  {verse.reference}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ---- Festival countdown (full width) -------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: easeDivine, delay: 0.15 }}
            className="relative overflow-hidden rounded-editorial border border-cream-50/10 bg-ink-800/70 p-7 shadow-soft md:col-span-12 md:p-9"
          >
            <div className="tex-overlay tex-stone" aria-hidden />
            <RadialLight
              color="rgba(217,138,43,0.18)"
              size="50%"
              pos="0% 50%"
              className="!relative inset-0 h-full w-full"
            />
            <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
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
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center">
                  <span className="font-display text-4xl tabular-nums text-cream-50 md:text-5xl">
                    {String(countdown.days).padStart(2, '0')}
                  </span>
                  <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-300">
                    Days
                  </span>
                </div>
                <span className="font-display text-4xl text-cream-100/30">·</span>
                <div className="flex flex-col items-center">
                  <span className="font-display text-4xl tabular-nums text-cream-50 md:text-5xl">
                    {String(countdown.hours).padStart(2, '0')}
                  </span>
                  <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-300">
                    Hours
                  </span>
                </div>
                <span className="font-display text-4xl text-cream-100/30">·</span>
                <div className="flex flex-col items-center">
                  <span className="font-display text-4xl tabular-nums text-cream-50 md:text-5xl">
                    {String(countdown.minutes).padStart(2, '0')}
                  </span>
                  <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-300">
                    Min
                  </span>
                </div>
                <Link
                  to={featuredFestival.href}
                  className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-saffron-400/40 text-saffron-300 transition-all duration-300 hover:border-saffron-300 hover:bg-saffron-400/10"
                  aria-label="See festival details"
                >
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs text-temple-700/70">
          <Clock size={12} className="text-temple-500" />
          <span>Live schedule ticks every minute. Times follow Bangladesh Standard Time (UTC+6).</span>
        </div>
      </Container>
    </Section>
  );
}