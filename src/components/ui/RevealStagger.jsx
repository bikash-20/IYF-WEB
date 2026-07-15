import { Children, cloneElement, isValidElement } from 'react';
import { motion } from 'framer-motion';
import { stagger, fadeUp } from '@/lib/motion.js';
import { cn } from '@/lib/cn.js';

/**
 * RevealStagger — sweeps its children in one after another when the
 * viewport reaches them. Each child should already be a node (ideally
 * a `motion.*`); we inject `variants={fadeUp}` so the parent's
 * stagger variant triggers each child's `hidden` → `visible`
 * transition in turn.
 *
 * Pass `wrapClassName` to control how the parent is laid out.
 */
export function RevealStagger({
  children,
  delay = 0.08,
  as = 'div',
  className,
  viewportMargin = '-80px',
  once = true,
}) {
  const Parent = motion[as] || motion.div;
  return (
    <Parent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      variants={stagger(delay)}
      className={className}
    >
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        // If child has its own variants (e.g. a stronger fadeUpSm on the
        // schedule timeline), respect them; otherwise inject our default.
        const childVariants = child.props.variants || fadeUp;
        return cloneElement(child, {
          key: child.key ?? i,
          variants: childVariants,
        });
      })}
    </Parent>
  );
}
