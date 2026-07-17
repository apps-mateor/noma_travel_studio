import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Metodo } from "@/components/sections/Metodo";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { STUDIO, POSICIONAMIENTO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio",
  description: "Detrás de noma: curaduría, mirada, criterio y experiencia real.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        kicker="El studio"
        title="Detrás de todo, nosotras"
        intro="Nacimos de una pasión compartida por viajar y de una forma muy particular de hacerlo: con curiosidad, criterio y atención a los detalles que importan."
        seed="noma-studio-hero"
      />

      <Section className="bg-cream" width="narrow">
        <div className="space-y-6">
          {STUDIO.body.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="font-serif text-[clamp(1.2rem,2.5vw,1.6rem)] leading-relaxed">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <ul className="mt-12 flex flex-wrap gap-x-4 gap-y-3">
            {POSICIONAMIENTO.map((word, i) => (
              <li key={word} className="flex items-center gap-4">
                <span className="display text-2xl sm:text-4xl">{word}</span>
                {i < POSICIONAMIENTO.length - 1 && <span className="text-naranja">+</span>}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Metodo />
      <Manifiesto />
    </>
  );
}
