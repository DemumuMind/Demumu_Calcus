import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: "C:\\Users\\Romanchello\\source\\repo\\Demumu_Calcus",
  },
  typescript: {
    ignoreBuildErrors: true,
  },

};

export default nextConfig;
