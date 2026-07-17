import type { MetadataRoute } from "next";
import { stegaClean } from "next-sanity";
import { getGuias } from "@/lib/cms";

const BASE = "https://www.nomatravelstudio.com";

// Páginas maquetadas del sitio. La home lleva prioridad máxima.
const PAGINAS = ["", "/destinos", "/servicios", "/studio", "/contacto"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const estaticas: MetadataRoute.Sitemap = PAGINAS.map((ruta) => ({
    url: `${BASE}${ruta}`,
    changeFrequency: "monthly",
    priority: ruta === "" ? 1 : 0.7,
  }));

  const guias: MetadataRoute.Sitemap = (await getGuias())
    .filter((g): g is typeof g & { slug: string } => Boolean(g.slug))
    .map((g) => ({
      url: `${BASE}/destinos/${stegaClean(g.slug)}`,
      lastModified: g.actualizado,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...estaticas, ...guias];
}
