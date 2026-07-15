import { cmsEnabled } from "@/sanity/env";
import { sanityFetch, CMS_CACHE_TAG } from "./cliente";
import type { CmsImagen } from "./imagenes";

// ──────────────────────────────────────────────────────────────────
//  SECCIONES DE LA HOME (hero, concepto, quiénes somos, cómo
//  trabajamos, destinos, contacto)
//
//  Si el CMS no está configurado (sin NEXT_PUBLIC_SANITY_PROJECT_ID)
//  o una sección no fue cargada todavía, el sitio usa el contenido
//  por defecto de lib/content.ts. Nada se rompe.
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

export type SiteContent = {
  hero: CmsHero | null;
  concepto: CmsConcepto | null;
  quienesSomos: CmsQuienesSomos | null;
  comoTrabajamos: CmsComoTrabajamos | null;
  destinos: CmsDestinos | null;
  contacto: CmsContacto | null;
};

/** Campos del documento de contacto (los usa también la query de guías). */
export const CONTACTO_FIELDS = /* groq */ `titulo, intro, whatsapp, email, instagram, formulario`;

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
  "contacto": *[_type == "contacto"][0]{${CONTACTO_FIELDS}}
}`;

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
