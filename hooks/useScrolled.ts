"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve true cuando el scroll vertical supera `threshold` px.
 * Se usa para condensar el header sobre el hero.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
