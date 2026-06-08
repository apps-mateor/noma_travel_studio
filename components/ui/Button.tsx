import Link from "next/link";
import { type ReactNode } from "react";
import { Arrow } from "@/components/brand/Arrow";

type Variant = "solid" | "outline" | "ghost";
type Tone = "brown" | "naranja" | "cream" | "verde";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  /** Abrir en nueva pestaña (links externos). */
  external?: boolean;
}

const TONE: Record<Tone, { solidBg: string; solidText: string; line: string; text: string }> = {
  brown: { solidBg: "bg-brown", solidText: "text-cream", line: "border-brown", text: "text-brown" },
  naranja: { solidBg: "bg-naranja", solidText: "text-cream", line: "border-naranja", text: "text-naranja" },
  cream: { solidBg: "bg-cream", solidText: "text-brown", line: "border-cream", text: "text-cream" },
  verde: { solidBg: "bg-verde", solidText: "text-cream", line: "border-verde", text: "text-verde" },
};

/**
 * Botón/CTA pill con estados hover/focus diseñados.
 * Renderiza un <Link> (interno) o <a> (externo).
 */
export function Button({
  children,
  href,
  variant = "solid",
  tone = "brown",
  className = "",
  external = false,
}: ButtonProps) {
  const t = TONE[tone];
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-display uppercase tracking-[0.16em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-offset-4";

  const variantClass =
    variant === "solid"
      ? `${t.solidBg} ${t.solidText} hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(89,57,43,0.5)]`
      : variant === "outline"
        ? `border ${t.line} ${t.text} hover:bg-current/5`
        : `${t.text} hover:opacity-70`;

  const inner = (
    <>
      <span>{children}</span>
      <Arrow className="h-2.5 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );

  const classes = `${base} ${variantClass} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
