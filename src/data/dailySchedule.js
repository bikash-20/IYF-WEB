/**
 * Daily darshan & arati schedule. v0.4 rewrite per Bikash's correction
 * (15 July 2026). The shape is CMS-ready so a future admin panel can
 * edit these without touching code.
 *
 * End-times are derived from the experience at the mandir. The last
 * item (Shayan arthi → temple closes) is the final event of the day.
 * Two `closes` entries mark the midday break (1:00 PM) and the end
 * of the temple day (8:30 PM) — both are CMS-friendly labels rather
 * than styled arati rows.
 */
export const dailySchedule = [
  {
    id: 'mangala-arati',
    label: 'Mangala Arati',
    time: '4:30 AM',
    end: '5:30 AM',
    note: 'The first offering of the day, before sunrise. Silent in the temple room.',
  },
  {
    id: 'darshan-arati',
    label: 'Darshan Arati',
    time: '7:00 AM',
    end: '7:30 AM',
    note: 'Morning darshan opens with arati — the curtains part and the deities are seen for the first time.',
  },
  {
    id: 'bhagavatam',
    label: 'Srimad Bhagavatam Class',
    time: '8:00 AM',
    end: '9:00 AM',
    note: 'Daily scripture study — open to all visitors.',
  },
  {
    id: 'rajabhoga-arati',
    label: 'Raj Bhoga Arati',
    time: '11:45 AM',
    end: '12:30 PM',
    note: 'The midday meal offered to the Lord, followed by arati. Last darshan before the temple closes for the afternoon.',
  },
  {
    id: 'closes-midday',
    label: 'Temple Closes',
    time: '1:00 PM',
    end: '4:00 PM',
    note: 'The temple rests. The deities rest too — please return for Dhoop Arati at 4:00 PM.',
    kind: 'closes',
  },
  {
    id: 'dhoop-arati',
    label: 'Dhoop Arati',
    time: '4:00 PM',
    end: '5:00 PM',
    note: 'Incense offering to the deities. The temple reopens for the evening.',
  },
  {
    id: 'sandhya-arati',
    label: 'Sandhya Arati',
    time: '6:30 PM',
    end: '7:00 PM',
    note: 'Evening lamp offering to the deities, with kirtan and incense.',
  },
  {
    id: 'gita',
    label: 'Bhagavad-gita Class',
    time: '7:15 PM',
    end: '8:00 PM',
    note: 'Evening class — scripture for the soul. Open to all visitors.',
  },
  {
    id: 'shayan-arati',
    label: 'Shayan Arati',
    time: '8:15 PM',
    end: '8:30 PM',
    note: 'The final offering of the day — the deities are prepared for rest.',
  },
  {
    id: 'closes-night',
    label: 'Temple Closes',
    time: '8:30 PM',
    end: '8:30 PM',
    note: 'The temple day ends here. The deities sleep; the lamps dim until Mangala Arati.',
    kind: 'closes',
  },
];

/**
 * Helpers used by Today's-Temple to render the live schedule without
 * relying on any third-party data source.
 */

export function getCurrentSchedule(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes();
  return dailySchedule.find((row) => {
    const start = toMinutes(row.time);
    const end = toMinutes(row.end);
    return minutes >= start && minutes < end;
  });
}

export function getNextSchedule(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes();
  return dailySchedule.find((row) => toMinutes(row.time) > minutes);
}

/**
 * Status of a single program relative to a Bangladesh minute-of-day.
 * Returns 'live' | 'upcoming' | 'done'. Used by useCurrentProgram
 * to colour rows in the live-schedule surface.
 */
export function programStatusAt(bdMinutes, program) {
  const start = toMinutes(program.time);
  const end = toMinutes(program.end);
  if (bdMinutes >= start && bdMinutes < end) return 'live';
  if (bdMinutes < start) return 'upcoming';
  return 'done';
}

function toMinutes(label) {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(label.trim());
  if (!m) return 0;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const mer = m[3].toUpperCase();
  if (mer === 'PM' && h !== 12) h += 12;
  if (mer === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}
