import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FilmImage } from "@/components/ui/FilmImage";
import { SERVICIOS } from "@/lib/content";

/**
 * Servicios — tarjetas editoriales con imagen, tag y descripción.
 * Hover: zoom de imagen + el tag se ilumina (estados diseñados).
 */
export function Servicios() {
  return (
    <Section id="servicios" className="bg-cream" width="wide">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow className="text-brown/60">Qué hacemos</Eyebrow>
          <h2 className="display mt-5 text-[clamp(2rem,5vw,4rem)]">
            Formas de viajar
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="hand text-naranja" style={{ fontSize: "1.6rem" }}>
            elegimos este lugar para vos
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {SERVICIOS.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 90}>
            <article className="group relative overflow-hidden rounded-2xl bg-brown text-cream">
              <FilmImage
                seed={s.seed}
                alt={`${s.title} — ${s.tag}`}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="aspect-[16/11] w-full [&>img]:group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 font-display text-[0.68rem] uppercase tracking-[0.16em] text-brown transition-colors duration-300 group-hover:bg-naranja group-hover:text-cream">
                {s.tag}
              </div>
              <div className="p-7">
                <h3 className="display text-xl sm:text-2xl">{s.title}</h3>
                <p className="mt-3 font-serif leading-relaxed text-cream/80">{s.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
