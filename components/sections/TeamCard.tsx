"use client";

import { useState } from "react";
import { FilmImage } from "@/components/ui/FilmImage";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  seed: string;
  src?: string;
}

/**
 * Tarjeta de integrante: la bio aparece como overlay sobre la foto —
 * con hover en desktop y con tap (toggle) en touch.
 */
export function TeamCard({ name, role, bio, seed, src }: TeamCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article
      role="button"
      aria-expanded={open}
      tabIndex={0}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl focus-visible:outline-none sm:focus-visible:outline-2 sm:focus-visible:outline-offset-[3px] sm:focus-visible:outline-naranja"
    >
      <FilmImage
        seed={seed}
        src={src}
        alt={`${name} — ${role}`}
        sizes="(max-width: 640px) 100vw, 33vw"
        className="aspect-[3/4] w-full [&>img]:group-hover:scale-105"
      />

      {/* Nombre siempre visible (se esconde cuando la bio está abierta) */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-verde/90 to-transparent p-5 pt-14 text-cream transition-opacity duration-500 sm:group-hover:opacity-0 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      >
        <h3 className="display text-lg">{name}</h3>
      </div>

      {/* Overlay con rol + bio: hover en desktop, tap en mobile */}
      <div
        className={`absolute inset-0 flex flex-col justify-end bg-verde/90 p-6 text-cream transition-opacity duration-500 sm:group-hover:opacity-100 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="hand text-naranja" style={{ fontSize: "1.3rem" }}>
          {role}
        </p>
        <h3 className="display mt-2 text-lg">{name}</h3>
        <p className="mt-3 font-serif text-sm leading-relaxed text-cream/85">{bio}</p>
      </div>
    </article>
  );
}
