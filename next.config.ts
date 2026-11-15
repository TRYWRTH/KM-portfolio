import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // Kontakt is now a small menu, not a page: old links go to the home page
  async redirects() {
    return [{ source: "/kontakt", destination: "/", permanent: false }];
  },
};

export default nextConfig;
