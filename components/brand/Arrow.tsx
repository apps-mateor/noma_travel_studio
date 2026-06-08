interface ArrowProps {
  className?: string;
}

/**
 * Flecha gestural real de la marca (NOMA_FLECHA_00) como máscara CSS,
 * recoloreable con `currentColor`. El tamaño lo define la className
 * (altura) y el ancho sale del aspect-ratio del trazo (355×153).
 */
export function Arrow({ className = "" }: ArrowProps) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
      style={{
        aspectRatio: "355 / 153",
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/brand/flecha.png)",
        maskImage: "url(/brand/flecha.png)",
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
