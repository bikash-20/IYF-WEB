/**
 * Daily darshan & arati schedule. v0.3 rewrite per Bikash's correction
 * (15 July 2026). The shape is CMS-ready so a future admin panel can
 * edit these without touching code.
 *
 * End-times are derived from the experience at the mandir. The last
 * item (Gita class) closes the temple day at 9:00 PM.
 */
export const dailySchedule = [
  {
    id: 'mangal-arati',
    label: 'Mangal Arati',
    time: '4:00 AM',
    end: '5:00 AM',
    note: 'The first offering of the day, before sunrise. Silent in the temple room.',
  },
  {
    id: 'japa',
    label: 'Japa Meditation',
    time: '5:00 AM',
    end: '7:00 AM',
    note: 'Personal chanting of the maha-mantra on beads, in the temple room or japa hall.',
  },
  {
    id: 'guru-puja',
    label: 'Guru Puja',
    time: '7:00 AM',
    end: '7:30 AM',
    note: 'Worship of the spiritual master, with kirtan and offerings.',
  },
  {
    id: 'bhagavatam',
    label: 'Srimad Bhagavatam Class',
    time: '8:00 AM',
    end: '8:30 AM',
    note: 'Daily scripture study — open to all visitors.',
  },
  {
    id: 'morning-prasadam',
    label: 'Morning Prasadam',
    time: '9:00 AM',
    end: '9:45 AM',
    note: 'Sanctified vegetarian breakfast served to all.',
  },
  {
    id: 'madhyahna',
    label: 'Madhyahna Arati',
    time: '12:00 PM',
    end: '12:30 PM',
    note: 'Midday offering to the deities.',
  },
  {
    id: 'rajasuya',
    label: 'Raj Bhoga Arati',
    time: '1:00 PM',
    end: '1:30 PM',
    note: 'The midday meal offered to the Lord, followed by arati.',
  },
  {
    id: 'afternoon-prasadam',
    label: 'Afternoon Prasadam',
    time: '1:30 PM',
    end: '2:30 PM',
    note: 'Sanctified vegetarian lunch served to the community.',
  },
  {
    id: 'kirtan-mela',
    label: 'Kirtan Mela',
    time: '5:00 PM',
    end: '6:00 PM',
    note: 'Congregational kirtan — mridanga, karatalas, and voices together.',
  },
  {
    id: 'sandhya',
    label: 'Sandhya Arati',
    time: '6:15 PM',
    end: '7:15 PM',
    note: 'Evening lamp offering to the deities, with kirtan and incense.',
  },
  {
    id: 'gita',
    label: 'Bhagavad-gita Class',
    time: '7:30 PM',
    end: '9:00 PM',
    note: 'Evening class — scripture for the soul. The temple closes at 9 PM.',
  },
];

/**
 * Helpers used by Today's-Temple to render the live schedule without
 * any third-party data source.
 */
export function timeToMinutes(timeStr) {
  const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return 0;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const meridiem = m[3].toUpperCase();
  if (meridiem === 'PM' && h !== 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}

export function programStatusAt(bdMinutes, program) {
  const start = timeToMinutes(program.time);
  const endRaw = program.end ? timeToMinutes(program.end) : start + 30;
  const end = endRaw < start ? endRaw + 24 * 60 : endRaw; // wrap midnight
  const now = bdMinutes;
  if (now >= start && now < end) return 'live';
  if (now < start) return 'upcoming';
  return 'done';
}

export function bdMinutesNow() {
  const now = new Date();
  return (now.getUTCHours() * 60 + now.getUTCMinutes() + 6 * 60 + 24 * 60) % (24 * 60);
}
