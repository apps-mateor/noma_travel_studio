import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FilmImage } from "@/components/ui/FilmImage";
import { Button } from "@/components/ui/Button";
import { DESTINOS } from "@/lib/content";

/**
 * Destinos — carrusel horizontal con scroll-snap (sin JS), formato
 * "tira de película" editorial. Cada tarjeta es un destino curado.
 */
export function Destinos() {
  return (
    <Section id="destinos" className="bg-verde text-cream" width="wide">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow className="text-cream/50">A dónde</Eyebrow>
          <h2 className="display mt-5 text-[clamp(2rem,5vw,4rem)]">
            Destinos con mirada
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-sm font-serif leading-relaxed text-cream/75">
            No las fotos típicas de siempre. Lugares elegidos por lo que se vive
            en ellos —arrastrá para explorar.
          </p>
        </Reveal>
      </div>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
        {DESTINOS.map((d, i) => (
          <Reveal
            key={d.name}
            delay={(i % 3) * 80}
            className="w-[78vw] shrink-0 snap-start sm:w-[42vw] lg:w-[27vw]"
          >
            <article className="group">
              <div className="relative overflow-hidden rounded-2xl">
                <FilmImage
                  seed={d.seed}
                  alt={`${d.name}, ${d.place}`}
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 27vw"
                  className="aspect-[3/4] w-full [&>img]:transition-transform [&>img]:duration-700 [&>img]:group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-verde/85 px-3 py-1 font-display text-[0.62rem] uppercase tracking-[0.16em] backdrop-blur-sm">
                  0{i + 1} / {d.place}
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="display text-xl">{d.name}</h3>
                <span className="text-naranja transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-1 font-serif text-sm italic text-cream/70">{d.note}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-10">
          <Button href="/destinos" variant="outline" tone="cream">
            Ver todos los destinos
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
