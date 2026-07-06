import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FilmImage } from "@/components/ui/FilmImage";
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

        {/* Texto */}
        <div className="lg:col-span-7 lg:pl-8">
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
            <ul className="mt-9 flex flex-wrap gap-x-3 gap-y-2">
              {POSICIONAMIENTO.map((word, i) => (
                <li key={word} className="flex items-center gap-3">
                  <span className="display text-lg text-brown sm:text-2xl">{word}</span>
                  {i < POSICIONAMIENTO.length - 1 && (
                    <span className="text-naranja">+</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Equipo — hover (o foco) revela rol y background de cada una */}
      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {equipo.map((persona, i) => (
          <Reveal key={persona.seed} delay={i * 90}>
            <article className="group relative overflow-hidden rounded-2xl" tabIndex={0}>
              <FilmImage
                seed={persona.seed}
                src={persona.src}
                alt={`${persona.name} — ${persona.role}`}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="aspect-[3/4] w-full [&>img]:group-hover:scale-105"
              />
              {/* Nombre siempre visible */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-verde/90 to-transparent p-5 pt-14 text-cream transition-opacity duration-500 group-hover:opacity-0 group-focus-within:opacity-0">
                <h3 className="display text-lg">{persona.name}</h3>
              </div>
              {/* Overlay con bio al hover / foco */}
              <div className="absolute inset-0 flex flex-col justify-end bg-verde/90 p-6 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 group-focus:opacity-100">
                <p className="hand text-naranja" style={{ fontSize: "1.3rem" }}>
                  {persona.role}
                </p>
                <h3 className="display mt-2 text-lg">{persona.name}</h3>
                <p className="mt-3 font-serif text-sm leading-relaxed text-cream/85">
                  {persona.bio}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
