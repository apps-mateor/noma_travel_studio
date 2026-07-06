import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MANIFIESTO_LINES } from "@/lib/content";

/**
 * Manifiesto — declaración editorial en serif sobre fondo cálido.
 */
export function Manifiesto() {
  return (
    <Section id="manifiesto" className="bg-paper" width="narrow">
      <Reveal>
        <p className="hand text-naranja" style={{ fontSize: "1.8rem" }}>
          Manifiesto
        </p>
      </Reveal>
      <div className="mt-6 space-y-3">
        {MANIFIESTO_LINES.map((line, i) => (
          <Reveal key={i} delay={i * 70}>
            <p
              className={`font-serif leading-[1.18] ${
                i === 0
                  ? "text-[clamp(1.7rem,4.5vw,3rem)]"
                  : "text-[clamp(1.3rem,3.2vw,2.1rem)] text-brown/80"
              }`}
            >
              {line}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
