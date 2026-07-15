import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero.jsx';
import { Section, Container } from '@/components/ui/Section.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';
import { Phone, MessageCircle, Mail, Facebook } from 'lucide-react';

function Field({ label, id, type = 'text', placeholder, as = 'input', rows = 4, options }) {
  const Tag = as;
  return (
    <label htmlFor={id} className="block">
      <span className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-600">
        {label}
      </span>
      <div className="mt-2">
        {as === 'textarea' ? (
          <textarea
            id={id}
            name={id}
            rows={rows}
            placeholder={placeholder}
            className="w-full resize-none rounded-xl border border-temple-800/15 bg-cream-50 px-4 py-3 text-sm text-temple-800 placeholder:text-temple-700/40 focus:border-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500/30"
          />
        ) : as === 'select' ? (
          <select
            id={id}
            name={id}
            className="w-full rounded-xl border border-temple-800/15 bg-cream-50 px-4 py-3 text-sm text-temple-800 focus:border-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500/30"
          >
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            className="w-full rounded-xl border border-temple-800/15 bg-cream-50 px-4 py-3 text-sm text-temple-800 placeholder:text-temple-700/40 focus:border-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500/30"
          />
        )}
      </div>
    </label>
  );
}

export function ContactPage() {
  useMeta({
    title: `Contact & Volunteer — ${site.name}`,
    description: 'Reach the IYF team, sign up to volunteer, or ask about the Be SMART course.',
  });

  return (
    <motion.div {...pageEnter}>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Reach out"
        title="Contact & Volunteer"
        description="Questions about programmes, the Be SMART course, or want to help run the next festival — start here."
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-xl2 border border-temple-800/10 bg-cream-100/60 p-7"
            >
              <h3 className="font-display text-2xl text-temple-800">General Inquiry</h3>
              <div className="mt-6 space-y-4">
                <Field id="name" label="Name" placeholder="Your name" />
                <Field id="phone" label="Phone or WhatsApp" type="tel" placeholder="01XXX-XXXXXX" />
                <Field id="email" label="Email" type="email" placeholder="you@example.com" />
                <Field id="msg" label="Message" as="textarea" placeholder="How can we help?" />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-saffron-500 px-6 py-3 text-sm font-medium uppercase tracking-eyebrow text-cream-50 transition-colors hover:bg-saffron-600"
              >
                Send Message
              </button>
            </form>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-xl2 border border-temple-800/10 bg-cream-100/60 p-7"
            >
              <h3 className="font-display text-2xl text-temple-800">Volunteer Sign-up</h3>
              <div className="mt-6 space-y-4">
                <Field id="vname" label="Name" placeholder="Your name" />
                <Field id="vphone" label="Phone or WhatsApp" type="tel" placeholder="01XXX-XXXXXX" />
                <Field
                  id="varea"
                  label="Where you'd like to help"
                  as="select"
                  options={[
                    'Festival & event support',
                    'Kitchen / prasadam',
                    'Kirtan & stage',
                    'Course teaching assistant',
                    'Media & photography',
                  ]}
                />
                <Field id="vavail" label="Availability" placeholder="e.g. weekends, evenings" />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-saffron-500 px-6 py-3 text-sm font-medium uppercase tracking-eyebrow text-cream-50 transition-colors hover:bg-saffron-600"
              >
                Sign Up to Volunteer
              </button>
            </form>
          </div>
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <div className="eyebrow">Direct lines</div>
          <h2 className="mt-3 max-w-xl font-display text-display-md">Or reach us directly</h2>

          <ul className="mt-8 max-w-2xl divide-y divide-temple-800/10 rounded-xl2 border border-temple-800/10 bg-cream-50">
            <Row icon={<Phone size={14} />} k="Phone" v={site.contacts.phoneDisplay} href={`tel:${site.contacts.phone}`} />
            <Row
              icon={<MessageCircle size={14} />}
              k="WhatsApp"
              v="+880 1714-101688"
              href={site.contacts.whatsapp}
            />
            <Row
              icon={<Phone size={14} />}
              k="Alt. Number"
              v={site.contacts.altPhoneDisplay}
              href={`tel:${site.contacts.altPhone}`}
            />
            <Row
              icon={<Mail size={14} />}
              k="Email"
              v={site.contacts.email}
              href={`mailto:${site.contacts.email}`}
            />
            <Row
              icon={<Facebook size={14} />}
              k="Messenger"
              v="Iskcon Youth Forum, Sylhet"
              href={site.contacts.facebook}
            />
          </ul>
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
