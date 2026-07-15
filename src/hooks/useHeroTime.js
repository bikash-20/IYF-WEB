import { useEffect, useState } from 'react';

/**
 * useHeroTime — returns a coarse "phase of day" classification for
 * the hero atmosphere. Updates every 5 minutes; the page does not
 * need per-second precision for the colour shift.
 *
 *   dawn      04:00–06:30 BD  — quiet saffron, lamp-warm
 *   morning   06:30–11:00 BD  — soft cream, sun rising
 *   midday    11:00–15:30 BD  — neutral cream, mid-air
 *   afternoon 15:30–17:00 BD  — warm beige, slow light
 *   evening   17:00–19:30 BD  — deep amber, lamps on
 *   night     19:30–04:00 BD  — moonlight blue, lamp dominant
 */
export function useHeroTime() {
  const [phase, setPhase] = useState(() => phaseAt(Date.now()));

  useEffect(() => {
    const tick = () => setPhase(phaseAt(Date.now()));
    tick();
    const t = setInterval(tick, 5 * 60_000);
    return () => clearInterval(t);
  }, []);

  const gradient =
    phase === 'dawn'      ? 'from-amber-100/55 via-orange-100/35 to-transparent'
  : phase === 'morning'   ? 'from-warm-white/70 via-cream-100/40 to-transparent'
  : phase === 'midday'    ? 'from-warm-white/60 via-cream-200/30 to-transparent'
  : phase === 'afternoon' ? 'from-cream-200/65 via-warm-beige/45 to-transparent'
  : phase === 'evening'   ? 'from-amber-300/40 via-orange-300/30 to-transparent'
                          : 'from-indigo-200/35 via-blue-200/20 to-transparent';

  const deep =
    phase === 'dawn'      ? 'from-amber-900/40 via-orange-800/20 to-transparent'
  : phase === 'morning'   ? 'from-temple-700/25 via-temple-600/10 to-transparent'
  : phase === 'midday'    ? 'from-temple-600/15 via-temple-700/5  to-transparent'
  : phase === 'afternoon' ? 'from-temple-800/35 via-temple-700/15 to-transparent'
  : phase === 'evening'   ? 'from-temple-900/55 via-orange-900/25 to-transparent'
                          : 'from-indigo-900/65 via-blue-900/40 to-transparent';

  const lampIntensity =
    phase === 'dawn'      ? 0.55
  : phase === 'morning'   ? 0.30
  : phase === 'midday'    ? 0.15
  : phase === 'afternoon' ? 0.40
  : phase === 'evening'   ? 0.80
                          : 0.95;

  return { phase, gradient, deep, lampIntensity };
}

function phaseAt(ms) {
  // BD minute-of-day (UTC + 6h).
  const bdMin = bdMinutesAt(ms);
  if (bdMin >= 4 * 60 && bdMin < 6 * 60 + 30) return 'dawn';
  if (bdMin >= 6 * 60 + 30 && bdMin < 11 * 60) return 'morning';
  if (bdMin >= 11 * 60 && bdMin < 15 * 60 + 30) return 'midday';
  if (bdMin >= 15 * 60 + 30 && bdMin < 17 * 60) return 'afternoon';
  if (bdMin >= 17 * 60 && bdMin < 19 * 60 + 30) return 'evening';
  return 'night';
}

function bdMinutesAt(ms) {
  const d = new Date(ms);
  return ((d.getUTCHours() * 60 + d.getUTCMinutes() + 6 * 60 + 24 * 60) % (24 * 60));
}