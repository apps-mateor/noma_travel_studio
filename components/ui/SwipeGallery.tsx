"use client";

import { useRef } from "react";
import { FilmImage } from "./FilmImage";
import { Arrow } from "@/components/brand/Arrow";
import type { Destino } from "@/lib/content";

interface SwipeGalleryProps {
  items: readonly Destino[];
  className?: string;
}

/**
 * Galería de destinos swipeable: scroll-snap horizontal (swipe nativo en
 * touch) + arrastre con el mouse en desktop + botones con la flecha real.
 * No hay auto-scroll: lo controla el usuario.
 */
export function SwipeGallery({ items, className = "" }: SwipeGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Arrastre con puntero (desktop). En touch, el scroll-snap nativo ya swipea.
  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="no-scrollbar flex min-h-0 flex-1 cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain active:cursor-grabbing"
      >
        {items.map((d, i) => (
          <article
            key={d.name}
            data-card
            className="group relative h-full w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl sm:w-[68%] lg:w-[82%]"
          >
            <FilmImage
              seed={d.seed}
              alt={`${d.name}, ${d.place}`}
              mode="cover"
              priority={i === 0}
              sizes="(max-width: 1024px) 70vw, 36vw"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(0deg, rgba(43,64,45,0.78), transparent 48%)" }}
              aria-hidden
            />
            <div className="absolute inset-x-5 bottom-5">
              <p className="eyebrow text-cream/80">
                0{i + 1} — {d.place}
              </p>
              <h3 className="display mt-1 text-2xl text-cream sm:text-3xl">{d.name}</h3>
              <p className="mt-1 font-serif text-sm italic text-cream/80">{d.note}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Controles con la flecha real */}
      <div className="mt-4 flex items-center gap-3 px-5 sm:px-8 lg:px-0">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Destino anterior"
          className="grid h-11 w-11 place-items-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-verde"
        >
          <Arrow className="h-3 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Destino siguiente"
          className="grid h-11 w-11 place-items-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-verde"
        >
          <Arrow className="h-3" />
        </button>
      </div>
    </div>
  );
}
