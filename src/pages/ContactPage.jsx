import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  Mail,
  Facebook,
  Sparkles,
  Clock,
  Languages,
  ShieldCheck,
  ChevronDown,
  User,
  Heart,
} from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero.jsx';
import { Section, Container } from '@/components/ui/Section.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { AnimatedInput } from '@/components/ui/AnimatedInput.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';
import { ChapterArrival } from '@/components/ui/ChapterArrival.jsx';
import { FloatingPetals } from '@/components/ui/FloatingPetals.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';

/* --- validators ------------------------------------------------------------------- */

const phoneRe = /^(?:\+?88)?01[3-9]\d{8}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validators = {
  phone: (v) => phoneRe.test(v.replace(/[\s-]/g, '')),
  email: (v) => emailRe.test(v),
};

/* --- trust strip ----------------------------------------------------------------- */

const trust = [
  { icon: Clock, k: 'Quick reply', v: 'Within a day, often faster.' },
  { icon: Languages, k: 'Bangla & English', v: 'Write in whichever feels lighter.' },
  { icon: ShieldCheck, k: 'Private to the team', v: 'Only the IYF secretary sees it.' },
];

/* --- FAQ ------------------------------------------------------------------------- */

const faqs = [
  {
    q: 'Can I visit during a festival if I am not initiated?',
    a: 'Yes. The temple is open to all visitors. Just remove your shoes at the entrance, dress modestly, and silence your phone. Cameras are welcome in the outer hall, not the inner sanctum.',
  },
  {
    q: 'Is prasadam really free? Do I need a ticket?',
    a: 'Prasadam is always free — vegetarian offerings sanctified and served to all who attend the Sunday feast. There is no ticket. Simply bring a plate if you have one, and an open heart.',
  },
  {
    q: 'I am not a student — am I too old for the Be SMART course?',
    a: 'The course was named for students, but the four principles (Spirituality, Morality, Austerity, Responsibility, Truth) live at any age. We have had participants from 14 to 60.',
  },
  {
    q: 'How do I become a regular volunteer?',
    a: 'Start with one festival, see how it fits. After that we orient you into one of the seven seva teams — kitchen, kirtan, decor, deity care, prasadam distribution, teaching, or media.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-temple-800/10 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 px-1 py-5 text-left outline-none transition-colors duration-300 ease-divine hover:text-saffron-600 motion-reduce:transition-none"
      >
        <span className="font-display text-lg text-temple-800">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-temple-800/15 text-saffron-600"
          aria-hidden="true"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-1 pb-5 text-sm leading-relaxed text-temple-700/85">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* --- direct-line row (with hover arrow nudge) ------------------------------------ */

function DirectRow({ icon: Icon, k, v, href }) {
  const isExternal = href?.startsWith('http');
  const inner = (
    <>
      <span className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700">
        <Icon size={14} aria-hidden="true" /> {k}
      </span>
      <span className="flex items-center gap-2 text-sm text-temple-800">
        <span className="transition-colors duration-300 ease-divine group-hover/row:text-saffron-700">
          {v}
        </span>
        <span aria-hidden="true" className="row-arrow text-saffron-500">
          →
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <li className="group/row row-tint flex items-center justify-between gap-4 border-b border-temple-800/10 px-5 py-4 last:border-0">
        {inner}
      </li>
    );
  }
  return (
    <li className="group/row row-tint border-b border-temple-800/10 last:border-0">
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="flex items-center justify-between gap-4 px-5 py-4 outline-none"
      >
        {inner}
      </a>
    </li>
  );
}

/* --- form card shell ------------------------------------------------------------- */

function FormCard({ title, eyebrow, icon: Icon, children, successText }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className="group relative overflow-hidden rounded-xl2 border border-temple-800/10 bg-cream-100/70 p-7 shadow-soft transition-[box-shadow,border-color,background-color] duration-500 ease-divine hover:border-saffron-500/40 hover:shadow-temple motion-reduce:transition-none md:p-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-[radial-gradient(120%_80%_at_0%_100%,rgba(217,138,43,0.16),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
      />
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron-500/10 text-saffron-600 ring-1 ring-saffron-500/15">
          <Icon size={18} aria-hidden="true" />
        </span>
        <div>
          <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700">
            {eyebrow}
          </div>
          <h3 className="mt-0.5 font-display text-2xl text-temple-800 md:text-[1.65rem]">
            {title}
          </h3>
        </div>
      </div>
      <div className="mt-6">{children}</div>
      {successText && (
        <p className="mt-4 text-xs italic text-peacock-700">{successText}</p>
      )}
    </motion.div>
  );
}

