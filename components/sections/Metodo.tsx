import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PILARES } from "@/lib/content";

/**
 * Cómo trabajamos — los 4 pilares de "La promesa: tenemos con qué",
 * en una grilla editorial numerada (01–04).
 */
export function Metodo() {
  return (
    <Section id="metodo" className="bg-brown text-cream" width="wide">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Eyebrow className="text-cream/50">La promesa</Eyebrow>
          <h2 className="display mt-5 text-[clamp(2rem,5vw,4rem)]">
            Tenemos con qué
          </h2>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-5">
          <p className="font-serif text-lg leading-relaxed text-cream/80">
            Cuatro fundamentos que sostienen cada viaje. No es una promesa de
            marketing: es la forma en que trabajamos, de principio a fin.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-cream/15 sm:grid-cols-2">
        {PILARES.map((pilar, i) => (
          <Reveal key={pilar.n} delay={i * 80}>
            <article className="group flex h-full flex-col gap-4 bg-brown p-8 transition-colors duration-500 hover:bg-brown-soft sm:p-10">
              <div className="flex items-baseline justify-between">
                <span className="display text-naranja text-2xl">{pilar.n}</span>
                <span className="font-serif text-sm italic text-cream/40">
                  noma
                </span>
              </div>
              <h3 className="display text-xl sm:text-2xl">{pilar.title}</h3>
              <p className="font-serif leading-relaxed text-cream/80">{pilar.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
