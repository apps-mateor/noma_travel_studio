import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";
import { projectId, dataset, apiVersion } from "@/sanity/env";

// ──────────────────────────────────────────────────────────────────
//  CLIENTE DE LECTURA DEL CMS (Sanity)
//
//  El token (SANITY_API_READ_TOKEN, rol viewer) habilita la vista
//  previa en vivo del admin: /admin → Presentación.
// ──────────────────────────────────────────────────────────────────

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

/**
 * Tag de caché compartido por todos los fetches del CMS. El webhook de
 * Sanity (app/api/revalidate) lo expira al publicar, así el sitio se
 * regenera aunque nadie lo tenga abierto en ese momento.
 */
export const CMS_CACHE_TAG = "cms";
