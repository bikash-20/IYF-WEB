import { Badge } from '@/components/ui/Badge.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';
import { Reveal } from '@/components/ui/Reveal.jsx';
import { UtensilsCrossed, Sparkles, CalendarRange } from 'lucide-react';

/**
 * Festival calendar section.
 *
 * Renders the Vaishnava festival year as type-aware cards grouped by
 * month band. Each festival can be:
 *   - single day          (most appearance days)
 *   - multi-day           (Rathayatra — 9 days)
 *   - month-long observance (Damodar Month, Purushottam Month)
 *
 * ISKCON Sylhet serves prasadam free at every festival and on every
 * Sunday — that's surfaced as a saffron pill on every card so the
 * public guarantee is visible at a glance.
 *
 * Data shape lives in src/data/events.js (annualFestivals).
 * Pure presenter — no fetches, no side effects.
 */

const TYPE_META = {
  single:  { label: 'Single day',          tone: 'default' },
  multi:   { label: '9 days',               tone: 'peacock' },
  month:   { label: 'Month-long observance', tone: 'maroon' },
};

const MONTH_BANDS = [
  { id: 'feb-mar',     label: 'Feb – Mar',     months: ['February', 'March'] },
  { id: 'apr-may',     label: 'Apr – May',     months: ['April', 'May'] },
  { id: 'jun-jul',     label: 'Jun – Jul',     months: ['June', 'July'] },
  { id: 'aug-sep',     label: 'Aug – Sep',     months: ['August', 'September'] },
  { id: 'oct-nov',     label: 'Oct – Nov',     months: ['October', 'November'] },
  { id: 'dec-jan',     label: 'Dec – Jan',     months: ['December', 'January'] },
];

function bandFor(festival) {
  // Match a festival's startMonth against the month bands. Most
  // festivals live entirely inside one band; the few that cross
  // (e.g. Purushottam Month, Damodar Month) attach to their start band
  // — the timeline strip below carries the precise span.
  return MONTH_BANDS.find((b) => b.months.includes(festival.startMonth))?.id;
}

function bandLabel(festival) {
  if (!festival.endMonth || festival.endMonth === festival.startMonth) {
    return festival.startMonth;
  }
  return `${festival.startMonth} – ${festival.endMonth}`;
}

function FestivalCard({ festival }) {
  const meta = TYPE_META[festival.type] || TYPE_META.single;
  return (
    <RevealOnScroll>
      <article className="group relative flex h-full flex-col rounded-2xl border border-temple-800/10 bg-cream-50 p-5 shadow-soft transition-all duration-500 ease-divine hover:border-saffron-500/40 hover:shadow-temple motion-reduce:transition-none dark:border-white/8 dark:bg-ink-floating/80 dark:shadow-lift dark:hover:border-saffron-400/40 dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_30px_rgba(224,170,76,0.15)]">
        <header className="flex items-start justify-between gap-3">
          <div>
            <div className="font-mono text-[0.65rem] uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft">
              {bandLabel(festival)}
            </div>
            <h3 className="mt-1 font-display text-xl text-temple-800 md:text-2xl dark:text-fg-main">
              {festival.name}
            </h3>
          </div>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </header>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-temple-700/80 dark:text-fg-body dark:leading-dark">
          {festival.summary}
        </p>

        <footer className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-500/40 bg-saffron-500/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-eyebrow text-saffron-700">
            <UtensilsCrossed size={12} aria-hidden="true" />
            Prasadam served free
          </span>
          {festival.highlight ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-peacock-500/40 bg-peacock-500/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-eyebrow text-peacock-500">
              <Sparkles size={12} aria-hidden="true" />
              {festival.highlight}
            </span>
          ) : null}
        </footer>
      </article>
    </RevealOnScroll>
  );
}

function TimelineStrip({ festivals }) {
  // 12-month grid; each festival paints its own bar across the
  // months it spans. Helps the eye see month-long observances vs
  // 9-day festivals vs single days at a glance.
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = (m) => {
    const map = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
    };
    return map[m];
  };

  const rows = festivals.map((f) => {
    const start = monthIndex(f.startMonth);
    const end = monthIndex(f.endMonth || f.startMonth);
    const span = end - start + 1;
    return { f, start, span };
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-temple-800/10 bg-cream-50 p-5 shadow-soft dark:border-white/8 dark:bg-ink-floating/85 dark:shadow-lift md:p-6">
      <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft">
        <CalendarRange size={14} aria-hidden="true" />
        Year at a glance
      </div>

      <div className="mt-4 space-y-2">
        <div className="grid grid-cols-12 gap-2 font-mono text-[0.65rem] uppercase tracking-eyebrow text-temple-700/60 dark:text-fg-muted">
          {months.map((m) => (
            <div key={m} className="text-center">{m}</div>
          ))}
        </div>

        {rows.map(({ f, start, span }) => (
          <div key={f.id} className="grid grid-cols-12 items-center gap-2">
            <div className="col-span-12 md:col-span-3 md:pr-3 text-sm text-temple-800 dark:text-fg-main">
              {f.name}
            </div>
            <div className="col-span-12 md:col-span-9 grid grid-cols-12 gap-2">
              {Array.from({ length: 12 }).map((_, i) => {
                const inRange = i >= start && i < start + span;
                return (
                  <div
                    key={i}
                    aria-hidden="true"
                    className={
                      'h-2 rounded-full ' +
                      (inRange
                        ? f.type === 'month'
                          ? 'bg-maroon-600/70'
                          : f.type === 'multi'
                          ? 'bg-peacock-500/70'
                          : 'bg-saffron-500/80'
                        : 'bg-temple-800/5')
                    }
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-[0.65rem] uppercase tracking-eyebrow text-temple-700/70 dark:text-fg-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-4 rounded-full bg-saffron-500/80" aria-hidden="true" />
          Single day
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-4 rounded-full bg-peacock-500/70" aria-hidden="true" />
          Multi-day
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-4 rounded-full bg-maroon-600/70" aria-hidden="true" />
          Month observance
        </span>
      </div>
    </div>
  );
}

export function CalendarSection({ festivals }) {
  const grouped = MONTH_BANDS.map((band) => ({
    ...band,
    items: festivals.filter((f) => bandFor(f) === band.id),
  })).filter((b) => b.items.length > 0);

  return (
    <div className="space-y-10">
      <Reveal>
        <TimelineStrip festivals={festivals} />
      </Reveal>

      {grouped.map((band) => (
        <section key={band.id}>
          <h2 className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft">
            {band.label}
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {band.items.map((festival) => (
              <FestivalCard key={festival.id} festival={festival} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
