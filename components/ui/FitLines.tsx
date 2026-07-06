"use client";

import { Children, useLayoutEffect, useRef, useState, type ReactNode } from "react";

interface FitLinesProps {
  /** Una entrada por línea del lockup. */
  children: ReactNode[];
}

/**
 * Lockup editorial "justificado sin espacios": la primera línea marca el
 * ancho (a su tamaño natural, limitado por el contenedor) y las demás
 * escalan su font-size para calzar exactamente en ese mismo ancho.
 */
export function FitLines({ children }: FitLinesProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = Array.from(el.children) as HTMLElement[];
    if (!lines.length) return;

    const fit = () => {
      const rootStyle = getComputedStyle(el);
      const base = parseFloat(rootStyle.fontSize);

      // El letter-spacing se hereda como px computados: re-aplicarlo en em
      // sobre cada línea para que escale junto con su font-size.
      const lsPx = parseFloat(rootStyle.letterSpacing);
      const lsEm = Number.isNaN(lsPx) ? null : lsPx / base;

      lines.forEach((l) => {
        l.style.fontSize = "";
        if (lsEm !== null) l.style.letterSpacing = `${lsEm}em`;
      });

      const widths = lines.map((l) => l.getBoundingClientRect().width);
      const max = el.parentElement?.clientWidth ?? widths[0];
      const target = Math.min(widths[0], max);
      lines.forEach((l, i) => {
        if (widths[i] > 0) l.style.fontSize = `${(base * target) / widths[i]}px`;
      });

      // Pasada correctiva: absorbe redondeos y no-linealidades del render.
      lines.forEach((l) => {
        const w = l.getBoundingClientRect().width;
        if (w > 0) {
          const fs = parseFloat(l.style.fontSize);
          l.style.fontSize = `${(fs * target) / w}px`;
        }
      });

      setReady(true);
    };

    fit();
    // Re-ajustar cuando cargan las fuentes reales y al cambiar el viewport.
    document.fonts?.ready.then(fit).catch(() => fit());
    const ro = new ResizeObserver(fit);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, [children]);

  return (
    <span
      ref={ref}
      className="mx-auto block w-fit"
      style={{ visibility: ready ? "visible" : "hidden" }}
    >
      {/* w-max: cada línea mide su contenido real, no el ancho del padre */}
      {Children.map(children, (line) => (
        <span className="block w-max whitespace-nowrap">{line}</span>
      ))}
    </span>
  );
}
