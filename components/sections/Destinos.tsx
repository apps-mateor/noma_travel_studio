import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FilmImage } from "@/components/ui/FilmImage";
import { DESTINOS } from "@/lib/content";
import { stegaClean } from "next-sanity";
import { imgUrl, type CmsDestinos } from "@/lib/cms";

interface DestinosProps {
  data?: CmsDestinos | null;
}

interface DestinoItem {
  name: string;
  place: string;
  note: string;
  link?: string;
  seed: string;
  src?: string;
}

/**
 * Tarjeta de un destino. Si tiene link (cargado en el admin), toda la
 * tarjeta es clickeable; los links externos abren en pestaña nueva.
 */
function DestinoCard({ destino: d, numero }: { destino: DestinoItem; numero: number }) {
  const inner = (
    <>
      <div className="relative overflow-hidden rounded-2xl">
        <FilmImage
          seed={d.seed}
          src={d.src}
          alt={`${d.name}, ${d.place}`}
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 27vw"
          className="aspect-[3/4] w-full [&>img]:transition-transform [&>img]:duration-700 [&>img]:group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-verde/85 px-3 py-1 font-display text-[0.62rem] uppercase tracking-[0.16em] backdrop-blur-sm">
          0{numero} / {d.place}
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="display text-xl">{d.name}</h3>
        <span className="text-naranja transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
      <p className="mt-1 font-serif text-sm italic text-cream/70">{d.note}</p>
    </>
  );

  if (d.link) {
    // stegaClean: sin esto, en modo borrador el link lleva caracteres
    // invisibles de Sanity y el href queda roto.
    const link = stegaClean(d.link);
    const externo = link.startsWith("http");
    return (
      <a
        href={link}
        className="group block"
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return <article className="group">{inner}</article>;
}

/**
 * Destinos — carrusel horizontal con scroll-snap (sin JS), formato
 * "tira de película" editorial. Cada tarjeta es un destino curado.
 */
export function Destinos({ data }: DestinosProps) {
  const destinos = data?.lista?.length
    ? data.lista.map((d, i) => ({
        name: d.nombre ?? "",
        place: d.lugar ?? "",
        note: d.nota ?? "",
        link: d.link || undefined,
        seed: `noma-destino-${i + 1}`,
        src: imgUrl(d.foto, 1000),
      }))
    : DESTINOS.map((d) => ({
        ...d,
        link: undefined as string | undefined,
        src: undefined as string | undefined,
      }));

  return (
    <Section id="destinos" className="bg-verde text-cream" width="wide">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow className="text-cream/50">A dónde</Eyebrow>
          <h2 className="display mt-5 text-[clamp(2rem,5vw,4rem)]">
            {data?.titulo ?? "Destinos con mirada"}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-sm font-serif leading-relaxed text-cream/75">
            {data?.intro ??
              "No las fotos típicas de siempre. Lugares elegidos por lo que se vive en ellos —arrastrá para explorar."}
          </p>
        </Reveal>
      </div>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
        {destinos.map((d, i) => (
          <Reveal
            key={d.name}
            delay={(i % 3) * 80}
            className="w-[78vw] shrink-0 snap-start sm:w-[42vw] lg:w-[27vw]"
          >
            <DestinoCard destino={d} numero={i + 1} />
          </Reveal>
        ))}
      </div>

    </Section>
  );
}
