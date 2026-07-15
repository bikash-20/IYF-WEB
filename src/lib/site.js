/**
 * Site-wide constants. Treat this as the single source of truth for
 * the temple's public contact details, social links, and brand voice.
 * When a real CMS arrives, these become API calls — the consuming
 * components won't have to change.
 */
export const site = {
  name: 'ISKCON Youth Forum, Sylhet',
  short: 'IYF · Sylhet',
  legalName: 'Sri Sri Radha Madhava Mandir',
  tagline: 'A home for young devotees at the heart of Sylhet.',
  description:
    'ISKCON Youth Forum, Sylhet — Sri Sri Radh Madhava Mandir, Jugaltila, Kajalshah. Daily darshan, festivals, the Be SMART course, and youth community at the heart of Sylhet.',
  address: {
    line1: 'Jugaltila, Kajalshah',
    line2: 'Medical College Road',
    landmark: 'Opposite Osmani Medical College, Gate No. 1',
    city: 'Sylhet',
    postal: '3140',
    country: 'Bangladesh',
  },
  contacts: {
    phone: '+8801714101688',
    phoneDisplay: '01714-101688',
    altPhone: '+8801718781144',
    altPhoneDisplay: '01718-781144',
    whatsapp: 'https://wa.me/8801714101688',
    email: 'syl.gtv@gmail.com',
    facebook: 'https://www.facebook.com/iyfsyl/',
    youtube: 'https://www.youtube.com/@GauradeshTV',
  },
  social: [
    { name: 'YouTube', href: 'https://www.youtube.com/@GauradeshTV' },
    { name: 'Facebook', href: 'https://www.facebook.com/iyfsyl/' },
    { name: 'WhatsApp', href: 'https://wa.me/8801714101688' },
  ],
  nav: [
    { label: 'About', to: '/about' },
    { label: 'Schedule', to: '/schedule' },
    { label: 'Events', to: '/events' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Courses', to: '/courses' },
    { label: 'Visit', to: '/visit' },
  ],
};
