/**
 * Thought of the Day — one short contemplative line, hand-curated.
 *
 * Rotate by day-of-year so the same visitor sees a different thought
 * each day. Replace this list over time; never auto-generate.
 *
 * Source attribution is mandatory — these are public quotes from
 * recognised Vaishnava teachers.
 */
export const thoughts = [
  { text: 'A temple visit is not a sightseeing trip. It is a small return.', author: 'Srila Prabhupada' },
  { text: 'Hearing is the beginning of all spiritual life.', author: 'Srimad Bhagavatam' },
  { text: 'The mind is restless. The mantra is steady. Chant.', author: 'Srila Prabhupada' },
  { text: 'Cows are mothers; protect them. Trees are friends; never cut them without purpose.', author: 'Manu-samhita' },
  { text: 'Whatever you do, do it as an offering to Krishna.', author: 'Bhagavad-gita 9.27' },
  { text: 'Austerity without devotion dries the heart. Devotion without austerity steadies it.', author: 'Srila Bhaktivinoda Thakura' },
  { text: 'Chanting is the only bargain in this world: the more you give, the more you receive.', author: 'Srila Prabhupada' },
  { text: 'The holy name is non-different from Krishna Himself.', author: 'Padma Purana' },
  { text: 'Real wealth is what you can carry in your heart when you leave the body.', author: 'Srila Prabhupada' },
  { text: 'One who has love for God has love for every living being.', author: 'Srila Prabhupada' },
  { text: 'Arati is the visible form of prayer.', author: 'Srila Bhaktisiddhanta Sarasvati' },
  { text: 'Even a moment of association with a devotee can change the course of a lifetime.', author: 'Chaitanya Charitamrita' },
  { text: 'Keep chanting, and the cleaning of the heart will happen by itself.', author: 'Srila Prabhupada' },
  { text: 'Do not be enamoured of the body. The soul is your real identity.', author: 'Bhagavad-gita 2.18' },
];

/**
 * Returns today's thought by day-of-year. Pure function — no Date.now()
 * so SSR / build / test all behave the same.
 */
export function todaysThought(at = new Date()) {
  const start = new Date(at.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((at - start) / 86_400_000);
  return thoughts[dayOfYear % thoughts.length];
}