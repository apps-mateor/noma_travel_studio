"use client";

import { useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { CONTACT, NAV_LINKS, whatsappHref } from "@/lib/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface SiteHeaderProps {
  /** Link wa.me (viene del número cargado en el admin). */
  whatsappLink?: string;
}

export function SiteHeader({ whatsappLink = CONTACT.whatsappLink }: SiteHeaderProps) {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "bg-cream/85 py-3 shadow-[0_1px_0_rgba(89,57,43,0.1)] backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <Wordmark
          className={`transition-colors duration-500 ${scrolled ? "text-naranja" : "text-cream"}`}
        />

        {/* Nav desktop — color adaptable según scroll */}
        <nav
          aria-label="Navegación principal"
          className={`hidden items-center gap-9 transition-colors duration-500 lg:flex ${
            scrolled ? "text-brown" : "text-cream"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-display text-[0.78rem] uppercase tracking-[0.18em]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-naranja transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div
          className={`flex items-center gap-3 transition-colors duration-500 ${
            scrolled ? "text-brown" : "text-cream"
          }`}
        >
          {/* CTA naranja de marca (brandbook) */}
          <Link
            href="/#contacto"
            className="hidden rounded-full bg-naranja px-5 py-2 font-display text-[0.74rem] uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown sm:inline-block"
          >
            Planeá tu viaje
          </Link>

          {/* Toggle móvil */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center lg:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-3 block h-0.5 w-6 bg-current transition-all duration-300 ${
                  open ? "-rotate-45 !top-1.5" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Overlay móvil */}
      <div
        className={`fixed inset-0 top-0 z-40 flex flex-col bg-verde text-cream transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="display border-b border-cream/15 py-4 text-3xl"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappHref(undefined, whatsappLink)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="hand mt-6 text-3xl text-naranja"
          >
            Escribinos por WhatsApp →
          </a>
        </nav>
      </div>
    </header>
  );
}
