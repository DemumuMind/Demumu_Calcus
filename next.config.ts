import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:slug((?!categories|search|robots|sitemap|api|_next|favicon|manifest|globals|stati|tajmery|procenty|kulinarnye-mery|skolko-dney-do|obratnyj-otschet-do-daty|calc|konvertery|nauka-i-ucheba|zdorove-i-krasota|stroitelstvo-i-remont|transport|tekhnologii|povsednevnoe|finansy|podkat|)[^.]+)',
          destination: '/calc/:slug',
        },
      ],
    };
  },
};

export default nextConfig;
