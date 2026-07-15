import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';
import { site } from '@/lib/site.js';
import { Phone, MessageCircle, Mail, Facebook } from 'lucide-react';

export function VisitSection() {
  return (
    <Section id="visit">
      <Container>
        <SectionHeading
          eyebrow="Find us"
          title="Visit the Mandir"
          lede={`${site.legalName}, ${site.address.line1}, ${site.address.line2} — ${site.address.landmark}, ${site.address.city} ${site.address.postal}.`}
        />

        <div className="grid gap-5 md:grid-cols-12">
          <RevealOnScroll className="md:col-span-7">
            <div className="relative h-80 overflow-hidden rounded-xl2 border border-temple-800/10 bg-cream-200/50 md:h-full">
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    'radial-gradient(60% 60% at 30% 40%, rgba(27,94,122,0.15) 0%, rgba(27,94,122,0) 60%), radial-gradient(60% 60% at 70% 60%, rgba(217,138,43,0.18) 0%, rgba(217,138,43,0) 60%)',
                }}
                aria-hidden
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <div className="relative">
                    <div className="absolute -inset-3 animate-glow rounded-full bg-saffron-500/40 blur-md" aria-hidden />
                    <div className="relative h-4 w-4 rounded-full bg-saffron-500 ring-4 ring-cream-50" />
                  </div>
                  <span className="mt-2 max-w-xs font-mono text-[0.7rem] uppercase tracking-eyebrow text-temple-800">
                    Jugaltila, Kajalshah · opposite Osmani Medical College, Gate No. 1
                  </span>
                </div>
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
          </RevealOnScroll>

          <RevealOnScroll className="md:col-span-5" delay={0.1}>
            <ul className="divide-y divide-temple-800/10 rounded-xl2 border border-temple-800/10 bg-cream-50">
              <ContactRow icon={<Phone size={14} />} k="Phone" v={site.contacts.phoneDisplay} href={`tel:${site.contacts.phone}`} />
              <ContactRow
                icon={<MessageCircle size={14} />}
                k="WhatsApp"
                v="+880 1714-101688"
                href={site.contacts.whatsapp}
              />
              <ContactRow
                icon={<Phone size={14} />}
                k="Alt. Number"
                v={site.contacts.altPhoneDisplay}
                href={`tel:${site.contacts.altPhone}`}
              />
              <ContactRow
                icon={<Mail size={14} />}
                k="Email"
                v={site.contacts.email}
                href={`mailto:${site.contacts.email}`}
              />
              <ContactRow
                icon={<Facebook size={14} />}
                k="Messenger"
                v="Iskcon Youth Forum, Sylhet"
                href={site.contacts.facebook}
              />
            </ul>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}

function ContactRow({ icon, k, v, href }) {
  return (
    <li className="flex items-center justify-between gap-4 px-5 py-4">
      <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-600">
        {icon} {k}
      </span>
      {href ? (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-temple-800 hover:text-saffron-600">
          {v}
        </a>
      ) : (
        <span className="text-sm text-temple-800">{v}</span>
      )}
    </li>
  );
}
