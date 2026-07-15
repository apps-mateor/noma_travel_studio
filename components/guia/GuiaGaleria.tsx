"use client";

import { useState } from "react";
import { FilmImage } from "@/components/ui/FilmImage";
import { VisorGaleria } from "./VisorGaleria";

// ──────────────────────────────────────────────────────────────────
//  Galería de cabecera de una guía (como en Mogu): la primera foto
//  grande a la izquierda con el botón "Ver galería", hasta dos más
//  apiladas a la derecha, y un visor a pantalla completa con todas.
// ──────────────────────────────────────────────────────────────────

const MAX_EN_CABECERA = 3;

interface GuiaGaleriaProps {
  /** URLs ya resueltas (imgUrl) de todas las fotos de la galería. */
  fotos: string[];
  /** Nombre de la guía, para los textos accesibles. */
  nombre: string;
}

export function GuiaGaleria({ fotos, nombre }: GuiaGaleriaProps) {
  const [abierta, setAbierta] = useState(false);

  if (fotos.length === 0) return null;

  const [principal, ...laterales] = fotos.slice(0, MAX_EN_CABECERA);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Foto principal, grande a la izquierda */}
        <div className={`relative ${laterales.length ? "sm:col-span-2" : "sm:col-span-3"}`}>
          <FilmImage
            seed="noma-guia-galeria-0"
            src={principal}
            alt={`Fotos de ${nombre}`}
            sizes="(max-width: 640px) 100vw, 66vw"
            className={`w-full overflow-hidden rounded-2xl ${
              laterales.length ? "aspect-[4/3] sm:aspect-auto sm:h-full" : "aspect-[21/9]"
            }`}
          />
          <button
            type="button"
            onClick={() => setAbierta(true)}
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-cream/95 px-4 py-2 font-display text-[0.68rem] uppercase tracking-[0.16em] text-brown shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream"
          >
            <span aria-hidden>◨</span> Ver galería
          </button>
        </div>

        {/* Hasta dos fotos apiladas a la derecha */}
        {laterales.length > 0 && (
          <div className="grid gap-4">
            {laterales.map((src, i) => (
              <FilmImage
                key={src}
                seed={`noma-guia-galeria-${i + 1}`}
                src={src}
                alt=""
                sizes="(max-width: 640px) 100vw, 33vw"
                className="aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/10]"
              />
            ))}
          </div>
        )}
      </div>

      {/* Visor a pantalla completa con todas las fotos */}
      {abierta && (
        <VisorGaleria fotos={fotos} nombre={nombre} onCerrar={() => setAbierta(false)} />
      )}
    </>
  );
}
