"use client";

import { useEffect, useRef } from "react";

interface UseRevealOptions {
  /** Margen del root para disparar antes/después (default: dispara un poco antes). */
  rootMargin?: string;
  /** Fracción visible para revelar (0–1). */
  threshold?: number;
  /** Revelar una sola vez (default true). */
  once?: boolean;
}

/**
 * Revela un elemento al entrar en viewport vía IntersectionObserver.
 * El estilo lo maneja CSS con el atributo [data-reveal] (ver globals.css).
 * Respeta prefers-reduced-motion (CSS lo muestra siempre en ese caso).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.15,
  once = true,
}: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sin soporte de IO: mostrar directamente.
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-reveal", "shown");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "shown");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.setAttribute("data-reveal", "");
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return ref;
}
