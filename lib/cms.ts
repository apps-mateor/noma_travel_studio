import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset, apiVersion, cmsEnabled } from "@/sanity/env";

// ──────────────────────────────────────────────────────────────────
//  LECTURA DEL CMS (Sanity)
//  Si el CMS no está configurado (sin NEXT_PUBLIC_SANITY_PROJECT_ID)
//  o una sección no fue cargada todavía, el sitio usa el contenido
//  por defecto de lib/content.ts. Nada se rompe.
//
//  El token (SANITY_API_READ_TOKEN, rol viewer) habilita la vista
//  previa en vivo del admin: /admin → Presentación.
// ──────────────────────────────────────────────────────────────────

export type CmsEstilo = {
  tipografia?: "display" | "serif" | "hand";
  tamano?: "chico" | "mediano" | "grande";
  alineacion?: "izquierda" | "centro" | "derecha" | "justificado";
};

// Título enriquecido: cada bloque es una línea; los marks son colores.
export type CmsSpan = { _type: "span"; text: string; marks?: string[] };
export type CmsBlock = { _type: "block"; _key: string; children: CmsSpan[] };

export type CmsHero = {
  titulo?: CmsBlock[];
  estilo?: CmsEstilo;
  fondo?: { url?: string; mimeType?: string };
};

export type CmsRecuadro = { titulo?: string; texto?: string };

export type CmsConcepto = {
  fraseInicio?: string;
  fraseMedio?: string;
  palabraTachada?: string;
  palabraDestacada?: string;
  fraseFin?: string;
  proposito?: string;
  recuadros?: CmsRecuadro[];
};

// Imagen de Sanity con su recorte/hotspot (lo que edita el admin).
export type CmsImagen = {
  asset?: { _ref?: string };
  crop?: unknown;
  hotspot?: unknown;
};

export type CmsIntegrante = { nombre?: string; rol?: string; bio?: string; foto?: CmsImagen };

export type CmsQuienesSomos = {
  titulo?: string;
  parrafos?: string[];
  fotoEquipo?: CmsImagen;
  equipo?: CmsIntegrante[];
};

export type CmsPilar = { titulo?: string; texto?: string };

export type CmsComoTrabajamos = {
  etiqueta?: string;
  titulo?: string;
  intro?: string;
  pilares?: CmsPilar[];
  pasos?: CmsPilar[];
};

export type CmsDestino = {
  nombre?: string;
  lugar?: string;
  nota?: string;
  link?: string;
  foto?: CmsImagen;
};

export type CmsDestinos = { titulo?: string; intro?: string; lista?: CmsDestino[] };

export type CmsFormulario = {
  nombre?: string;
  email?: string;
  tipo?: string;
  cuando?: string;
  cuantos?: string;
  telefono?: string;
  mensaje?: string;
};

export type CmsContacto = {
  titulo?: string;
  intro?: string;
  whatsapp?: string;
  email?: string;
  instagram?: string;
  formulario?: CmsFormulario;
};

// ── Guías de viaje ────────────────────────────────────────────────
// El contenido (bloques) es Portable Text de Sanity + bloques propios
// (tip, galeria, itinerario, desplegable); lo tipa y renderiza
// components/guia/GuiaBloques.tsx.

export type CmsGuia = {
  titulo?: string;
  slug?: string;
  etiqueta?: string;
  intro?: string;
  portada?: CmsImagen;
  fotos?: CmsImagen[];
  bloques?: unknown[];
};

/** Datos mínimos de una guía para listados y generateStaticParams. */
export type CmsGuiaCard = {
  titulo?: string;
  slug?: string;
  etiqueta?: string;
  foto?: CmsImagen;
};

export type SiteContent = {
  hero: CmsHero | null;
  concepto: CmsConcepto | null;
  quienesSomos: CmsQuienesSomos | null;
  comoTrabajamos: CmsComoTrabajamos | null;
  destinos: CmsDestinos | null;
  contacto: CmsContacto | null;
};

const token = process.env.SANITY_API_READ_TOKEN;

export const client = createClient({
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  useCdn: true,
  // stega marca el HTML para que el admin sepa qué campo es cada texto
  // (overlays de click-to-edit en la vista "Presentación").
  stega: { studioUrl: "/admin" },
});

// sanityFetch entrega drafts en vivo dentro del admin y contenido
// publicado (cacheado + revalidado por eventos) en el sitio público.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});

// Un solo fetch para toda la home. Las imágenes se resuelven a URL del CDN.
const QUERY = /* groq */ `{
  "hero": *[_type == "hero"][0]{
    titulo, estilo,
    "fondo": fondo.asset->{url, mimeType}
  },
  "concepto": *[_type == "concepto"][0]{
    fraseInicio, fraseMedio, palabraTachada, palabraDestacada, fraseFin, proposito,
    recuadros[]{titulo, texto}
  },
  "quienesSomos": *[_type == "quienesSomos"][0]{
    titulo, parrafos,
    fotoEquipo{asset, crop, hotspot},
    equipo[]{nombre, rol, bio, foto{asset, crop, hotspot}}
  },
  "comoTrabajamos": *[_type == "comoTrabajamos"][0]{
    etiqueta, titulo, intro, pilares[]{titulo, texto}, pasos[]{titulo, texto}
  },
  "destinos": *[_type == "destinos"][0]{
    titulo, intro, lista[]{nombre, lugar, nota, link, foto{asset, crop, hotspot}}
  },
  "contacto": *[_type == "contacto"][0]{titulo, intro, whatsapp, email, instagram, formulario}
}`;

/**
 * Tag de caché compartido por todos los fetches del CMS. El webhook de
 * Sanity (app/api/revalidate) lo expira al publicar, así el sitio se
 * regenera aunque nadie lo tenga abierto en ese momento.
 */
export const CMS_CACHE_TAG = "cms";

const EMPTY: SiteContent = {
  hero: null,
  concepto: null,
  quienesSomos: null,
  comoTrabajamos: null,
  destinos: null,
  contacto: null,
};

/**
 * Contenido editable del sitio. Devuelve null por sección cuando el CMS
 * no está configurado o la sección no existe todavía.
 */
export async function getSiteContent(): Promise<SiteContent> {
  if (!cmsEnabled) return EMPTY;
  try {
    const { data } = await sanityFetch({ query: QUERY, tags: [CMS_CACHE_TAG] });
    return { ...EMPTY, ...(data as SiteContent) };
  } catch (error: unknown) {
    // Si Sanity no responde, el sitio sigue funcionando con el
    // contenido por defecto. Se loguea para diagnóstico en Vercel.
    console.error("[cms] No se pudo leer Sanity:", error);
    return EMPTY;
  }
}

const CONTACTO_FIELDS = /* groq */ `titulo, intro, whatsapp, email, instagram, formulario`;

const GUIA_FIELDS = /* groq */ `
  titulo,
  "slug": slug.current,
  etiqueta,
  intro,
  portada{asset, crop, hotspot},
  fotos[]{asset, crop, hotspot},
  bloques
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
