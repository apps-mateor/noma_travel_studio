import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Seal } from "@/components/brand/Seal";
import { ContactForm } from "@/components/sections/ContactForm";
import {
  CONTACT,
  instagramUrl,
  whatsappHref,
  whatsappLinkFromNumber,
} from "@/lib/site";
import { stegaClean } from "next-sanity";
import type { CmsContacto } from "@/lib/cms";

interface ContactoProps {
  data?: CmsContacto | null;
}

/**
 * Contacto — formulario que arma el mensaje de WhatsApp con los datos
 * cargados + accesos directos a WhatsApp, email e Instagram.
 * El número, email e Instagram se editan en el admin (sección Contacto).
 */
export function Contacto({ data }: ContactoProps) {
  const whatsappLink = whatsappLinkFromNumber(data?.whatsapp);
  // stegaClean: el email arma el mailto y el endpoint de FormSubmit; las
  // marcas invisibles del modo borrador de Sanity lo romperían.
  const email = stegaClean(data?.email) || CONTACT.email;
  const instagramHandle = data?.instagram || CONTACT.instagramHandle;

  return (
    <Section id="contacto" className="bg-celeste !pb-14" width="wide">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Intro */}
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow className="text-brown/60">Escribinos</Eyebrow>
            <h2 className="display mt-5 text-[clamp(2rem,5vw,3.6rem)]">
              {data?.titulo ?? "Contacto"}
            </h2>
            <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-brown/80">
              {data?.intro ??
                "Escuchamos antes de proponer. Contanos el contexto, el momento y el estilo de viaje —el resto lo curamos nosotras."}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col gap-3">
              <a
                href={whatsappHref(undefined, whatsappLink)}
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
                href={`mailto:${email}`}
                className="group flex items-center justify-between rounded-xl border border-brown/25 px-5 py-4 text-brown transition-colors hover:border-naranja"
              >
                <span className="font-serif">{email}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href={instagramUrl(instagramHandle)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-brown/25 px-5 py-4 text-brown transition-colors hover:border-naranja"
              >
                <span className="font-serif">Instagram {instagramHandle}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>

          {/* Sello giratorio "curated by noma" */}
          <Reveal delay={200}>
            <Seal className="mt-14 w-28 text-brown md:w-36" />
          </Reveal>
        </div>

        {/* Formulario — la consulta llega por email a la casilla del admin */}
        <Reveal delay={80} className="lg:col-span-7">
          <ContactForm email={email} placeholders={data?.formulario} />
        </Reveal>
      </div>
    </Section>
  );
}
