import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn.js';

/**
 * AnimatedInput — a saffron-accented input that lifts a label-like
 * eyebrow on focus/filled, validates inline, and shows a discreet
 * check when the field passes an optional validator.
 *
 * Designed to drop-in for the ContactPage forms. Pure CSS-animated,
 * no Framer on every keystroke.
 */
export function AnimatedInput({
  id: idProp,
  label,
  type = 'text',
  placeholder,
  as = 'input',
  rows = 4,
  options,
  value: valueProp,
  onChange,
  required,
  validator,
  leadingIcon: LeadingIcon,
  className,
  inputClassName,
  autoComplete,
  name,
}) {
  const reactId = useId();
  const id = idProp || reactId;
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(valueProp ?? '');
  const current = valueProp ?? value;
  const isFilled = Boolean(current && current.length > 0);
  const valid = !validator || validator(current);
  const showCheck = touched && isFilled && valid;

  function handle(e) {
    setValue(e.target.value);
    onChange?.(e);
  }

  const baseInput =
    'peer w-full rounded-xl border border-temple-800/15 bg-cream-50 px-4 pt-5 pb-2 text-sm text-temple-800 placeholder:text-transparent transition-all duration-300 ease-divine focus:border-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500/30 motion-reduce:transition-none';

  const inner = (() => {
    if (as === 'textarea') {
      return (
        <textarea
          id={id}
          name={name || id}
          rows={rows}
          value={valueProp ?? value}
          onChange={handle}
          onBlur={() => setTouched(true)}
          required={required}
          placeholder={placeholder}
          className={cn(baseInput, 'resize-none pt-6', inputClassName)}
        />
      );
    }
    if (as === 'select') {
      return (
        <select
          id={id}
          name={name || id}
          value={valueProp ?? value}
          onChange={handle}
          onBlur={() => setTouched(true)}
          required={required}
          className={cn(baseInput, inputClassName)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      );
    }
    return (
      <input
        id={id}
        name={name || id}
        type={type}
        value={valueProp ?? value}
        onChange={handle}
        onBlur={() => setTouched(true)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(baseInput, LeadingIcon && 'pl-11', inputClassName)}
      />
    );
  })();

  return (
    <label htmlFor={id} className={cn('relative block', className)}>
      <span className="pointer-events-none absolute left-4 top-3.5 z-10 text-saffron-600 transition-colors duration-300 peer-focus:text-saffron-500 motion-reduce:transition-none">
        {LeadingIcon && <LeadingIcon size={16} aria-hidden="true" />}
      </span>
      <motion.span
        initial={false}
        animate={{
          y: isFilled ? -6 : 0,
          scale: isFilled ? 0.82 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'pointer-events-none absolute left-4 z-10 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-600 transition-colors duration-300 motion-reduce:transition-none',
          LeadingIcon ? 'left-11' : 'left-4',
          'top-3.5',
        )}
        aria-hidden="true"
      >
        {label}
        {required && <span className="ml-0.5 text-saffron-500">*</span>}
      </motion.span>
      <span
        className={cn(
          'pointer-events-none absolute bottom-2 left-4 right-4 origin-left scale-x-0 border-b border-saffron-500/60 transition-transform duration-500 ease-divine peer-focus:scale-x-100 motion-reduce:transition-none',
          LeadingIcon && 'left-11',
        )}
        aria-hidden="true"
      />
      {inner}
      <motion.span
        initial={false}
        animate={{ opacity: showCheck ? 1 : 0, scale: showCheck ? 1 : 0.6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-3 top-3.5 z-10 inline-flex h-5 w-5 items-center justify-center rounded-full bg-peacock-500/15 text-peacock-600"
        aria-hidden="true"
      >
        <Check size={12} strokeWidth={3} />
      </motion.span>
    </label>
  );
}
