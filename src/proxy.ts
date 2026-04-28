import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { calculators } from '@/lib/calculators';
import { categories } from '@/lib/categories';

const calculatorSlugSet = new Set(calculators.map((c) => c.slug));

const knownNonCalculatorSlugs = new Set([
  ...categories.map((c) => c.slug),
  'skolko-dney-do',
  'obratnyj-otschet-do-daty',
  'kulinarnye-mery',
  'procenty',
  'tajmery',
]);

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith('/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/favicon') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length !== 1) {
    return NextResponse.next();
  }

  const slug = segments[0];

  if (knownNonCalculatorSlugs.has(slug)) {
    return NextResponse.next();
  }

  if (calculatorSlugSet.has(slug)) {
    return NextResponse.rewrite(new URL(`/${slug}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|robots.txt|sitemap.xml).*)'],
};
