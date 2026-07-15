import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Youtube, Facebook, MessageCircle } from 'lucide-react';
import { site } from '@/lib/site.js';
import { easeDivine } from '@/lib/motion.js';
import { MadeByBikash } from '@/components/ui/MadeByBikash.jsx';
import { Mantra } from '@/components/ui/Mantra.jsx';

const groups = [
  {
    heading: 'Visit',
    links: [
      { label: 'About the mandir', to: '/about' },
      { label: 'Daily schedule', to: '/schedule' },
      { label: 'Find us', to: '/visit' },
    ],
  },
  {
    heading: 'Engage',
    links: [
      { label: 'Courses', to: '/courses' },
      { label: 'Events', to: '/events' },
      { label: 'Gallery', to: '/gallery' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Donate', to: '/donate' },
      { label: 'Volunteer', to: '/contact' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

const social = [
  { icon: Youtube, label: 'YouTube', href: site.contacts.youtube },
  { icon: Facebook, label: 'Facebook', href: site.contacts.facebook },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: site.contacts.whatsapp,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeDivine },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
      className="relative overflow-hidden border-t border-temple-800/10 bg-ink-900 text-cream-100 dark:border-white/8"
    >
      {/* Corner glow — saffron halo behind the footer in light mode;
          in dark mode the `.dark .lamp-ambient` overlay adds a second
          radial on the upper-right so the footer feels like it's lit
          by oil lamps at the edge of the temple. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-saffron-500/10 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="lamp-ambient-br absolute inset-0 opacity-0 transition-opacity duration-700 ease-divine dark:opacity-100"
      />

      {/* Mantra inscription — v0.7.3. Lives here (and on About) so
          every page closes with the mahā-mantra without needing a
          global ticker under the navbar. Single hairline above and
          below frames it on the dark footer without giving it a
          visible box. */}
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cream-100/8"
        />
        <Mantra tone="deep" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-cream-100/8"
        />
      </div>

      <div className="container relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <motion.div variants={fadeUp} className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-saffron-500/15 ring-1 ring-saffron-500/25">
                <span className="h-2 w-2 rounded-full bg-saffron-500 animate-glow" />
              </span>
              <span className="font-display text-lg">{site.short}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/70">
              {site.legalName}, {site.address.line1}, {site.address.city} — the
              youth wing of ISKCON Sylhet, gathering young devotees around
              scripture, kirtan, and festival life.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-cream-100/80">
              <li className="group/row flex items-center gap-2 transition-colors duration-300 hover:text-saffron-400 motion-reduce:transition-none">
                <Phone size={14} className="text-saffron-400" />
                <a
                  href={`tel:${site.contacts.phone}`}
                  className="transition-transform duration-300 ease-divine group-hover/row:translate-x-0.5 motion-reduce:transition-none"
                >
                  {site.contacts.phoneDisplay}
                </a>
              </li>
              <li className="group/row flex items-center gap-2 transition-colors duration-300 hover:text-saffron-400 motion-reduce:transition-none">
                <Mail size={14} className="text-saffron-400" />
                <a
                  href={`mailto:${site.contacts.email}`}
                  className="transition-transform duration-300 ease-divine group-hover/row:translate-x-0.5 motion-reduce:transition-none"
                >
                  {site.contacts.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-saffron-400" />
                <span>
                  {site.address.landmark}, {site.address.line1}
                </span>
              </li>
            </ul>

            <div className="mt-7 flex items-center gap-2">
              {social.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-cream-100/15 text-cream-100/80 transition-colors duration-300 hover:border-saffron-500/60 hover:bg-saffron-500/10 hover:text-saffron-400 motion-reduce:transition-none"
                >
                  <Icon size={15} aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {groups.map((g) => (
            <motion.div
              key={g.heading}
              variants={fadeUp}
              className="md:col-span-2"
            >
              <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-400">
                {g.heading}
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="group/link inline-flex items-center text-cream-100/80 transition-all duration-300 hover:text-saffron-400 motion-reduce:transition-none"
                    >
                      <span className="relative">
                        {l.label}
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-saffron-400 transition-transform duration-500 ease-divine group-hover/link:scale-x-100 motion-reduce:transition-none"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream-100/10 pt-6 text-xs text-cream-100/60 md:flex-row md:items-center"
        >
          <p>Hare Krishna 🙏 — {site.name}</p>
          <MadeByBikash />
        </motion.div>
      </div>
    </motion.footer>
  );
}
