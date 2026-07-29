"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

interface AnchorLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Ruta con ancla ("/#destinos") o ruta común ("/destinos/milos"). */
  href: string;
  children: ReactNode;
}

/**
 * Link a una sección de la misma página.
 *
 * Estando ya en la ruta destino no usa el router: scrollea a mano y deja la
 * URL como está (sin "#destinos" colgando y conservando los parámetros de
 * campaña del link de Instagram).
 *
 * Por qué no alcanza <Link>: el router de Next sólo scrollea a un ancla
 * cuando *únicamente* cambia el hash — compara pathname Y search. Entrando
 * con ?utm_source=ig&fbclid=… ir a "/#destinos" cambiaba el search, no
 * contaba como navegación de ancla y la página no se movía: el menú parecía
 * muerto. (Sólo pasa en producción, en `next dev` no se reproduce.)
 *
 * El href real se mantiene en el <a>: sin JS, o al copiar/abrir en pestaña
 * nueva, el ancla funciona igual. Fuera de la ruta destino es un <Link>.
 */
export function AnchorLink({ href, children, onClick, ...rest }: AnchorLinkProps) {
  const pathname = usePathname();
  const [path, hash] = href.split("#");
  // path vacío = el href ya era sólo un hash.
  const esMismaPagina = (path || pathname) === pathname;

  if (!esMismaPagina) {
    return (
      <Link href={href} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  const manejarClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);

    // Respetar "abrir en pestaña nueva" y los clicks ya cancelados.
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    const destino = hash ? document.getElementById(hash) : null;
    // Sin ancla (ej. "Home" estando en la home) → al tope.
    if (!hash) {
      e.preventDefault();
      window.scrollTo({ top: 0 });
      return;
    }
    // Si la sección no está en el DOM, que el navegador haga lo suyo.
    if (!destino) return;

    e.preventDefault();
    destino.scrollIntoView();
    // El salto nativo también mueve el foco: replicarlo mantiene el sitio
    // navegable con teclado y lector de pantalla.
    destino.setAttribute("tabindex", "-1");
    destino.focus({ preventScroll: true });
  };

  return (
    <a href={`#${hash || "top"}`} onClick={manejarClick} {...rest}>
      {children}
    </a>
  );
}
