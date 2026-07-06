import Image from "next/image";
import { imageSrc } from "@/lib/images";

interface FilmImageProps {
  /** Seed de la imagen (ver lib/images.ts para cambiarla). */
  seed: string;
  /** URL directa (ej: foto subida al CMS). Si está, pisa al seed. */
  src?: string;
  alt: string;
  /** Atributo sizes para responsive (perf). */
  sizes?: string;
  className?: string;
  /** Prioridad de carga (sólo para imágenes above-the-fold). */
  priority?: boolean;
  /** Intensidad del lavado cálido superpuesto (0–1). */
  wash?: number;
  /**
   * "box"  → contenedor con tamaño propio (aspect/clase). Default.
   * "cover" → llena un padre posicionado (absolute inset-0), p/ heros.
   */
  mode?: "box" | "cover";
}

/**
 * Imagen con tratamiento analógico cálido de marca:
 * filtro `.film` + lavado de color (multiply marrón/naranja) para unificar
 * cualquier foto al mood del brandbook. El src real se resuelve en
 * lib/images.ts, así que cambiar fotos no toca este componente.
 */
export function FilmImage({
  seed,
  src,
  alt,
  sizes = "100vw",
  className = "",
  priority = false,
  wash = 0.22,
  mode = "box",
}: FilmImageProps) {
  const position = mode === "cover" ? "absolute inset-0" : "relative";

  return (
    <div className={`${position} overflow-hidden ${className}`}>
      <Image
        src={src ?? imageSrc(seed)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="film object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
      {/* Lavado cálido para temperatura de marca */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(180deg, rgba(89,57,43,0.12), rgba(219,92,53,0.18))",
          opacity: wash,
        }}
        aria-hidden
      />
    </div>
  );
}
