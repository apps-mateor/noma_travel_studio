"use client";

import { useEffect, useRef, type ReactNode } from "react";

const RESUME_DELAY_MS = 7000;

interface AutoCarouselProps {
  children: ReactNode;
  className?: string;
  /** Cada cuánto avanza solo (ms). */
  intervalMs?: number;
}

/**
 * Carrusel con scroll-snap que avanza solo y también se swipea a mano:
 * al tocar/arrastrar se pausa y retoma tras unos segundos de quietud.
 * Si el contenido no desborda (ej: grilla en desktop) no hace nada.
 * Respeta prefers-reduced-motion.
 */
export function AutoCarousel({ children, className = "", intervalMs = 3500 }: AutoCarouselProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, RESUME_DELAY_MS);
    };

    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("pointerdown", pause);
    el.addEventListener("wheel", pause, { passive: true });

    const tick = setInterval(() => {
      if (paused) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return; // grilla desktop: nada para deslizar
      const next = el.scrollLeft >= max - 8 ? 0 : el.scrollLeft + el.clientWidth * 0.8;
      el.scrollTo({ left: next, behavior: "smooth" });
    }, intervalMs);

    return () => {
      clearInterval(tick);
      clearTimeout(resumeTimer);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("wheel", pause);
    };
  }, [intervalMs]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
