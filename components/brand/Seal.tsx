interface SealProps {
  className?: string;
  /** Texto que rodea el sello. */
  text?: string;
  /** Color del trazo/letras (default currentColor). */
  color?: string;
  /** Mostrar el anillo de texto giratorio alrededor del sello. */
  withRing?: boolean;
}

/**
 * Sello circular real de la marca (NOMA-LOGO sello) como máscara CSS,
 * recoloreable con currentColor, rodeado por un anillo de texto
 * "curated by noma" que gira lento (se detiene con reduced-motion).
 */
export function Seal({
  className = "",
  text = "curated by noma · curated by noma · ",
  color = "currentColor",
  withRing = true,
}: SealProps) {
  return (
    <div className={`relative aspect-square select-none ${className}`} style={{ color }} aria-hidden>
      {/* Anillo de texto giratorio */}
      {withRing && (
        <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full">
          <defs>
            <path id="seal-ring" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" fill="none" />
          </defs>
          <text
            fill="currentColor"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "6.4px",
              letterSpacing: "1.3px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            <textPath href="#seal-ring" startOffset="0">
              {text}
            </textPath>
          </text>
        </svg>
      )}

      {/* Sello "noma" real (máscara recoloreable) al centro */}
      <span
        className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
        style={{
          width: withRing ? "62%" : "100%",
          aspectRatio: "440 / 374",
          backgroundColor: "currentColor",
          WebkitMaskImage: "url(/brand/noma-sello.png)",
          maskImage: "url(/brand/noma-sello.png)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </div>
  );
}
