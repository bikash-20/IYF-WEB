/**
 * Upcoming events & festival calendar. Shape mirrors what a future
 * CMS would return, so the listing UI doesn't need to change when
 * the data source does.
 */
export const upcomingEvents = [
  {
    id: 'krishna-leela-mela-2026',
    title: 'Krishna Leela Mela — Janmashtami',
    start: '2026-08-14',
    end: '2026-08-16',
    tag: 'Multi-day',
    summary:
      'A multi-day festival celebrating the appearance of Lord Krishna, with kirtan, drama, abhishekam, and a temple-wide fair.',
  },
  {
    id: 'gita-retreat-2026',
    title: 'Youth Bhagavad-gita Retreat',
    start: '2026-09-04',
    end: '2026-09-05',
    tag: 'Weekend',
    summary:
      'A weekend of scripture study, japa meditation, and discussion for college-age devotees.',
  },
  {
    id: 'kirtan-night-weekly',
    title: 'Youth Kirtan Night',
    recurring: 'Weekly · Friday',
    tag: 'Weekly',
    summary: 'Weekly evening kirtan and prasadam, open to all ages — no registration needed.',
  },
];

export const annualFestivals = [
  { id: 'janmashtami', name: 'Janmashtami', month: 'August / September' },
  { id: 'gaura-purnima', name: 'Gaura Purnima', month: 'March' },
  { id: 'rathayatra', name: 'Rathayatra', month: 'June / July' },
  { id: 'narasimha-jayanti', name: 'Narasimha Jayanti', month: 'April / May' },
  { id: 'rama-navami', name: 'Rama Navami', month: 'March / April' },
  { id: 'gita-jayanti', name: ' Gita Jayanti', month: 'November / December' },
];
