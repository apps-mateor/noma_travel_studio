"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { FilmImage } from "@/components/ui/FilmImage";
import { Reveal } from "@/components/ui/Reveal";

// Coreografía en mobile: foto → gira a la bio → tiempo de lectura →
// vuelve la foto → avanza a la siguiente. Si la persona toca, manda ella.
const FOTO_MS = 2000;
const BIO_MS = 8000;
const FLIP_MS = 700;
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
 * Tarjetas del equipo con flip 3D (foto al frente, bio al dorso).
 * Mobile: carrusel que gira y avanza solo; tap = flip manual + pausa.
 * Desktop: grilla de 3, flip al hover. Reduced-motion: sin autoplay
 * y flip instantáneo.
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
        await wait(FLIP_MS + 200);
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
      className="cursor-pointer [perspective:1200px] focus-visible:outline-none sm:focus-visible:outline-2 sm:focus-visible:outline-offset-[3px] sm:focus-visible:outline-naranja"
    >
      <div
        className={`relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] motion-reduce:duration-0 ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Frente: foto + nombre */}
        <div className="relative overflow-hidden rounded-2xl [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          <FilmImage
            seed={persona.seed}
            src={persona.src}
            alt={`${persona.name} — ${persona.role}`}
            sizes="(max-width: 640px) 100vw, 33vw"
            className="aspect-[3/4] w-full"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-verde/90 to-transparent p-5 pt-14 text-cream">
            <h3 className="display text-lg">{persona.name}</h3>
          </div>
        </div>

        {/* Dorso: rol + bio */}
        <div className="absolute inset-0 flex flex-col justify-end overflow-y-auto rounded-2xl bg-verde p-6 text-cream [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="hand text-naranja" style={{ fontSize: "1.3rem" }}>
            {persona.role}
          </p>
          <h3 className="display mt-2 text-lg">{persona.name}</h3>
          <p className="mt-3 font-serif text-sm leading-relaxed text-cream/85">
            {persona.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
