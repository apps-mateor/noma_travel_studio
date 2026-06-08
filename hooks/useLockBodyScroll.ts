"use client";

import { useEffect } from "react";

/** Bloquea el scroll del body mientras `locked` sea true (menú móvil abierto). */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}
