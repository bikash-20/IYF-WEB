import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button.jsx';
import { Section, Container } from '@/components/ui/Section.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';

export function NotFoundPage() {
  useMeta({ title: 'Not found — IYF Sylhet', description: 'The page you are looking for does not exist.' });
  return (
    <motion.div {...pageEnter}>
      <Section>
        <Container className="flex min-h-[60vh] flex-col items-start justify-center">
          <div className="eyebrow">404</div>
          <h1 className="mt-3 font-display text-display-lg text-balance">
            The path leads elsewhere.
          </h1>
          <p className="mt-4 max-w-prose text-temple-700/85">
            The page you're looking for isn't here. It may have moved, or it never was. Return to the home page or visit the mandir.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button as="link" to="/">
              Back to Home
            </Button>
            <Button as="link" to="/visit" variant="ghost">
              Visit the Mandir
            </Button>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
