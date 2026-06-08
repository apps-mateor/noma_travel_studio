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
            <span className="hand text-naranja" style={{ fontSize: "1.15em" }}>
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

      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brown/10 md:grid-cols-4">
        {PROPUESTA_VALOR.map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <div className="h-full bg-cream p-6">
              <p className="display text-sm text-naranja">0{i + 1}</p>
              <h3 className="mt-4 font-serif text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brown/70">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
