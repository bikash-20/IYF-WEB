import { useEffect } from 'react';

/**
 * Sets document.title and a few SEO meta tags per page. Lightweight
 * — no helmet dependency. When a CMS arrives, this hook becomes the
 * seam where server-rendered meta tags are reconciled.
 */
export function useMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (!description) return;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
  }, [title, description]);
}
