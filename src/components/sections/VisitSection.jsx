import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { Reveal } from '@/components/ui/Reveal.jsx';
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
          <Reveal className="md:col-span-7">
            <div className="relative h-80 overflow-hidden rounded-xl2 border border-temple-800/10 bg-cream-200/50 dark:border-white/8 dark:bg-ink-section-2 md:h-full">
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    'radial-gradient(60% 60% at 30% 40%, color-mix(in srgb, var(--peacock-500) 15%, transparent) 0%, transparent 60%), radial-gradient(60% 60% at 70% 60%, color-mix(in srgb, var(--saffron-500) 18%, transparent) 0%, transparent 60%)',
                }}
                aria-hidden
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <div className="relative">
                    <div className="absolute -inset-3 animate-glow rounded-full bg-saffron-500/40 blur-md dark:bg-saffron-400/55" aria-hidden />
                    <div className="relative h-4 w-4 rounded-full bg-saffron-500 ring-4 ring-cream-50 dark:bg-saffron-400 dark:ring-ink-page" />
                  </div>
                  <span className="mt-2 max-w-xs font-mono text-[0.7rem] uppercase tracking-eyebrow text-temple-800 dark:text-fg-body">
                    Jugaltila, Kajalshah · opposite Osmani Medical College, Gate No. 1
                  </span>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Jugaltila+Kajalshah+Sylhet"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-solid absolute bottom-4 right-4 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
              >
                Open in Maps →
              </a>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.1}>
            <ul className="divide-y divide-temple-800/10 overflow-hidden rounded-xl2 border border-temple-800/10 bg-cream-50 dark:divide-white/8 dark:border-white/8 dark:bg-ink-floating/85">
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
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function ContactRow({ icon, k, v, href }) {
  const isExternal = href?.startsWith('http');
  const content = (
    <span className="flex items-center gap-2">
      <span className="transition-colors duration-300 group-hover/row:text-saffron-700 dark:text-fg-main dark:group-hover/row:text-saffron-400">
        {v}
      </span>
      <span aria-hidden="true" className="row-arrow text-saffron-500">
        →
      </span>
    </span>
  );
  return (
    <li className="group/row row-tint border-b border-temple-800/10 last:border-0 dark:border-white/8">
      {href ? (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="flex items-center justify-between gap-4 px-5 py-4 outline-none"
        >
          <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft">
            {icon} {k}
          </span>
          {content}
        </a>
      ) : (
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft">
            {icon} {k}
          </span>
          {content}
        </div>
      )}
    </li>
  );
}
