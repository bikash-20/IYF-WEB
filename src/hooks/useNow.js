import { useEffect, useState } from 'react';
import {
  dailySchedule,
  programStatusAt,
} from '@/data/dailySchedule.js';

/**
 * Bangladesh-time-aware tick. Returns the current BD minute-of-day,
 * updating every `tickMs` milliseconds (default 60 s — wall-clock
 * precision is enough for the "now at the mandir" surface).
 */
export function useNow(tickMs = 60_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), tickMs);
    return () => clearInterval(t);
  }, [tickMs]);
  return now;
}

/**
 * Returns the full schedule annotated with `status` ('live' |
 * 'upcoming' | 'done') for the current Bangladesh time, plus the
 * next-up program if none is live. Ticks every minute by default.
 */
export function useCurrentProgram() {
  const nowMs = useNow(60_000);
  const bdMinutes = bdMinutesNowAt(nowMs);

  const annotated = dailySchedule.map((p) => ({
    ...p,
    status: programStatusAt(bdMinutes, p),
  }));

  let current = annotated.find((p) => p.status === 'live') || null;
  let next = annotated.find((p) => p.status === 'upcoming') || annotated[0];

  return {
    schedule: annotated,
    current,
    next,
    bdMinutes,
    closedTemple: !current && annotated.every((p) => p.status === 'done'),
  };
}

function bdMinutesNowAt(ms) {
  const now = new Date(ms);
  return (now.getUTCHours() * 60 + now.getUTCMinutes() + 6 * 60 + 24 * 60) % (24 * 60);
}