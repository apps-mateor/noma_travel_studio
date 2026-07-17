// ──────────────────────────────────────────────────────────────────
//  SISTEMA DE IMÁGENES  ·  punto único para cambiar todas las fotos
// ──────────────────────────────────────────────────────────────────
//
//  Cada imagen del sitio se referencia por un `seed` (string).
//  Por defecto, ese seed genera una foto placeholder reproducible.
//
//  PARA CAMBIAR UNA IMAGEN:
//  1. Poné tu foto en /public/images/  (ej: /public/images/japon.jpg)
//  2. Agregá una entrada en OVERRIDES con el mismo seed:
//        "noma-japon": "/images/japon.jpg"
//  3. Listo. No hace falta tocar ningún componente.
//
//  El brandbook pide fotografía analógica cálida y con grano, generada
//  ad hoc por la marca. Estos placeholders son sólo andamiaje visual.
// ──────────────────────────────────────────────────────────────────

/** Reemplazos reales seed -> ruta/URL. Editá SÓLO este objeto. */
export const IMAGE_OVERRIDES: Record<string, string> = {
  "noma-hero": "/images/hero.jpg",
  // "noma-japon": "/images/japon.jpg",
};

/** Dimensiones del placeholder. No afectan a las imágenes reales. */
const PLACEHOLDER = { w: 1400, h: 1750 } as const;

/**
 * Devuelve la URL final de una imagen a partir de su seed.
 * Si hay override la usa; si no, genera un placeholder determinístico.
 */
export function imageSrc(seed: string, opts?: { w?: number; h?: number }): string {
  if (IMAGE_OVERRIDES[seed]) return IMAGE_OVERRIDES[seed];
  const w = opts?.w ?? PLACEHOLDER.w;
  const h = opts?.h ?? PLACEHOLDER.h;
  // Placeholder reproducible por seed (siempre devuelve una foto, nunca 404).
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

/** True si el seed ya apunta a una imagen real (útil para badges/avisos). */
export function isRealImage(seed: string): boolean {
  return Boolean(IMAGE_OVERRIDES[seed]);
}
