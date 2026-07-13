import { Fragment } from "react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AutoCarousel } from "@/components/ui/AutoCarousel";
import { FilmImage } from "@/components/ui/FilmImage";
import { FitLines } from "@/components/ui/FitLines";
import { STUDIO, POSICIONAMIENTO, EQUIPO } from "@/lib/content";
import { imgUrl, type CmsQuienesSomos } from "@/lib/cms";

interface StudioProps {
  data?: CmsQuienesSomos | null;
}

/**
 * Quiénes somos: historia real de la marca + foto de equipo, el
 * posicionamiento (Curaduría · Mirada · Criterio · Experiencia) y
 * las 3 fotos individuales con bio al hover.
 */
export function Studio({ data }: StudioProps) {
  const parrafos = data?.parrafos?.length ? data.parrafos : STUDIO.body;
  const equipo = data?.equipo?.length
    ? data.equipo.map((p, i) => ({
        name: p.nombre ?? "",
        role: p.rol ?? "",
        bio: p.bio ?? "",
        seed: `noma-equipo-${i + 1}`,
        src: imgUrl(p.foto, 900),
      }))
    : EQUIPO.map((p) => ({ ...p, src: undefined as string | undefined }));

  return (
    <Section id="studio" className="bg-celeste" width="wide">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        {/* Imagen con composición editorial (overlap) */}
        <Reveal className="relative lg:col-span-5">
          <FilmImage
            seed="noma-studio"
            src={imgUrl(data?.fotoEquipo, 1200)}
            alt="El equipo de noma"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="aspect-[4/5] w-full rounded-2xl"
          />
          <div className="absolute -bottom-5 -right-3 rounded-xl bg-brown px-5 py-4 text-cream shadow-xl">
            <p className="hand text-naranja" style={{ fontSize: "1.4rem" }}>
              Detrás de todo,
            </p>
            <p className="display text-sm">nosotras.</p>
          </div>
        </Reveal>

        {/* Texto — min-w-0: sin esto, el FitLines de abajo (líneas a ancho
            natural) estira la columna de la grilla y desborda en mobile */}
        <div className="min-w-0 lg:col-span-7 lg:pl-8">
          <Reveal>
            <Eyebrow className="text-brown/60">{STUDIO.kicker}</Eyebrow>
            <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.6rem)]">
              {data?.titulo ?? STUDIO.title}
            </h2>
          </Reveal>

          <div className="mt-7 space-y-5">
            {parrafos.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className="max-w-xl font-serif text-lg leading-relaxed text-brown/85">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            {/* Posicionamiento en una sola línea: FitLines lo escala al
                ancho de la columna en cualquier pantalla */}
            <p className="display mt-9 text-2xl text-brown">
              <FitLines>
                {[
                  <Fragment key="posicionamiento">
                    {POSICIONAMIENTO.map((word, i) => (
                      <Fragment key={word}>
                        {word}
                        {i < POSICIONAMIENTO.length - 1 && (
                          <span className="text-naranja"> + </span>
                        )}
                      </Fragment>
                    ))}
                  </Fragment>,
                ]}
              </FitLines>
            </p>
          </Reveal>
        </div>
      </div>

      {/* Equipo — en mobile: carrusel que avanza solo y se swipea a mano,
          con rol y bio visibles bajo cada foto. Desde sm: grilla de 3 con
          la bio al hover. */}
      <AutoCarousel className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
        {equipo.map((persona, i) => (
          <Reveal
            key={persona.seed}
            delay={i * 90}
            className="w-[76vw] shrink-0 snap-center sm:w-auto"
          >
            {/* En mobile el tap no debe activar estados de foco (anillo
                naranja / ocultar nombre): son sólo para teclado en desktop */}
            <article
              className="group relative overflow-hidden rounded-2xl focus-visible:outline-none sm:focus-visible:outline-2 sm:focus-visible:outline-offset-[3px] sm:focus-visible:outline-naranja"
              tabIndex={0}
            >
              <FilmImage
                seed={persona.seed}
                src={persona.src}
                alt={`${persona.name} — ${persona.role}`}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="aspect-[3/4] w-full [&>img]:group-hover:scale-105"
              />
              {/* Nombre siempre visible (en desktop se esconde al mostrar la bio) */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-verde/90 to-transparent p-5 pt-14 text-cream transition-opacity duration-500 sm:group-hover:opacity-0 sm:group-focus-within:opacity-0">
                <h3 className="display text-lg">{persona.name}</h3>
              </div>
              {/* Overlay con bio al hover / foco (sólo desktop) */}
              <div className="absolute inset-0 hidden flex-col justify-end bg-verde/90 p-6 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 sm:flex">
                <p className="hand text-naranja" style={{ fontSize: "1.3rem" }}>
                  {persona.role}
                </p>
                <h3 className="display mt-2 text-lg">{persona.name}</h3>
                <p className="mt-3 font-serif text-sm leading-relaxed text-cream/85">
                  {persona.bio}
                </p>
              </div>
            </article>

            {/* En mobile no hay hover: rol y bio visibles bajo la foto */}
            <div className="mt-3 px-1 sm:hidden">
              <p className="hand text-naranja" style={{ fontSize: "1.2rem" }}>
                {persona.role}
              </p>
              <p className="mt-1 font-serif text-sm leading-relaxed text-brown/80">
                {persona.bio}
              </p>
            </div>
          </Reveal>
        ))}
      </AutoCarousel>
    </Section>
  );
}
