import { type ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Ancho del contenedor interno. */
  width?: "wide" | "default" | "narrow";
}

const WIDTH = {
  wide: "max-w-[1400px]",
  default: "max-w-[1180px]",
  narrow: "max-w-[820px]",
} as const;

/** Sección con padding vertical de marca y contenedor centrado. */
export function Section({ id, children, className = "", width = "default" }: SectionProps) {
  return (
    <section id={id} className={`py-[var(--spacing-section)] ${className}`}>
      <div className={`mx-auto ${WIDTH[width]} px-5 sm:px-8`}>{children}</div>
    </section>
  );
}

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Etiqueta superior de sección (kicker). */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2 ${className}`}>
      <span className="h-px w-6 bg-current opacity-50" />
      {children}
    </span>
  );
}
