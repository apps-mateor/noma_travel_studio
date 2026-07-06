import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, cmsEnabled } from "@/sanity/env";

// ──────────────────────────────────────────────────────────────────
//  LECTURA DEL CMS (Sanity)
//  Si el CMS no está configurado (sin NEXT_PUBLIC_SANITY_PROJECT_ID)
//  o una sección no fue cargada todavía, el sitio usa el contenido
//  por defecto de lib/content.ts. Nada se rompe.
// ──────────────────────────────────────────────────────────────────

export type CmsHero = {
  titulo?: string;
  palabraNaranja?: string;
  subtitulo?: string;
  imagenFondo?: string;
  videoUrl?: string;
};

export type CmsRecuadro = { titulo?: string; texto?: string };

export type CmsConcepto = {
  fraseInicio?: string;
  fraseMedio?: string;
  palabraDestacada?: string;
  fraseFin?: string;
  proposito?: string;
  recuadros?: CmsRecuadro[];
};

export type CmsIntegrante = { nombre?: string; rol?: string; bio?: string; foto?: string };

export type CmsQuienesSomos = {
  titulo?: string;
  parrafos?: string[];
  fotoEquipo?: string;
  equipo?: CmsIntegrante[];
};

export type CmsPilar = { titulo?: string; texto?: string };

export type CmsComoTrabajamos = {
  titulo?: string;
  intro?: string;
  pilares?: CmsPilar[];
  pasos?: CmsPilar[];
};

export type CmsDestino = { nombre?: string; lugar?: string; nota?: string; foto?: string };

export type CmsDestinos = { titulo?: string; intro?: string; lista?: CmsDestino[] };

export type CmsContacto = { titulo?: string; intro?: string };

export type SiteContent = {
  hero: CmsHero | null;
  concepto: CmsConcepto | null;
  quienesSomos: CmsQuienesSomos | null;
  comoTrabajamos: CmsComoTrabajamos | null;
  destinos: CmsDestinos | null;
  contacto: CmsContacto | null;
};

const client = cmsEnabled
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

// Un solo fetch para toda la home. Las imágenes se resuelven a URL del CDN.
const QUERY = /* groq */ `{
  "hero": *[_type == "hero"][0]{
    titulo, palabraNaranja, subtitulo, videoUrl,
    "imagenFondo": imagenFondo.asset->url
  },
  "concepto": *[_type == "concepto"][0]{
    fraseInicio, fraseMedio, palabraDestacada, fraseFin, proposito,
    recuadros[]{titulo, texto}
  },
  "quienesSomos": *[_type == "quienesSomos"][0]{
    titulo, parrafos,
    "fotoEquipo": fotoEquipo.asset->url,
    equipo[]{nombre, rol, bio, "foto": foto.asset->url}
  },
  "comoTrabajamos": *[_type == "comoTrabajamos"][0]{
    titulo, intro, pilares[]{titulo, texto}, pasos[]{titulo, texto}
  },
  "destinos": *[_type == "destinos"][0]{
    titulo, intro, lista[]{nombre, lugar, nota, "foto": foto.asset->url}
  },
  "contacto": *[_type == "contacto"][0]{titulo, intro}
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
  if (!client) return EMPTY;
  try {
    const data = await client.fetch<SiteContent>(QUERY);
    return { ...EMPTY, ...data };
  } catch (error: unknown) {
    // Si Sanity no responde, el sitio sigue funcionando con el
    // contenido por defecto. Se loguea para diagnóstico en Vercel.
    console.error("[cms] No se pudo leer Sanity:", error);
    return EMPTY;
  }
}

/** Agrega parámetros de tamaño/formato a una URL de imagen del CDN de Sanity. */
export function cdnImage(url: string, w: number): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}auto=format&w=${w}&q=80`;
}
