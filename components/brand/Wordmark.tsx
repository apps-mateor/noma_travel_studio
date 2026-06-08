import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

interface WordmarkProps {
  className?: string;
  /** Altura del logo en utilidades Tailwind (ej: "h-7"). */
  size?: string;
  /** Si es link, a dónde navega. */
  href?: string;
}

/**
 * Wordmark de noma usando el logo real (lockup completo).
 * El color se controla con la clase de texto del contenedor
 * (currentColor), así se recolorea según el fondo.
 */
export function Wordmark({ className = "", size = "h-6 sm:h-7", href = "/" }: WordmarkProps) {
  const logo = <BrandLogo variant="full" className={size} />;

  if (!href) return <span className={className}>{logo}</span>;

  return (
    <Link href={href} aria-label="noma travel studio — inicio" className={`inline-block ${className}`}>
      {logo}
    </Link>
  );
}
