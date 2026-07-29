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

  // Estas páginas existieron como rutas propias y quedaron absorbidas por la
  // home (el sitio es una one-page). Redirigimos en vez de devolver 404 por
  // si Google ya las indexó o alguien tiene el link guardado.
  // "/destinos" es exacto: no afecta a las guías /destinos/<slug>.
  async redirects() {
    return ["/studio", "/servicios", "/contacto", "/destinos"].map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
};

export default nextConfig;
