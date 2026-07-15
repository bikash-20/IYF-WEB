import { Section, Container } from '@/components/ui/Section.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';

/**
 * About section. `little-2.jpg` — the soft daylight photo — sits
 * here. Its warm, calm mood pairs with the cream wash on the
 * surrounding section.
 */
export function AboutSection() {
  return (
    <Section variant="warm" id="about">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <RevealOnScroll className="md:col-span-6">
            <figure className="relative">
              <div
                className="absolute -inset-3 -z-10 rounded-xl2 bg-saffron-500/15 blur-2xl"
                aria-hidden
              />
              <img
                src="/little-2.jpg"
                alt="Soft daylight at Sri Sri Radh Madhava Mandir"
                className="aspect-[4/5] w-full rounded-xl2 object-cover shadow-soft"
                loading="lazy"
              />
              <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-eyebrow text-temple-700/70">
                Inside the mandir
              </figcaption>
            </figure>
          </RevealOnScroll>

          <RevealOnScroll className="md:col-span-6" delay={0.1}>
            <div className="eyebrow">About IYF</div>
            <h2 className="mt-3 font-display text-display-md text-balance">
              Youth wing of ISKCON Sylhet
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-temple-700">
              <p>
                The ISKCON Youth Forum gathers young people around the teachings of Srila Prabhupada,
                founder-acharya of the International Society for Krishna Consciousness, at Sri Sri
                Radha Madhava Mandir in Jugaltila, Kajalshah.
              </p>
              <p>
                Through daily devotional practice, scripture classes, and hands-on festival service,
                IYF gives youth in Sylhet a structured, supportive path into Krishna consciousness —
                and a community to walk it with.
              </p>
              <p>
                The deities worshipped at the mandir include Sri Sri Radh Madhava and Sri Sri Gaura
                Nitai, honored each day through arati and offering.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}
