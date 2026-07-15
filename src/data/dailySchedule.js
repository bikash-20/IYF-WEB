/**
 * Daily darshan & arati schedule. Times follow the standard rhythm at
 * the mandir and shift slightly with the season. The data shape is
 * intentionally CMS-friendly so a future admin panel can replace it
 * without touching components.
 */
export const dailySchedule = [
  {
    id: 'mangal-arati',
    time: '4:30 AM',
    label: 'Mangal Arati',
    note: 'The first offering of the day, before sunrise.',
  },
  {
    id: 'tulsi-arati',
    time: '7:00 AM',
    label: 'Tulsi Arati',
    note: 'Worship of Srimati Tulsi Devi.',
  },
  {
    id: 'bhagavatam',
    time: '8:00 AM',
    label: 'Srimad Bhagavatam Class',
    note: 'Daily scripture study — open to all.',
  },
  {
    id: 'raj-bhoga',
    time: '12:30 PM',
    label: 'Raj Bhoga Arati',
    note: 'Midday offering to the deities.',
  },
  {
    id: 'sandhya',
    time: '6:00 PM',
    label: 'Sandhya Arati',
    note: 'Evening lamp offering with kirtan.',
  },
  {
    id: 'gita',
    time: '7:00 PM',
    label: 'Bhagavad-gita Class',
    note: 'Youth-focused discussion, most evenings.',
  },
];
