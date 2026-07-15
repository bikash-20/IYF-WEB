import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/index.css';

// Service worker — only register in production builds. We use a tiny
// vanilla-`import.meta` check so the SW never runs on the dev server
// (Vite HMR + SW caching interact poorly).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        // When a new SW is waiting, ask it to take over on next page load.
        if (reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        reg.addEventListener('updatefound', () => {
          const next = reg.installing;
          if (!next) return;
          next.addEventListener('statechange', () => {
            if (next.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available. Reload silently so the user gets it.
              // (Future: show a 'New version available — refresh' toast.)
              window.location.reload();
            }
          });
        });
      })
      .catch((err) => {
        // Non-fatal — the page still works without offline support.
        // eslint-disable-next-line no-console
        console.warn('[iyf] service worker registration failed:', err);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
