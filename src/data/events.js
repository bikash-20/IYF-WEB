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
    summary:
      'Weekly evening kirtan and prasadam, open to all ages — no registration needed.',
  },
];

/**
 * Annual Vaishnava festivals at Sri Sri Radha Madhava Mandir.
 *
 * `type`         — 'single' (1 day), 'multi' (multi-day, e.g. Rathayatra),
 *                  'month' (month-long observance, e.g. Damodar Month).
 * `startMonth`   — first month the festival touches.
 * `endMonth`     — last month it touches (omit for single-month).
 * `prasadamFree` — always true at ISKCON Sylhet; surfaced on every card so
 *                  the public guarantee is visible at a glance.
 *
 * The Calendar section on the Events page groups these into month bands
 * and renders a 12-month timeline strip so visitors can read the
 * shape of the festival year in one glance.
 */
export const annualFestivals = [
  // ─── Feb – Mar ──────────────────────────────────────────────────────
  {
    id: 'gaura-purnima',
    name: 'Gaura Purnima',
    type: 'single',
    startMonth: 'March',
    summary:
      'Appearance day of Sri Caitanya Mahaprabhu — the golden avatar who spread the chanting of the holy names across the world.',
    prasadamFree: true,
    highlight: 'Appearance of Sri Caitanya Mahaprabhu',
  },

  // ─── Apr – May ──────────────────────────────────────────────────────
  {
    id: 'rama-navami',
    name: 'Rama Navami',
    type: 'single',
    startMonth: 'April',
    summary:
      'Appearance day of Lord Sri Ramachandra — the perfect king, the son of Dasharatha, the hero of the Ramayana.',
    prasadamFree: true,
  },
  {
    id: 'pontirtha-snan-yatra',
    name: 'Pontirtha Snan Yatra',
    type: 'single',
    startMonth: 'May',
    summary:
      'The ceremonial bath of the deities at the pond, marking the transition into the rainy season.',
    prasadamFree: true,
  },

  // ─── Jun – Jul ──────────────────────────────────────────────────────
  {
    id: 'narasimha-jayanti',
    name: 'Narasimha Jayanti',
    type: 'single',
    startMonth: 'May',
    summary:
      'Appearance day of Lord Nrsimhadeva — the half-man, half-lion incarnation who protected Prahlada and destroyed Hiranyakashipu.',
    prasadamFree: true,
  },
  {
    id: 'jayapataka-swami-vyasa-puja',
    name: 'Jayapataka Swami Vyasapuja',
    type: 'single',
    startMonth: 'June',
    summary:
      'Celebration of the appearance day of His Holiness Jayapataka Swami — a senior Vaishnava sannyasi who has served ISKCON across the world for decades.',
    prasadamFree: true,
    highlight: 'Vyasapuja offering',
  },
  {
    id: 'snan-yatra',
    name: 'Snan Yatra',
    type: 'single',
    startMonth: 'June',
    summary:
      'The deities of the mandir are ceremonially bathed in panca-amrita — milk, yogurt, honey, ghee, and sugar — and dressed in fresh clothes for the rainy season.',
    prasadamFree: true,
  },
  {
    id: 'rathayatra',
    name: 'Rathayatra',
    type: 'multi',
    startMonth: 'July',
    endMonth: 'July',
    summary:
      'A nine-day public festival celebrating Lord Jagannatha, Baladeva, and Subhadra — the chariot procession travels through the streets of Sylhet with kirtan, dance, and an enormous public prasadam distribution.',
    prasadamFree: true,
    highlight: '9-day chariot festival · city procession',
  },
  {
    id: 'purushottam-month',
    name: 'Purushottam Month',
    type: 'month',
    startMonth: 'June',
    endMonth: 'July',
    summary:
      'A two-month extra-scriptural observance honouring Purushottama (Lord Jagannatha). Daily extra rounds of japa, special kirtan, and additional prasadam offerings throughout the period.',
    prasadamFree: true,
    highlight: '2-month observance',
  },

  // ─── Aug – Sep ──────────────────────────────────────────────────────
  {
    id: 'jhulan-yatra',
    name: 'Jhulan Yatra',
    type: 'single',
    startMonth: 'August',
    summary:
      'The swing festival — Sri Sri Radha Madhava are placed on decorated swings and gently swung to kirtan for several days, recalling Their pastimes in Vrindavan.',
    prasadamFree: true,
    highlight: 'Swing festival · multi-day',
  },
  {
    id: 'janmashtami',
    name: 'Janmashtami',
    type: 'single',
    startMonth: 'August',
    summary:
      'The appearance day of Lord Sri Krishna — a full day and night of kirtan, abhishek, and midnight arati. Prasadam is served throughout.',
    prasadamFree: true,
    highlight: 'Appearance of Lord Krishna',
  },
  {
    id: 'radha-astami',
    name: 'Radha Astami',
    type: 'single',
    startMonth: 'September',
    summary:
      "Appearance day of Srimati Radharani — Krishna's most beloved devotee and the embodiment of devotion itself.",
    prasadamFree: true,
  },
  {
    id: 'srila-prabhupada-vyasa-puja',
    name: 'Srila Prabhupada Vyasapuja',
    type: 'single',
    startMonth: 'September',
    summary:
      'The appearance day of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada — founder-ācārya of ISKCON, who brought the teachings of Caitanya Mahaprabhu to the world.',
    prasadamFree: true,
    highlight: 'Founder-ācārya · book distribution',
  },

  // ─── Oct – Nov ──────────────────────────────────────────────────────
  {
    id: 'damodar-month',
    name: 'Damodar Month',
    type: 'month',
    startMonth: 'October',
    endMonth: 'November',
    summary:
      'A full month of extended evening lamp-offering arati to Sri Sri Radha Madhava in Their Damodara form, accompanied by kirtan, scripture readings, and an extra prasadam feast each day.',
    prasadamFree: true,
    highlight: 'Month-long observance · daily lamp offering',
  },

  // ─── Dec – Jan ──────────────────────────────────────────────────────
  {
    id: 'gita-jayanti',
    name: 'Gita Jayanti',
    type: 'single',
    startMonth: 'December',
    summary:
      'The day Lord Sri Krishna first spoke the Bhagavad-gita to Arjuna on the battlefield of Kurukshetra — celebrated with continuous scripture recitation and a public Gita recitation marathon.',
    prasadamFree: true,
    highlight: 'Bhagavad-gita recitation',
  },
];

/**
 * Convenience derived data: festivals grouped by each month they touch.
 * UI components can also derive this locally; this export keeps the
 * math in one place for future re-use.
 */
export const festivalsByMonthBand = annualFestivals.reduce((acc, f) => {
  const all = [
    'January', 'February', 'March',
    'April',   'May',      'June',
    'July',    'August',   'September',
    'October', 'November', 'December',
  ];
  const s = all.indexOf(f.startMonth);
  const e = f.endMonth ? all.indexOf(f.endMonth) : s;
  for (let i = s; i <= e; i++) {
    const m = all[i];
    acc[m] = acc[m] || [];
    acc[m].push(f);
  }
  return acc;
}, {});
