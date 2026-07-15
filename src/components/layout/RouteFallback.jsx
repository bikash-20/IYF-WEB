/**
 * Shown while a lazy route chunk is being fetched. The mandir's
 * typography and palette keep it on-brand — never a spinner.
 */
export function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-temple-600">
        <div className="h-10 w-10 animate-pulse rounded-full bg-saffron-500/30" />
        <span className="font-mono text-xs uppercase tracking-eyebrow">Loading</span>
      </div>
    </div>
  );
}
