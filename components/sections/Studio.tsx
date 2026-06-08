import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FilmImage } from "@/components/ui/FilmImage";
import { STUDIO, POSICIONAMIENTO } from "@/lib/content";

/**
 * El studio: historia real de la marca + imagen editorial superpuesta,
 * con el posicionamiento (Curaduría · Mirada · Criterio · Experiencia).
 */
export function Studio() {
  return (
    <Section id="studio" className="bg-celeste" width="wide">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        {/* Imagen con composición editorial (overlap) */}
        <Reveal className="relative lg:col-span-5">
          <FilmImage
            seed="noma-studio"
            alt="Viajera fotografiando una calle al atardecer"
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
              {STUDIO.title}
            </h2>
          </Reveal>

          <div className="mt-7 space-y-5">
            {STUDIO.body.map((p, i) => (
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
    </Section>
  );
}
