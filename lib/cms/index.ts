// ──────────────────────────────────────────────────────────────────
//  LECTURA DEL CMS (Sanity) — punto de entrada.
//  El módulo está partido por responsabilidad:
//    cliente.ts   → cliente de Sanity, fetch en vivo y tag de caché
//    imagenes.ts  → URLs de imágenes del CDN (crop/hotspot)
//    secciones.ts → contenido de la home (hero, concepto, contacto…)
//    guias.ts     → guías de viaje
//  Todo se importa desde "@/lib/cms".
// ──────────────────────────────────────────────────────────────────

export { client, sanityFetch, SanityLive, CMS_CACHE_TAG } from "./cliente";
export { cdnImage, imgUrl, type CmsImagen } from "./imagenes";
export {
  getSiteContent,
  type SiteContent,
  type CmsEstilo,
  type CmsSpan,
  type CmsBlock,
  type CmsHero,
  type CmsRecuadro,
  type CmsConcepto,
  type CmsIntegrante,
  type CmsQuienesSomos,
  type CmsPilar,
  type CmsComoTrabajamos,
  type CmsDestino,
  type CmsDestinos,
  type CmsFormulario,
  type CmsContacto,
} from "./secciones";
export { getGuia, getGuias, type CmsGuia, type CmsGuiaCard } from "./guias";
