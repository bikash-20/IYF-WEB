/**
 * Tiny class-name joiner. Avoids pulling in `clsx` for a one-liner.
 * Filters falsy values, joins with spaces. Keep this dumb.
 */
export function cn(...args) {
  return args.filter(Boolean).join(' ');
}
