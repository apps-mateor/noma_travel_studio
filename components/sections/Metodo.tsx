import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PILARES, PASOS } from "@/lib/content";
import type { CmsComoTrabajamos } from "@/lib/cms";

interface MetodoProps {
  data?: CmsComoTrabajamos | null;
}

/**
 * Cómo trabajamos — los 4 pilares de la promesa (sin numeración)
 * + el proceso "cómo lo hacemos" en 4 pasos, sin título propio.
 */
export function Metodo({ data }: MetodoProps) {
  const pilares = data?.pilares?.length
    ? data.pilares.map((p) => ({ title: p.titulo ?? "", body: p.texto ?? "" }))
    : PILARES;
  const pasos = data?.pasos?.length
    ? data.pasos.map((p) => ({ title: p.titulo ?? "", body: p.texto ?? "" }))
    : PASOS;

  return (
    <Section id="metodo" className="bg-brown text-cream" width="wide">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Eyebrow className="text-cream/50">La promesa</Eyebrow>
          <h2 className="display mt-5 text-[clamp(2rem,5vw,4rem)]">
            {data?.titulo ?? "Cómo trabajamos"}
          </h2>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-5">
          <p className="font-serif text-lg leading-relaxed text-cream/80">
            {data?.intro ??
              "Cuatro fundamentos que sostienen cada viaje. No es una promesa de marketing: es la forma en que trabajamos, de principio a fin."}
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-cream/15 sm:grid-cols-2">
        {pilares.map((pilar, i) => (
          <Reveal key={pilar.title} delay={i * 80}>
            <article className="group flex h-full flex-col gap-4 bg-brown p-8 transition-colors duration-500 hover:bg-brown-soft sm:p-10">
              <div className="flex items-baseline justify-between">
                <h3 className="display text-xl sm:text-2xl">{pilar.title}</h3>
                <span className="font-serif text-sm italic text-cream/40">
                  noma
                </span>
              </div>
              <p className="font-serif leading-relaxed text-cream/80">{pilar.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* El proceso, paso a paso (sin título, pedido de la marca) */}
      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {pasos.map((paso, i) => (
          <Reveal key={paso.title} delay={i * 90}>
            <div className="flex h-full flex-col gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-cream/40 font-display text-lg text-naranja">
                {i + 1}
              </span>
              {/* flex-1: el título absorbe la altura sobrante y la línea
                  divisoria queda alineada entre las 4 columnas */}
              <h3 className="display flex-1 text-lg leading-snug">{paso.title}</h3>
              <p className="border-t border-cream/20 pt-3 font-serif text-sm leading-relaxed text-cream/75">
                {paso.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
