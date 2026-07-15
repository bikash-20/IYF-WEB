import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { site } from '@/lib/site.js';

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

export function Footer() {
  return (
    <footer className="border-t border-temple-800/10 bg-ink-900 text-cream-100">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-saffron-500" />
              <span className="font-display text-lg">{site.short}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/70">
              {site.legalName}, {site.address.line1}, {site.address.city} — the youth wing of
              ISKCON Sylhet, gathering young devotees around scripture, kirtan, and festival life.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-cream-100/80">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-saffron-400" />
                <a href={`tel:${site.contacts.phone}`} className="hover:text-saffron-400">
                  {site.contacts.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-saffron-400" />
                <a href={`mailto:${site.contacts.email}`} className="hover:text-saffron-400">
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
          </div>

          {groups.map((g) => (
            <div key={g.heading} className="md:col-span-2">
              <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-400">
                {g.heading}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-cream-100/80 transition-colors hover:text-saffron-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream-100/10 pt-6 text-xs text-cream-100/60 md:flex-row md:items-center">
          <p>Hare Krishna 🙏 — {site.name}</p>
          <p className="font-mono uppercase tracking-eyebrow">UI concept · v0.1</p>
        </div>
      </div>
    </footer>
  );
}
