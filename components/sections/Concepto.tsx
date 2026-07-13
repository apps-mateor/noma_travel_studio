import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CONCEPTO, PROPOSITO, PROPUESTA_VALOR } from "@/lib/content";
import type { CmsConcepto } from "@/lib/cms";

interface ConceptoProps {
  data?: CmsConcepto | null;
}

/**
 * Concepto creativo: la frase de marca ("el mejor es el que se cura
 * para vos") + propósito + propuesta de valor.
 */
export function Concepto({ data }: ConceptoProps) {
  const recuadros = data?.recuadros?.length
    ? data.recuadros.map((r) => ({ title: r.titulo ?? "", body: r.texto ?? "" }))
    : PROPUESTA_VALOR;

  // Si la sección viene del CMS, manda lo cargado (vacío = no mostrarla);
  // sin CMS, el default de marca.
  const tachada = data ? data.palabraTachada : CONCEPTO.strike;

  return (
    <Section id="concepto" className="bg-cream" width="default">
      <Reveal>
        <p className="font-serif text-[clamp(1.8rem,4.5vw,3.4rem)] leading-[1.12]">
          {data?.fraseInicio ?? CONCEPTO.pre}{" "}
          <span className="block sm:inline">
            {data?.fraseMedio ?? CONCEPTO.linePlain}{" "}
            {/* Palabra tachada (gesto ~~piensa~~ cura del brandbook) */}
            {tachada && (
              <>
                <span className="italic text-brown-soft">
                  <span className="line-through decoration-naranja decoration-2">
                    {tachada}
                  </span>
                </span>{" "}
              </>
            )}
            {/* Palabra de marca resaltada: cursiva + tracking amplio */}
            <span
              className="hand text-naranja"
              style={{ fontSize: "1.25em", letterSpacing: "0.14em" }}
            >
              {data?.palabraDestacada ?? CONCEPTO.word}
            </span>{" "}
            {data?.fraseFin ?? CONCEPTO.post}
          </span>
        </p>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-10 max-w-2xl font-serif text-lg leading-relaxed text-brown/80">
          {data?.proposito ?? PROPOSITO}
        </p>
      </Reveal>

      {/* Propuesta de valor en recuadros naranjas con letra crema */}
      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {recuadros.map((item, i) => (
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
