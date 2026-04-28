import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:slug((?!categories|search|robots|sitemap|api|_next|favicon|manifest|globals|stati|tajmery|procenty|kulinarnye-mery|skolko-dney-do|obratnyj-otschet-do-daty|categories|calc|konvertery|nauka-i-ucheba|procenty|zdorove-i-krasota|stroitelstvo-i-remont|transport|tekhnologii|povsednevnoe|finansy|tajmery|kulinarnye-mery|stati|podkat|)[^.]+)',
          destination: '/calc/:slug',
        },
      ],
    };
  },
};

export default nextConfig;