/* --- page ------------------------------------------------------------------------ */

export function ContactPage() {
  useMeta({
    title: `Contact & Volunteer — ${site.name}`,
    description:
      'Reach the IYF team, sign up to volunteer, or ask about the Be SMART course at Sri Sri Radha Madhava Mandir, Jugaltila.',
  });

  const [generalState, setGeneralState] = useState({ status: 'idle', message: '' });
  const [volunteerState, setVolunteerState] = useState({ status: 'idle', message: '' });
  const [petals, setPetals] = useState({ active: false, key: 0 });

  function submitInquiry(e, set) {
    e.preventDefault();
    set({ status: 'submitting', message: '' });
    // simulate a network call — the real endpoint plugs in here
    setTimeout(() => {
      set({
        status: 'success',
        message: 'Thank you — the IYF secretary will reply within a day.',
      });
      setPetals({ active: true, key: Date.now() });
      setTimeout(() => setPetals((p) => ({ ...p, active: false })), 2400);
    }, 1100);
  }

  return (
    <motion.div {...pageEnter}>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Reach out"
        title="Contact & Volunteer"
        description="Questions about programmes, the Be SMART course, or wanting to help run the next festival — start here."
      />

      {/* --- trust strip --------------------------------------------------------- */}
      <Section pad="tight">
        <Container>
          <ChapterArrival className="mb-8">
            <h2 className="font-display text-2xl text-temple-800 dark:text-fg-main md:text-3xl">
              Three small reassurances before you write.
            </h2>
          </ChapterArrival>
          <RevealStagger
            className="grid gap-4 md:grid-cols-3"
            delay={0.07}
            as="ul"
          >
            {trust.map((t) => (
              <li
                key={t.k}
                className="flex items-start gap-3 rounded-xl2 border border-temple-800/10 bg-cream-50 p-5 dark:border-white/8 dark:bg-ink-floating/80"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-peacock-500/10 text-peacock-600 ring-1 ring-peacock-500/15">
                  <t.icon size={16} aria-hidden="true" />
                </span>
                <div>
                  <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700">
                    {t.k}
                  </div>
                  <p className="mt-1 text-sm text-temple-700/90">{t.v}</p>
                </div>
              </li>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* --- forms --------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 md:gap-7">
            <RevealOnScroll>
              <FormCard
                title="General Inquiry"
                eyebrow="Ask anything"
                icon={MessageCircle}
                successText={generalState.message}
              >
                <AnimatePresence mode="wait">
                  {generalState.status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl border border-peacock-500/30 bg-peacock-500/5 p-6 text-center"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-peacock-500/15 text-peacock-600">
                        <Sparkles size={20} aria-hidden="true" />
                      </span>
                      <p className="mt-3 font-display text-lg text-temple-800">
                        Your note is on its way.
                      </p>
                      <p className="mt-1 text-sm text-temple-700/80">
                        Look out for a reply from the IYF secretary within a day.
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setGeneralState({ status: 'idle', message: '' })
                        }
                        className="mt-4 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700 underline-offset-4 hover:underline"
                      >
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={(e) => submitInquiry(e, setGeneralState)}
                      noValidate
                      className="space-y-4"
                    >
                      <AnimatedInput
                        id="g-name"
                        label="Your name"
                        placeholder="Ananya Roy"
                        leadingIcon={User}
                        autoComplete="name"
                        required
                      />
                      <AnimatedInput
                        id="g-phone"
                        label="Phone or WhatsApp"
                        type="tel"
                        placeholder="01714-XXXXXX"
                        leadingIcon={Phone}
                        autoComplete="tel"
                        validator={validators.phone}
                        required
                      />
                      <AnimatedInput
                        id="g-email"
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        leadingIcon={Mail}
                        autoComplete="email"
                        validator={validators.email}
                      />
                      <AnimatedInput
                        id="g-msg"
                        label="How can we help?"
                        as="textarea"
                        rows={4}
                        placeholder="Tell us a little about your question or interest."
                        required
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        aria-busy={generalState.status === 'submitting'}
                      >
                        {generalState.status === 'submitting'
                          ? 'Sending…'
                          : 'Send Message'}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </FormCard>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <FormCard
                title="Volunteer Sign-up"
                eyebrow="Lend a hand"
                icon={Heart}
                successText={volunteerState.message}
              >
                <AnimatePresence mode="wait">
                  {volunteerState.status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl border border-peacock-500/30 bg-peacock-500/5 p-6 text-center"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-peacock-500/15 text-peacock-600">
                        <Sparkles size={20} aria-hidden="true" />
                      </span>
                      <p className="mt-3 font-display text-lg text-temple-800">
                        Welcome to the seva team.
                      </p>
                      <p className="mt-1 text-sm text-temple-700/80">
                        We will reach out within a week with the next festival brief.
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setVolunteerState({ status: 'idle', message: '' })
                        }
                        className="mt-4 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700 underline-offset-4 hover:underline"
                      >
                        Sign up another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={(e) => submitInquiry(e, setVolunteerState)}
                      noValidate
                      className="space-y-4"
                    >
                      <AnimatedInput
                        id="v-name"
                        label="Your name"
                        placeholder="Ananya Roy"
                        leadingIcon={User}
                        autoComplete="name"
                        required
                      />
                      <AnimatedInput
                        id="v-phone"
                        label="Phone or WhatsApp"
                        type="tel"
                        placeholder="01714-XXXXXX"
                        leadingIcon={Phone}
                        autoComplete="tel"
                        validator={validators.phone}
                        required
                      />
                      <AnimatedInput
                        id="v-area"
                        label="Where you'd like to help"
                        as="select"
                        placeholder="Choose an area"
                        options={[
                          'Festival & event support',
                          'Kitchen / prasadam',
                          'Kirtan & stage',
                          'Course teaching assistant',
                          'Media & photography',
                        ]}
                        required
                      />
                      <AnimatedInput
                        id="v-avail"
                        label="Availability"
                        placeholder="e.g. weekends, evenings"
                        required
                      />
                      <Button
                        type="submit"
                        size="lg"
                        variant="dark"
                        className="w-full"
                        aria-busy={volunteerState.status === 'submitting'}
                      >
                        {volunteerState.status === 'submitting'
                          ? 'Signing up…'
                          : 'Sign Up to Volunteer'}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </FormCard>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* --- direct lines -------------------------------------------------------- */}
      <Section variant="muted">
        <Container>
          <ChapterArrival className="mb-8">
            <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700">
              Direct lines
            </div>
            <h2 className="mt-3 max-w-xl font-display text-display-md text-temple-800">
              Or reach us directly
            </h2>
            <p className="mt-2 max-w-md text-sm text-temple-700/80">
              One of these will land in front of a human within minutes.
            </p>
          </ChapterArrival>
          <ul className="mt-8 max-w-2xl overflow-hidden rounded-xl2 border border-temple-800/10 bg-cream-50 shadow-soft dark:border-white/8 dark:bg-ink-floating/85 dark:shadow-lift">
            <DirectRow
              icon={Phone}
              k="Phone"
              v={site.contacts.phoneDisplay}
              href={`tel:${site.contacts.phone}`}
            />
            <DirectRow
              icon={MessageCircle}
              k="WhatsApp"
              v="+880 1714-101688"
              href={site.contacts.whatsapp}
            />
            <DirectRow
              icon={Phone}
              k="Alt. Number"
              v={site.contacts.altPhoneDisplay}
              href={`tel:${site.contacts.altPhone}`}
            />
            <DirectRow
              icon={Mail}
              k="Email"
              v={site.contacts.email}
              href={`mailto:${site.contacts.email}`}
            />
            <DirectRow
              icon={Facebook}
              k="Messenger"
              v="Iskcon Youth Forum, Sylhet"
              href={site.contacts.facebook}
            />
          </ul>
        </Container>
      </Section>

      {/* --- faq ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <ChapterArrival className="md:col-span-4">
              <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700">
                Frequently asked
              </div>
              <h2 className="mt-3 font-display text-display-md text-temple-800">
                Before you write
              </h2>
              <p className="mt-3 text-sm text-temple-700/85">
                A few of the questions we hear most often at the temple office.
                If yours is not here, the form above will land directly with
                the IYF secretary.
              </p>
            </ChapterArrival>
            <RevealOnScroll delay={0.08} className="md:col-span-8">
              <ul className="rounded-xl2 border border-temple-800/10 bg-cream-100/60 px-6">
                {faqs.map((f) => (
                  <FAQItem key={f.q} q={f.q} a={f.a} />
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <FloatingPetals key={petals.key} trigger={petals.active} />
    </motion.div>
  );
}
