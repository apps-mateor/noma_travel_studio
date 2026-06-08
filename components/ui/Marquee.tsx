interface MarqueeProps {
  items: readonly string[];
  /** Duración del ciclo en segundos (mayor = más lento). */
  duration?: number;
  /** Separador entre items. */
  separator?: string;
  className?: string;
}

/**
 * Marquee horizontal infinito (CSS puro). Duplica el contenido para un
 * loop continuo. Se detiene con prefers-reduced-motion (ver globals.css).
 */
export function Marquee({
  items,
  duration = 38,
  separator = "✦",
  className = "",
}: MarqueeProps) {
  const row = (
    <ul className="marquee-track flex shrink-0 items-center gap-8 pr-8" aria-hidden>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-naranja opacity-70">{separator}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`flex overflow-hidden ${className}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {row}
      {row}
    </div>
  );
}
