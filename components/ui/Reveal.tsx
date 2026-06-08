"use client";

import { type ElementType, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  /** Retraso de entrada en ms (para escalonar elementos). */
  delay?: number;
  /** Elemento a renderizar (default div). */
  as?: ElementType;
  className?: string;
}

/**
 * Envuelve contenido y lo revela al entrar en viewport.
 * La animación vive en CSS ([data-reveal]); respeta reduced-motion.
 */
export function Reveal({ children, delay = 0, as, className }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={className}
    >
      {children}
    </Tag>
  );
}
