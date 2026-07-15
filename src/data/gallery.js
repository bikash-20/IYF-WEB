/**
 * Gallery items. Real temple photos sit in the first three slots:
 *   - `little-1.jpg`     — dramatic deity shot (Krishna lamplight)
 *   - `little-2.jpg`     — soft daylight at the mandir
 *   - `radha madhav.jpg` — Sri Sri Radha Madhava on the altar
 *
 * Each annual festival has its own masonry tile below — these remain
 * placeholders until real photography is provided (see docs/PHOTO_BRIEF.md).
 */
export const galleryItems = [
  { id: 'little-1', kind: 'image', src: '/little-1.jpg', alt: 'Lord Krishna in dramatic lamplight', caption: 'LORD KRISHNA', aspect: '4/5' },
  { id: 'little-2', kind: 'image', src: '/little-2.jpg', alt: 'Soft daylight at the mandir', caption: 'Inside the temple', aspect: '4/5' },
  { id: 'radha-madhav', kind: 'image', src: '/radha madhav.jpg', alt: 'Sri Sri Radha Madhava deities on the altar', caption: 'Sri Sri Radha Madhava', aspect: '4/5' },
  { id: 'rathayatra',     kind: 'placeholder', label: 'Rathayatra',            aspect: '4/5' },
  { id: 'prabhupada',     kind: 'placeholder', label: 'Srila Prabhupada Vyasapuja', aspect: '3/4' },
  { id: 'jayapataka',     kind: 'placeholder', label: 'Jayapataka Swami Vyasapuja', aspect: '4/5' },
  { id: 'jhulan-yatra',   kind: 'placeholder', label: 'Jhulan Yatra',          aspect: '1/1' },
  { id: 'damodar-month',  kind: 'placeholder', label: 'Damodar Month',         aspect: '3/4' },
  { id: 'purushottam',    kind: 'placeholder', label: 'Purushottam Month',     aspect: '4/5' },
  { id: 'gita-jayanti',   kind: 'placeholder', label: 'Gita Jayanti',          aspect: '4/3' },
  { id: 'snan-yatra',     kind: 'placeholder', label: 'Snan Yatra',            aspect: '4/5' },
  { id: 'rama-navami',    kind: 'placeholder', label: 'Rama Navami',           aspect: '3/4' },
  { id: 'radha-astami',   kind: 'placeholder', label: 'Radha Astami',          aspect: '4/5' },
  { id: 'pontirtha',      kind: 'placeholder', label: 'Pontirtha Snan Yatra',  aspect: '1/1' },
  { id: 'janmashtami',    kind: 'placeholder', label: 'Janmashtami',           aspect: '4/5' },
  { id: 'kirtan',         kind: 'placeholder', label: 'Youth Kirtan Night',    aspect: '3/4' },
  { id: 'leela-mela',     kind: 'placeholder', label: 'Krishna Leela Mela — stage', aspect: '4/3' },
  { id: 'prasadam',       kind: 'placeholder', label: 'Prasadam service',      aspect: '1/1' },
  { id: 'be-smart',       kind: 'placeholder', label: 'Be SMART course batch', aspect: '4/5' },
  { id: 'sandhya-arati',  kind: 'placeholder', label: 'Sandhya Arati',         aspect: '3/4' },
];
