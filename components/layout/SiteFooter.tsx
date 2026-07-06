import Link from "next/link";
import { CONTACT, FOOTER_LINKS, SITE, instagramUrl, whatsappHref } from "@/lib/site";
import { WhatsAppFab } from "./WhatsAppFab";

interface SiteFooterProps {
  /** Datos de contacto cargados en el admin (fallback: lib/site.ts). */
  whatsappLink?: string;
  email?: string;
  instagramHandle?: string;
}

export function SiteFooter({
  whatsappLink = CONTACT.whatsappLink,
  email = CONTACT.email,
  instagramHandle = CONTACT.instagramHandle,
}: SiteFooterProps) {
  const year = 2025; // Fundación de la marca; estático para evitar drift.

  return (
    // Mismo celeste que la sección de contacto: cierran como un solo bloque.
    <footer className="relative overflow-hidden bg-celeste text-brown">
      <WhatsAppFab whatsappLink={whatsappLink} />

      <div className="mx-auto max-w-[1400px] border-t border-brown/15 px-5 pb-8 sm:px-8">
        {/* Columnas */}
        <div className="grid grid-cols-2 gap-8 py-8 md:grid-cols-4">
          <nav aria-label="Páginas" className="flex flex-col gap-3">
            <p className="eyebrow text-brown/50">Navegá</p>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-brown/90 transition-colors hover:text-naranja"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="eyebrow text-brown/50">Escribinos</p>
            <a href={whatsappHref(undefined, whatsappLink)} target="_blank" rel="noopener noreferrer" className="w-fit text-brown/90 transition-colors hover:text-naranja">
              WhatsApp
            </a>
            <a href={`mailto:${email}`} className="w-fit text-brown/90 transition-colors hover:text-naranja">
              {email}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow text-brown/50">Seguinos</p>
            <a href={instagramUrl(instagramHandle)} target="_blank" rel="noopener noreferrer" className="w-fit text-brown/90 transition-colors hover:text-naranja">
              Instagram {instagramHandle}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow text-brown/50">Dónde</p>
            <p className="text-brown/90">{CONTACT.location}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-xs text-brown/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.fullName}. Curated journeys for modern explorers.
          </p>
          <p>Hecho con criterio en {CONTACT.location}.</p>
        </div>
      </div>
    </footer>
  );
}
