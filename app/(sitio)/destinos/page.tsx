import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FilmImage } from "@/components/ui/FilmImage";
import { Contacto } from "@/components/sections/Contacto";
import { DESTINOS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Destinos",
  description:
    "Destinos curados con mirada propia: Japón, Toscana, Marruecos, Patagonia y más.",
};

export default function DestinosPage() {
  return (
    <>
      <PageHero
        kicker="A dónde"
        title="Destinos con mirada"
        intro="No las fotos típicas de siempre. Lugares elegidos por lo que se vive en ellos —y siempre, siempre, pensados para vos."
        seed="noma-destinos-hero"
      />

      <Section className="bg-cream" width="wide">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINOS.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 80}>
              <article className="group">
                <div className="relative overflow-hidden rounded-2xl">
                  <FilmImage
                    seed={d.seed}
                    alt={`${d.name}, ${d.place}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="aspect-[4/5] w-full [&>img]:transition-transform [&>img]:duration-700 [&>img]:group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-brown/85 px-3 py-1 font-display text-[0.62rem] uppercase tracking-[0.16em] text-cream backdrop-blur-sm">
                    {d.place}
                  </span>
                </div>
                <h2 className="display mt-4 text-2xl">{d.name}</h2>
                <p className="mt-1 font-serif italic text-brown/70">{d.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Contacto />
    </>
  );
}
