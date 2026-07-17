import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // El admin (Sanity Studio) y las rutas internas no van al índice.
      disallow: ["/admin", "/api"],
    },
    sitemap: "https://www.nomatravelstudio.com/sitemap.xml",
  };
}
