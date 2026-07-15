import { Children, isValidElement } from 'react';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';
import { Reveal } from '@/components/ui/Reveal.jsx';
import { cn } from '@/lib/cn.js';

/**
 * RevealStagger — sweeps its children in one after another when the
 * viewport reaches them. Each child is wrapped in a Reveal with a
 * cascading `delay` prop so the children fade up in sequence.
 *
 * v0.8.1: replaced the Framer Motion variants-based stagger with the
 * CSS-driven reveal system (RevealOnScroll + Reveal with inline
 * delays) to be robust against theme toggle re-renders. Existing
 * consumers (e.g. ContactPage) continue to work as a drop-in
 * replacement.
 */
export function RevealStagger({
  children,
  delay = 0.08,
  as = 'div',
  className,
}) {
  return (
    <RevealOnScroll as={as} className={cn(className)}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        // Wrap each child in Reveal with an index-based delay for the
        // cascade. Preserve the child's own className and key.
        return (
          <Reveal
            key={child.key ?? i}
            delay={i * delay}
            className={child.props.className}
          >
            {child.props.children ?? child}
          </Reveal>
        );
      })}
    </RevealOnScroll>
  );
}
