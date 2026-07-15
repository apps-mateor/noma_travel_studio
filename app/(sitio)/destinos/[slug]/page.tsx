import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FilmImage } from "@/components/ui/FilmImage";
import { ContactForm } from "@/components/sections/ContactForm";
import { GuiaBloques, indiceDeGuia } from "@/components/guia/GuiaBloques";
import { GuiaGaleria } from "@/components/guia/GuiaGaleria";
import { GuiaIndice } from "@/components/guia/GuiaIndice";
import { getGuia, getGuias, imgUrl } from "@/lib/cms";
import { CONTACT } from "@/lib/site";

// ──────────────────────────────────────────────────────────────────
//  Guía de viaje pública — /destinos/<slug>.
//  El contenido se arma en el admin (Guías de viaje) y termina en el
//  formulario de leads con el nombre de la guía en el asunto.
// ──────────────────────────────────────────────────────────────────

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const guias = await getGuias();
  return guias
    .filter((g): g is typeof g & { slug: string } => Boolean(g.slug))
    .map((g) => ({ slug: stegaClean(g.slug) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const { guia } = await getGuia(slug);
  if (!guia) return { title: "Guía no encontrada" };

  const portada = imgUrl(guia.fotos?.[0], 1200);
  return {
    title: stegaClean(guia.titulo),
    description:
      stegaClean(guia.intro) ??
      "Una guía de viaje curada por noma travel studio, con mirada propia.",
    openGraph: portada ? { images: [{ url: portada, width: 1200 }] } : undefined,
  };
}

export default async function GuiaPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { guia, contacto } = await getGuia(slug);
  if (!guia) notFound();

  // stegaClean: estos valores viajan a FormSubmit / metadatos; las marcas
  // invisibles del modo borrador los romperían.
  const email = stegaClean(contacto?.email) || CONTACT.email;
  const nombreGuia = stegaClean(guia.titulo) ?? "guía de viaje";
  const asunto = `Quiero más info: ${nombreGuia}`;
  const indice = indiceDeGuia(guia.bloques);

  const fotos = (guia.fotos ?? []).filter((f) => f?.asset?._ref);
  // Con "Foto de cabecera" cargada, toda la galería va abajo; si no
  // (guías viejas), la primera foto de la galería hace de portada.
  const hayPortada = Boolean(guia.portada?.asset?._ref);
  const portada = imgUrl(hayPortada ? guia.portada : fotos[0], 1800);
  const galeria = (hayPortada ? fotos : fotos.slice(1))
    .map((f) => imgUrl(f, 1600))
    .filter((src): src is string => Boolean(src));

  return (
    <>
      {/* Portada — misma estructura que PageHero pero con la foto del CMS */}
      <section className="relative overflow-hidden bg-verde text-cream">
        <FilmImage
          seed={`noma-guia-${slug}`}
          src={portada}
          alt=""
          priority
          wash={0.4}
          sizes="100vw"
          mode="cover"
          className="opacity-60"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(43,64,45,0.55), rgba(89,57,43,0.78))",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-[1180px] px-5 pb-20 pt-40 sm:px-8 sm:pb-24 sm:pt-48">
          <Eyebrow className="text-cream/60">{guia.etiqueta ?? "Guía de viaje"}</Eyebrow>
          <h1 className="display mt-5 max-w-4xl text-[clamp(1.9rem,5.5vw,4.2rem)]">
            {guia.titulo}
          </h1>
          {guia.intro && (
            <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-cream/85">
              {guia.intro}
            </p>
          )}
        </div>
      </section>

      {/* Galería de cabecera: 1 grande + 2 apiladas y "Ver galería" */}
      {galeria.length > 0 && (
        <div className="bg-cream">
          <div className="mx-auto max-w-[1180px] px-5 pt-10 sm:px-8">
            <GuiaGaleria fotos={galeria} nombre={nombreGuia} />
          </div>
        </div>
      )}

      {/* Contenido de la guía + índice lateral (sticky en desktop) */}
      <Section className="bg-cream !pt-12 !pb-16 sm:!pt-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="order-2 max-w-[720px] lg:order-1">
            <GuiaBloques bloques={guia.bloques} />
          </article>
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-28">
              <GuiaIndice
                indice={indice}
                email={email}
                whatsapp={stegaClean(contacto?.whatsapp)}
                nombreGuia={nombreGuia}
              />
            </div>
          </aside>
        </div>
      </Section>

      {/* Leads: el asunto lleva el nombre de la guía */}
      <Section id="consulta" className="bg-celeste !pt-16 !pb-14">
        <div className="mx-auto max-w-[820px]">
          <Reveal>
            <Eyebrow className="text-brown/60">Este viaje</Eyebrow>
            <h2 className="display mt-5 text-[clamp(1.8rem,4.5vw,3rem)]">
              Quiero más información
            </h2>
            <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-brown/80">
              Contanos quiénes viajan y cuándo, y armamos este viaje a tu medida.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-9">
            <ContactForm email={email} placeholders={contacto?.formulario} asunto={asunto} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
