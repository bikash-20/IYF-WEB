import { useEffect, useState } from 'react';
import { dailySchedule } from '@/data/dailySchedule.js';

/**
 * Returns the currently running program (or the next one if none is
 * running) in Bangladesh time. Re-ticks every minute.
 *
 * Used by TodaysDarshan to give the home page a live "now happening"
 * card without faking anything — it's just a function of wall-clock time.
 */
export function useCurrentProgram() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  // Bangladesh time = UTC+6 (no DST). Convert "now" to a Bangladesh
  // hour/minute so the timeline feels right to anyone visiting.
  const bdMinutes = (now.getUTCHours() * 60 + now.getUTCMinutes() + 6 * 60 + 24 * 60) % (24 * 60);
  const toMinutes = (timeStr) => {
    const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) return 0;
    let h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    const meridiem = m[3].toUpperCase();
    if (meridiem === 'PM' && h !== 12) h += 12;
    if (meridiem === 'AM' && h === 12) h = 0;
    return h * 60 + min;
  };

  const slots = dailySchedule.map((s) => ({ ...s, _m: toMinutes(s.time) }));
  let current = null;
  let next = null;
  for (let i = 0; i < slots.length; i++) {
    const s = slots[i];
    const end = slots[i + 1]?._m ?? 24 * 60 + 60;
    if (bdMinutes >= s._m && bdMinutes < end) {
      current = s;
      next = slots[i + 1] ?? slots[0];
      break;
    }
  }
  if (!current) {
    next = slots.find((s) => s._m > bdMinutes) ?? slots[0];
  }

  return { current, next, bdMinutes };
}