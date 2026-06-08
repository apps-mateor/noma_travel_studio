import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Seal } from "@/components/brand/Seal";
import { CONTACT, whatsappHref } from "@/lib/site";

const FIELD =
  "w-full rounded-xl border border-brown/20 bg-cream px-4 py-3 font-serif text-brown placeholder:text-brown/40 transition-colors focus:border-naranja focus:outline-none";

/**
 * Contacto — formulario visual (maquetado, no envía aún) + accesos
 * directos a WhatsApp, email e Instagram. El envío real se conecta luego.
 */
export function Contacto() {
  return (
    <Section id="contacto" className="bg-celeste" width="wide">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Intro */}
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow className="text-brown/60">Contacto</Eyebrow>
            <h2 className="display mt-5 text-[clamp(2rem,5vw,3.6rem)]">
              Contanos a dónde
              <br />
              te lleva la cabeza
            </h2>
            <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-brown/80">
              Escuchamos antes de proponer. Contanos el contexto, el momento y el
              estilo de viaje —el resto lo curamos nosotras.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col gap-3">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl bg-verde px-5 py-4 text-cream transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="font-display text-sm uppercase tracking-[0.16em]">
                  WhatsApp
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center justify-between rounded-xl border border-brown/25 px-5 py-4 text-brown transition-colors hover:border-naranja"
              >
                <span className="font-serif">{CONTACT.email}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-brown/25 px-5 py-4 text-brown transition-colors hover:border-naranja"
              >
                <span className="font-serif">Instagram {CONTACT.instagramHandle}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Formulario visual */}
        <Reveal delay={80} className="lg:col-span-7">
          <form
            // TODO: conectar el envío real (API route + servicio de email).
            className="relative rounded-3xl bg-cream p-6 shadow-[0_30px_60px_-30px_rgba(89,57,43,0.4)] sm:p-9"
            action={whatsappHref()}
            method="get"
          >
            <Seal className="absolute -top-8 right-6 hidden w-16 text-brown sm:block" />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="eyebrow text-brown/60">Nombre</span>
                <input className={FIELD} type="text" name="nombre" placeholder="Cómo te llamás" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="eyebrow text-brown/60">Email</span>
                <input className={FIELD} type="email" name="email" placeholder="tu@email.com" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="eyebrow text-brown/60">Tipo de viaje</span>
                <input className={FIELD} type="text" name="tipo" placeholder="Luna de miel, roadtrip…" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="eyebrow text-brown/60">¿Cuándo?</span>
                <input className={FIELD} type="text" name="fecha" placeholder="Aprox. mes / año" />
              </label>
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="eyebrow text-brown/60">Contanos un poco más</span>
                <textarea
                  className={`${FIELD} min-h-28 resize-y`}
                  name="mensaje"
                  placeholder="Qué te imaginás, qué te mueve, los 'sí o sí'…"
                />
              </label>
            </div>

            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brown px-7 py-4 font-display text-sm uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-naranja sm:w-auto"
            >
              Empezar a planear
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            <p className="mt-4 font-serif text-sm italic text-brown/55">
              Te respondemos a la brevedad. Sin urgencias, con criterio.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
