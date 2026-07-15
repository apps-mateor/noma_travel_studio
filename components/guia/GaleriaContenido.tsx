"use client";

import { useState } from "react";
import { FilmImage } from "@/components/ui/FilmImage";
import { VisorGaleria } from "./VisorGaleria";

// ──────────────────────────────────────────────────────────────────
//  Galería dentro del contenido de una guía: grilla alineada al
//  ancho del texto (como en Mogu) y cada foto se expande al visor
//  a pantalla completa al tocarla.
// ──────────────────────────────────────────────────────────────────

interface GaleriaContenidoProps {
  /** URLs ya resueltas (imgUrl) de las fotos. */
  fotos: string[];
}

export function GaleriaContenido({ fotos }: GaleriaContenidoProps) {
  const [abierta, setAbierta] = useState(false);

  if (fotos.length === 0) return null;

  return (
    <>
      <div
        className={`mt-8 grid gap-4 ${fotos.length === 1 ? "" : "grid-cols-2"} ${
          fotos.length > 2 ? "sm:grid-cols-3" : ""
        }`}
      >
        {fotos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setAbierta(true)}
            aria-label={`Ampliar foto ${i + 1} de ${fotos.length}`}
            className="group cursor-zoom-in"
          >
            <FilmImage
              seed={`noma-guia-galeria-${i}`}
              src={src}
              alt=""
              sizes="(max-width: 640px) 50vw, 33vw"
              className={`w-full overflow-hidden rounded-2xl [&>img]:transition-transform [&>img]:duration-700 [&>img]:group-hover:scale-105 ${
                fotos.length === 1 ? "aspect-[16/9]" : "aspect-[4/3]"
              }`}
            />
          </button>
        ))}
      </div>

      {abierta && (
        <VisorGaleria fotos={fotos} nombre="la guía" onCerrar={() => setAbierta(false)} />
      )}
    </>
  );
}
