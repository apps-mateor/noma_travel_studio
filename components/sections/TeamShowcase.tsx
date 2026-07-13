"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { FilmImage } from "@/components/ui/FilmImage";
import { Reveal } from "@/components/ui/Reveal";

// Coreografía en mobile: foto → aparece la bio (velo verde) → tiempo de
// lectura → vuelve la foto → avanza a la siguiente. Si la persona toca,
// manda ella.
const FOTO_MS = 2000;
const BIO_MS = 8000;
const FADE_MS = 500;
const RESUME_MS = 7000;

export interface Integrante {
  name: string;
  role: string;
  bio: string;
  seed: string;
  src?: string;
}

interface TeamShowcaseProps {
  equipo: Integrante[];
}

/**
 * Tarjetas del equipo: la bio aparece como velo verde translúcido
 * sobre la foto. Mobile: carrusel que muestra cada bio solo y avanza;
 * tap = toggle manual + pausa. Desktop: grilla de 3, bio al hover.
 * Reduced-motion: sin autoplay y fade instantáneo.
 */
export function TeamShowcase({ equipo }: TeamShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [hoverCapable, setHoverCapable] = useState(false);
  const pausedUntil = useRef(0);

  useEffect(() => {
    setHoverCapable(window.matchMedia("(hover: hover)").matches);
  }, []);

  // Ciclo automático — sólo en touch y sin reduced-motion.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: hover)").matches) return;

    const pause = () => {
      pausedUntil.current = Date.now() + RESUME_MS;
    };
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("pointerdown", pause);

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });
    const paused = () => Date.now() < pausedUntil.current;

    const centrar = (i: number) => {
      const card = el.children[i] as HTMLElement | undefined;
      if (!card) return;
      const left =
        card.getBoundingClientRect().left -
        el.getBoundingClientRect().left +
        el.scrollLeft -
        (el.clientWidth - card.clientWidth) / 2;
      el.scrollTo({ left, behavior: "smooth" });
    };

    (async () => {
      let i = 0;
      while (!cancelled) {
        if (paused() || el.scrollWidth <= el.clientWidth) {
          await wait(600);
          continue;
        }
        centrar(i);
        await wait(FOTO_MS);
        if (cancelled || paused()) continue;
        setFlipped(i);
        await wait(BIO_MS);
        if (cancelled) break;
        // cerrar sólo si nadie giró otra tarjeta mientras tanto
        setFlipped((actual) => (actual === i ? null : actual));
        await wait(FADE_MS + 200);
        i = (i + 1) % equipo.length;
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("pointerdown", pause);
    };
  }, [equipo.length]);

  const toggle = (i: number) => {
    pausedUntil.current = Date.now() + RESUME_MS;
    setFlipped((actual) => (actual === i ? null : i));
  };

  return (
    <div
      ref={scrollRef}
      className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0"
    >
      {equipo.map((persona, i) => (
        <Reveal
          key={persona.seed}
          delay={i * 90}
          className="w-[76vw] shrink-0 snap-center sm:w-auto"
        >
          <FlipCard
            persona={persona}
            flipped={flipped === i}
            onTap={() => toggle(i)}
            onEnter={hoverCapable ? () => setFlipped(i) : undefined}
            onLeave={
              hoverCapable
                ? () => setFlipped((actual) => (actual === i ? null : actual))
                : undefined
            }
          />
        </Reveal>
      ))}
    </div>
  );
}

interface FlipCardProps {
  persona: Integrante;
  flipped: boolean;
  onTap: () => void;
  onEnter?: () => void;
  onLeave?: () => void;
}

function FlipCard({ persona, flipped, onTap, onEnter, onLeave }: FlipCardProps) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onTap();
    }
  };

  return (
    <div
      role="button"
      aria-expanded={flipped}
      tabIndex={0}
      onClick={onTap}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onKeyDown={onKeyDown}
      className="group relative cursor-pointer overflow-hidden rounded-2xl focus-visible:outline-none sm:focus-visible:outline-2 sm:focus-visible:outline-offset-[3px] sm:focus-visible:outline-naranja"
    >
      <FilmImage
        seed={persona.seed}
        src={persona.src}
        alt={`${persona.name} — ${persona.role}`}
        sizes="(max-width: 640px) 100vw, 33vw"
        className="aspect-[3/4] w-full"
      />

      {/* Nombre siempre visible (se esconde cuando la bio está abierta) */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-verde/90 to-transparent p-5 pt-14 text-cream transition-opacity duration-500 motion-reduce:duration-0 ${
          flipped ? "opacity-0" : "opacity-100"
        }`}
      >
        <h3 className="display text-lg">{persona.name}</h3>
      </div>

      {/* Bio: velo verde translúcido sobre la foto */}
      <div
        className={`absolute inset-0 flex flex-col justify-end overflow-y-auto bg-verde/85 p-6 text-cream transition-opacity duration-500 motion-reduce:duration-0 ${
          flipped ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="hand text-naranja" style={{ fontSize: "1.3rem" }}>
          {persona.role}
        </p>
        <h3 className="display mt-2 text-lg">{persona.name}</h3>
        <p className="mt-3 font-serif text-sm leading-relaxed text-cream/85">
          {persona.bio}
        </p>
      </div>
    </div>
  );
}
