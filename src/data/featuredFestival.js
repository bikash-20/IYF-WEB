/**
 * Featured festival — drives the FestivalCountdown component.
 *
 * Single source of truth. To feature a different festival, change
 * this object — the component reads from it and never invents data.
 * In V2 this becomes an API call returning the same shape.
 *
 * `date` is an ISO date string in the temple's local timezone (BDT, UTC+6).
 */
export const featuredFestival = {
  title: 'Janmashtami',
  subtitle: 'Appearance day of Sri Krishna',
  date: '2026-09-04',
  href: '/events',
  blurb:
    'A full day and night of kirtan, abhishek, and midnight arati. Prasadam is served throughout.',
};