import { useEffect, useState, useCallback } from 'react';

/**
 * useTheme — minimal theme hook with no provider dependency.
 *
 * Reads/writes `iyf-theme` from localStorage and applies a `.dark`
 * class to <html>. Initial value resolution order:
 *
 *   1. localStorage('iyf-theme') — explicit user choice ('light' | 'dark')
 *   2. matchMedia('(prefers-color-scheme: dark)') — system preference
 *   3. 'light' — fallback (matches the project's editorial brand
 *      baseline; we don't auto-snap to dark for first-time visitors)
 *
 * SSR-safe: guards `window` so the import can resolve in environments
 * where window isn't defined (Vite SSR, unit tests).
 *
 * Exposes:
 *   - theme:        'light' | 'dark'
 *   - toggle:       () => void  — flips the current theme
 *   - setTheme(t):  ('light' | 'dark') => void
 *
 * The reason we don't wrap a Provider: every component that needs the
 * theme reads it from <html> via getComputedStyle. The CSS variables
 * are the single source of truth, and individual Tailwind `dark:`
 * variants handle the rest. This avoids prop-drilling and lets the
 * toggle button be a sibling of any consumer.
 */
const STORAGE_KEY = 'iyf-theme';

function readInitial() {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* localStorage might be blocked — fall through */
  }
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  // color-scheme follows the data-theme attribute so native form
  // controls (scrollbars, autofill) render correctly per theme.
  root.setAttribute('data-theme', theme);
}

export function useTheme() {
  const [theme, setThemeState] = useState(readInitial);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next) => {
    if (next !== 'light' && next !== 'dark') return;
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* persistence is best-effort — non-fatal */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return { theme, setTheme, toggle };
}
