// Configuración de Sanity vía variables de entorno.
// Local: .env.local · Producción: variables de entorno en Vercel.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-07-06";

/** True si el CMS está configurado; si no, el sitio usa el contenido de lib/content.ts. */
export const cmsEnabled = Boolean(projectId);
