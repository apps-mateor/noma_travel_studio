"use client";

import { useEffect } from "react";
import { FilmImage } from "@/components/ui/FilmImage";

// ──────────────────────────────────────────────────────────────────
//  Visor de fotos a pantalla completa (lo comparten la galería de
//  cabecera y las galerías del contenido). Se cierra con Esc, la ✕
//  o clickeando afuera; bloquea el scroll del fondo mientras está
//  abierto.
// ──────────────────────────────────────────────────────────────────

interface VisorGaleriaProps {
  /** URLs ya resueltas de las fotos. */
  fotos: string[];
  /** Nombre de la guía o sección, para los textos accesibles. */
  nombre: string;
  onCerrar: () => void;
}

export function VisorGaleria({ fotos, nombre, onCerrar }: VisorGaleriaProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onCerrar]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${nombre}`}
      className="fixed inset-0 z-[120] overflow-y-auto bg-verde/95 backdrop-blur-sm"
      onClick={onCerrar}
    >
      <button
        type="button"
        onClick={onCerrar}
        aria-label="Cerrar galería"
        className="fixed right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream font-display text-brown shadow-lg transition-transform duration-300 hover:scale-105"
      >
        ✕
      </button>
      <div
        className="mx-auto flex max-w-4xl flex-col gap-5 px-5 py-16 sm:py-20"
        onClick={(e) => e.stopPropagation()}
      >
        {fotos.map((src, i) => (
          <FilmImage
            key={src}
            seed={`noma-visor-${i}`}
            src={src}
            alt={`Foto ${i + 1} de ${fotos.length}`}
            sizes="(max-width: 896px) 100vw, 896px"
            className="aspect-[3/2] w-full overflow-hidden rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
}
