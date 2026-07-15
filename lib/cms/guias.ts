import { cmsEnabled } from "@/sanity/env";
import { sanityFetch, CMS_CACHE_TAG } from "./cliente";
import type { CmsImagen } from "./imagenes";
import { CONTACTO_FIELDS, type CmsContacto, type CmsEstilo } from "./secciones";

// ──────────────────────────────────────────────────────────────────
//  GUÍAS DE VIAJE
//  El contenido (bloques) es Portable Text de Sanity + bloques propios
//  (tip, galeria, itinerario, desplegable); lo tipa y renderiza
//  components/guia/GuiaBloques.tsx.
// ──────────────────────────────────────────────────────────────────

export type CmsGuia = {
  titulo?: string;
  slug?: string;
  etiqueta?: string;
  tipografia?: CmsEstilo["tipografia"];
  intro?: string;
  portada?: CmsImagen;
  fotos?: CmsImagen[];
  bloques?: unknown[];
  agente?: string;
  whatsapp?: string;
};

/** Datos mínimos de una guía para listados y generateStaticParams. */
export type CmsGuiaCard = {
  titulo?: string;
  slug?: string;
  etiqueta?: string;
  foto?: CmsImagen;
};

const GUIA_FIELDS = /* groq */ `
  titulo,
  "slug": slug.current,
  etiqueta,
  tipografia,
  intro,
  portada{asset, crop, hotspot},
  fotos[]{asset, crop, hotspot},
  bloques,
  agente,
  whatsapp
`;

/** Una guía + los datos de contacto (para el form de leads al final). */
export async function getGuia(
  slug: string,
): Promise<{ guia: CmsGuia | null; contacto: CmsContacto | null }> {
  if (!cmsEnabled) return { guia: null, contacto: null };
  try {
    const { data } = await sanityFetch({
      query: /* groq */ `{
        "guia": *[_type == "guia" && slug.current == $slug][0]{${GUIA_FIELDS}},
        "contacto": *[_type == "contacto"][0]{${CONTACTO_FIELDS}}
      }`,
      params: { slug },
      tags: [CMS_CACHE_TAG],
    });
    const result = data as { guia: CmsGuia | null; contacto: CmsContacto | null };
    return { guia: result?.guia ?? null, contacto: result?.contacto ?? null };
  } catch (error: unknown) {
    console.error("[cms] No se pudo leer la guía:", error);
    return { guia: null, contacto: null };
  }
}

/** Todas las guías publicadas (para listados y rutas estáticas). */
export async function getGuias(): Promise<CmsGuiaCard[]> {
  if (!cmsEnabled) return [];
  try {
    const { data } = await sanityFetch({
      query: /* groq */ `*[_type == "guia" && defined(slug.current)] | order(titulo asc) {
        titulo, "slug": slug.current, etiqueta, "foto": fotos[0]{asset, crop, hotspot}
      }`,
      tags: [CMS_CACHE_TAG],
    });
    return (data as CmsGuiaCard[]) ?? [];
  } catch (error: unknown) {
    console.error("[cms] No se pudieron listar las guías:", error);
    return [];
  }
}
