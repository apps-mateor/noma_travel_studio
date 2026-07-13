import { Fragment } from "react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AutoCarousel } from "@/components/ui/AutoCarousel";
import { FilmImage } from "@/components/ui/FilmImage";
import { FitLines } from "@/components/ui/FitLines";
import { TeamCard } from "@/components/sections/TeamCard";
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

      {/* Equipo — en mobile: carrusel que avanza solo y se swipea a mano;
          la bio se despliega sobre la foto (tap en touch, hover en desktop). */}
      <AutoCarousel className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
        {equipo.map((persona, i) => (
          <Reveal
            key={persona.seed}
            delay={i * 90}
            className="w-[76vw] shrink-0 snap-center sm:w-auto"
          >
            <TeamCard
              name={persona.name}
              role={persona.role}
              bio={persona.bio}
              seed={persona.seed}
              src={persona.src}
            />
          </Reveal>
        ))}
      </AutoCarousel>
    </Section>
  );
}
