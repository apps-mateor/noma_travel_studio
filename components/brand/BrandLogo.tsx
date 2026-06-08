interface BrandLogoProps {
  /** "full" = noma travel studio · "mark" = sólo "noma". */
  variant?: "full" | "mark";
  className?: string;
  title?: string;
}

// Cada variante es un PNG real con su propio aspect-ratio.
const ASSET = {
  full: { src: "/brand/noma-logo.png", ratio: "1463 / 255" },
  mark: { src: "/brand/noma-mark.png", ratio: "1065 / 255" },
} as const;

/**
 * Logo real de noma renderizado como máscara CSS → se pinta con
 * `currentColor`, así un único asset se recolorea según el contexto
 * (crema sobre verde, marrón sobre claro, naranja como acento).
 * La altura la define la className; el ancho sale del aspect-ratio.
 */
export function BrandLogo({
  variant = "full",
  className = "",
  title = "noma travel studio",
}: BrandLogoProps) {
  const { src, ratio } = ASSET[variant];
  return (
    <span
      role="img"
      aria-label={title}
      className={`block w-auto ${className}`}
      style={{
        aspectRatio: ratio,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
