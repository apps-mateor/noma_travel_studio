import { CONTACT, whatsappHref, whatsappLinkFromNumber } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

// ──────────────────────────────────────────────────────────────────
//  Columna lateral de la guía (como el índice de Mogu):
//  CTA "Estoy interesado" → ancla al formulario, índice de secciones
//  y la tarjeta "Tu contacto" con los datos del studio.
//  En mobile aparece arriba del contenido; en desktop queda pegada
//  al costado mientras se scrollea.
// ──────────────────────────────────────────────────────────────────

interface GuiaIndiceProps {
  /** Secciones de la guía: [{ id, titulo }] (ver indiceDeGuia). */
  indice: { id: string; titulo: string }[];
  /** Email de contacto (el del admin, con fallback al de código). */
  email: string;
  /** WhatsApp: el de la guía si tiene, si no el de la sección Contacto. */
  whatsapp?: string;
  /** Quién firma la guía (campo "Tu contacto" del admin). */
  agente?: string;
  /** Nombre de la guía, para el mensaje pre-cargado de WhatsApp. */
  nombreGuia?: string;
}

export function GuiaIndice({ indice, email, whatsapp, agente, nombreGuia }: GuiaIndiceProps) {
  const telefono = whatsappHref(
    nombreGuia ? `Hola noma, quiero más info sobre ${nombreGuia}.` : undefined,
    whatsappLinkFromNumber(whatsapp),
  );

  return (
    <div className="flex flex-col gap-5">
      {/* CTA → baja al formulario de la guía */}
      <a
        href="#consulta"
        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-naranja px-7 py-4 text-center font-display text-sm uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown"
      >
        Estoy interesado
        <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
      </a>

      {/* Índice de secciones */}
      {indice.length > 0 && (
        <nav
          aria-label="Secciones de la guía"
          className="rounded-2xl border border-brown/15 bg-paper px-6 py-5"
        >
          <span className="eyebrow text-brown/50">En esta guía</span>
          <ul className="mt-4 space-y-3">
            {indice.map((seccion) => (
              <li key={seccion.id}>
                <a
                  href={`#${seccion.id}`}
                  className="font-display text-[0.72rem] uppercase leading-snug tracking-[0.14em] text-brown underline decoration-brown/25 decoration-2 underline-offset-4 transition-colors hover:text-naranja hover:decoration-naranja"
                >
                  {seccion.titulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Tu contacto */}
      <div className="rounded-2xl border border-brown/15 bg-paper px-6 py-5">
        <span className="eyebrow text-brown/50">Tu contacto</span>
        <p className="mt-4 font-display text-sm uppercase tracking-[0.14em] text-brown">
          {agente || CONTACT.agente}
        </p>
        <p className="mt-1 font-serif italic text-brown/70">noma travel studio</p>
        <div className="mt-4 flex flex-col gap-2.5">
          <a
            href={`mailto:${email}`}
            className="break-all font-serif text-sm text-brown/80 transition-colors hover:text-naranja"
          >
            {email}
          </a>
          <a
            href={telefono}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-serif text-sm text-brown/80 transition-colors hover:text-naranja"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-verde text-cream transition-transform duration-300 group-hover:scale-105">
              <WhatsAppIcon className="h-4 w-4" />
            </span>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
