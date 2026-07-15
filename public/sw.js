// public/sw.js — IYF SYLHET service worker
//
// Strategy:
//   - On install: pre-cache the app shell (root + manifest).
//   - On activate: blow away old versioned caches.
//   - On fetch:
//       * navigations (HTML)            → network-first, fall back to
//                                         cached "/" when offline.
//       * same-origin static assets    → cache-first (assets are
//                                         fingerprinted by Vite).
//       * everything else (cross-origin)
//                                       → network, no caching.
//
// Cache version is bumped on every deploy so old caches evict cleanly.

const VERSION = 'iyf-v0.5.0';
const SHELL_CACHE = `${VERSION}-shell`;
const ASSET_CACHE = `${VERSION}-assets`;

const SHELL_URLS = [
  '/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/pwa-192.png',
  '/pwa-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.startsWith(VERSION))
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET.
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Cross-origin (Google Fonts, etc.) — let the browser do its thing.
  if (url.origin !== self.location.origin) return;

  // HTML navigations — network-first, offline fallback to cached root.
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(SHELL_CACHE);
          cache.put('/', fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match('/');
          if (cached) return cached;
          return new Response(
            '<h1>Offline</h1><p>The mandir page is not yet cached. Reconnect and try again.</p>',
            { headers: { 'Content-Type': 'text/html' } },
          );
        }
      })(),
    );
    return;
  }

  // Static assets — cache-first.
  event.respondWith(
    (async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      try {
        const fresh = await fetch(req);
        if (fresh.ok && (url.pathname.startsWith('/assets/') || /\.(png|jpg|jpeg|svg|ico|webp|woff2?|css|js)$/.test(url.pathname))) {
          const cache = await caches.open(ASSET_CACHE);
          cache.put(req, fresh.clone());
        }
        return fresh;
      } catch {
        return cached || new Response('Offline', { status: 503 });
      }
    })(),
  );
});

// Listen for messages from the client (e.g. "skipWaiting" on update).
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});