'use client';

import purify from 'isomorphic-dompurify';

interface SafeHtmlProps {
  html: string;
  className?: string;
}

export function SafeHtml({ html, className }: SafeHtmlProps) {
  const clean = purify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'sup', 'sub', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
