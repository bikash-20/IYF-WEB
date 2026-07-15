import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero.jsx';
import { Section, Container } from '@/components/ui/Section.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';
import { Phone, MessageCircle, Mail, Facebook, MapPin, Clock } from 'lucide-react';

export function VisitPage() {
  useMeta({
    title: `Visit — ${site.name}`,
    description: `Visit ${site.legalName} at Jugaltila, Kajalshah, Sylhet.`,
  });

  return (
    <motion.div {...pageEnter}>
      <PageHero
        breadcrumb="Visit"
        eyebrow="Find us"
        title="Visit the mandir"
        description={`${site.legalName}, ${site.address.line1}, ${site.address.line2} — ${site.address.landmark}, ${site.address.city} ${site.address.postal}.`}
      />

      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="relative h-[420px] overflow-hidden rounded-xl2 border border-temple-800/10 bg-cream-200/50">
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    background:
                      'radial-gradient(60% 60% at 30% 40%, rgba(27,94,122,0.18) 0%, rgba(27,94,122,0) 60%), radial-gradient(60% 60% at 70% 60%, rgba(217,138,43,0.20) 0%, rgba(217,138,43,0) 60%)',
                  }}
                  aria-hidden
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="relative mx-auto h-4 w-4">
                    <div className="absolute -inset-3 animate-glow rounded-full bg-saffron-500/40 blur-md" aria-hidden />
                    <div className="relative h-4 w-4 rounded-full bg-saffron-500 ring-4 ring-cream-50" />
                  </div>
                  <span className="mt-3 block max-w-xs font-mono text-[0.7rem] uppercase tracking-eyebrow text-temple-800">
                    Jugaltila, Kajalshah · opposite Osmani Medical College, Gate No. 1
                  </span>
                </div>
                <a
                  href="https://maps.google.com/?q=Jugaltila+Kajalshah+Sylhet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 rounded-full border border-temple-800/20 bg-cream-50/80 px-4 py-1.5 text-xs uppercase tracking-eyebrow text-temple-800 backdrop-blur hover:border-saffron-500 hover:text-saffron-600"
                >
                  Open in Maps
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <ul className="divide-y divide-temple-800/10 rounded-xl2 border border-temple-800/10 bg-cream-50">
                <Row icon={<Phone size={14} />} k="Phone" v={site.contacts.phoneDisplay} href={`tel:${site.contacts.phone}`} />
                <Row icon={<MessageCircle size={14} />} k="WhatsApp" v="+880 1714-101688" href={site.contacts.whatsapp} />
                <Row icon={<Phone size={14} />} k="Alt. Number" v={site.contacts.altPhoneDisplay} href={`tel:${site.contacts.altPhone}`} />
                <Row icon={<Mail size={14} />} k="Email" v={site.contacts.email} href={`mailto:${site.contacts.email}`} />
                <Row icon={<Facebook size={14} />} k="Messenger" v="Iskcon Youth Forum, Sylhet" href={site.contacts.facebook} />
              </ul>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl2 border border-temple-800/10 bg-cream-50 p-5">
                  <MapPin size={16} className="text-saffron-600" />
                  <div className="mt-3 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-600">
                    Address
                  </div>
                  <p className="mt-1 text-sm text-temple-700/85">
                    {site.address.line1}, {site.address.line2}, {site.address.city} {site.address.postal}
                  </p>
                </div>
                <div className="rounded-xl2 border border-temple-800/10 bg-cream-50 p-5">
                  <Clock size={16} className="text-saffron-600" />
                  <div className="mt-3 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-600">
                    Temple hours
                  </div>
                  <p className="mt-1 text-sm text-temple-700/85">
                    4:30 AM — 9:00 PM, every day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}

function Row({ icon, k, v, href }) {
  return (
    <li className="flex items-center justify-between gap-4 px-5 py-4">
      <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-600">
        {icon} {k}
      </span>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="text-sm text-temple-800 hover:text-saffron-600"
        >
          {v}
        </a>
      ) : (
        <span className="text-sm text-temple-800">{v}</span>
      )}
    </li>
  );
}
