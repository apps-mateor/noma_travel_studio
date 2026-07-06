import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Orígenes permitidos para next/image. picsum.photos cubre los
    // placeholders; unsplash queda listo por si se enlazan fotos reales.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Fotos subidas desde el admin (Sanity)
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
