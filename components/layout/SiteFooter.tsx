import Link from "next/link";
import { CONTACT, FOOTER_LINKS, SITE, whatsappHref } from "@/lib/site";
import { WhatsAppFab } from "./WhatsAppFab";

export function SiteFooter() {
  const year = 2025; // Fundación de la marca; estático para evitar drift.

  return (
    <footer className="relative overflow-hidden bg-verde text-cream">
      <WhatsAppFab />

      <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-4 sm:px-8">
        {/* Columnas */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          <nav aria-label="Páginas" className="flex flex-col gap-3">
            <p className="eyebrow text-cream/50">Navegá</p>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-cream/90 transition-colors hover:text-naranja"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="eyebrow text-cream/50">Escribinos</p>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="w-fit text-cream/90 transition-colors hover:text-naranja">
              WhatsApp
            </a>
            <a href={`mailto:${CONTACT.email}`} className="w-fit text-cream/90 transition-colors hover:text-naranja">
              {CONTACT.email}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow text-cream/50">Seguinos</p>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="w-fit text-cream/90 transition-colors hover:text-naranja">
              Instagram {CONTACT.instagramHandle}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow text-cream/50">Dónde</p>
            <p className="text-cream/90">{CONTACT.location}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.fullName}. Curated journeys for modern explorers.
          </p>
          <p>Hecho con criterio en {CONTACT.location}.</p>
        </div>
      </div>
    </footer>
  );
}
