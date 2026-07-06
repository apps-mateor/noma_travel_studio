import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CONCEPTO, PROPOSITO, PROPUESTA_VALOR } from "@/lib/content";

/**
 * Concepto creativo: la frase con el tachado de marca
 * ("se ~~piensa~~ cura para vos") + propósito + propuesta de valor.
 */
export function Concepto() {
  return (
    <Section id="concepto" className="bg-cream" width="default">
      <Reveal>
        <p className="font-serif text-[clamp(1.8rem,4.5vw,3.4rem)] leading-[1.12]">
          {CONCEPTO.pre}{" "}
          <span className="block sm:inline">
            {CONCEPTO.linePlain}{" "}
            <span className="relative italic text-brown-soft">
              <span className="line-through decoration-naranja decoration-2">
                {CONCEPTO.strike}
              </span>
            </span>{" "}
            {/* Palabra de marca resaltada: cursiva + tracking amplio */}
            <span
              className="hand text-naranja"
              style={{ fontSize: "1.25em", letterSpacing: "0.14em" }}
            >
              {CONCEPTO.word}
            </span>{" "}
            {CONCEPTO.post}
          </span>
        </p>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-10 max-w-2xl font-serif text-lg leading-relaxed text-brown/80">
          {PROPOSITO}
        </p>
      </Reveal>

      {/* Propuesta de valor en recuadros naranjas con letra crema */}
      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {PROPUESTA_VALOR.map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <div className="h-full rounded-2xl bg-naranja p-6 text-cream transition-transform duration-300 hover:-translate-y-1">
              <p className="display text-sm text-cream/80">0{i + 1}</p>
              <h3 className="mt-4 font-serif text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/85">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
