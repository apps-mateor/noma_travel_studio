import { CONTACT, whatsappHref } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface WhatsAppFabProps {
  /** Link wa.me (viene del número cargado en el admin). */
  whatsappLink?: string;
}

/**
 * Botón flotante de WhatsApp (esquina inferior derecha).
 * El número se carga en el admin (sección Contacto); fallback en lib/site.ts.
 */
export function WhatsAppFab({ whatsappLink = CONTACT.whatsappLink }: WhatsAppFabProps) {
  return (
    <a
      href={whatsappHref(undefined, whatsappLink)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-verde py-3 pl-3 pr-5 text-cream shadow-[0_14px_34px_-10px_rgba(43,64,45,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-cream/15">
        <WhatsAppIcon />
      </span>
      <span className="hidden text-sm font-display uppercase tracking-[0.16em] sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
