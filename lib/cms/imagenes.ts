import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset, cmsEnabled } from "@/sanity/env";

// ──────────────────────────────────────────────────────────────────
//  IMÁGENES DEL CMS → URLs del CDN de Sanity
// ──────────────────────────────────────────────────────────────────

// Imagen de Sanity con su recorte/hotspot (lo que edita el admin).
export type CmsImagen = {
  asset?: { _ref?: string };
  crop?: unknown;
  hotspot?: unknown;
};

/** Agrega parámetros de tamaño/formato a una URL de imagen del CDN de Sanity. */
export function cdnImage(url: string, w: number): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}auto=format&w=${w}&q=80`;
}

const builder = cmsEnabled ? imageUrlBuilder({ projectId, dataset }) : null;

/**
 * URL de una imagen del CMS respetando el recorte y el hotspot que se
 * marcaron en el admin (lápiz sobre la foto → "Edit hotspot/crop").
 */
export function imgUrl(img: CmsImagen | undefined, w: number): string | undefined {
  if (!builder || !img?.asset?._ref) return undefined;
  return builder.image(img).width(w).auto("format").quality(80).url();
}
