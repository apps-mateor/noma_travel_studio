import { PortableText, stegaClean, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { FilmImage } from "@/components/ui/FilmImage";
import { imgUrl, type CmsImagen } from "@/lib/cms";

/** Ancla (#...) de un título de sección: "Cómo llegar" → "como-llegar". */
export function anclaDeTitulo(texto: string): string {
  return stegaClean(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type BlockSpan = { text?: string };
type Block = { _type?: string; style?: string; children?: BlockSpan[] };

const textoDeBlock = (b: Block): string =>
  (b.children ?? []).map((c) => c.text ?? "").join("");

/** Títulos de sección de una guía (para el índice lateral). */
export function indiceDeGuia(bloques?: unknown[]): { id: string; titulo: string }[] {
  return ((bloques ?? []) as Block[])
    .filter((b) => b._type === "block" && b.style === "h2")
    .map((b) => {
      const titulo = stegaClean(textoDeBlock(b));
      return { id: anclaDeTitulo(titulo), titulo };
    })
    .filter((s) => s.id && s.titulo);
}

// ──────────────────────────────────────────────────────────────────
//  Renderiza el contenido de una guía de viaje (campo "bloques" del
//  admin): texto con títulos de sección + los bloques propios de noma
//  (tip de Nick, galería, itinerario, desplegable).
// ──────────────────────────────────────────────────────────────────

type TipValue = { titulo?: string; texto?: string };
type GaleriaValue = { fotos?: CmsImagen[] };
type ItinerarioValue = { dias?: { _key?: string; titulo?: string; texto?: string }[] };
type DesplegableValue = { titulo?: string; texto?: string };

const componentes: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 font-serif text-lg leading-relaxed text-brown/85">{children}</p>
    ),
    h2: ({ children, value }) => (
      <h2
        id={anclaDeTitulo(textoDeBlock(value as Block))}
        className="display mt-14 scroll-mt-28 text-[clamp(1.4rem,3.2vw,2rem)] text-brown first:mt-0"
      >
        {children}
      </h2>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 font-serif text-lg leading-relaxed text-brown/85 marker:text-naranja">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 font-serif text-lg leading-relaxed text-brown/85 marker:font-display marker:text-sm marker:text-naranja">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={(value as { href?: string } | undefined)?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-naranja/60 decoration-2 underline-offset-4 transition-colors hover:text-naranja"
      >
        {children}
      </a>
    ),
  },
  types: {
    // 💡 Tip — panel verde con acento manuscrito; el título se edita en el admin.
    tip: ({ value }: { value: TipValue }) => (
      <aside className="mt-8 rounded-2xl bg-verde px-6 py-6 text-cream sm:px-8">
        <span className="hand block text-2xl text-naranja" aria-hidden>
          {value.titulo || "Tip de Nick"}
        </span>
        <p className="mt-3 font-serif text-lg leading-relaxed text-cream/90">{value.texto}</p>
      </aside>
    ),

    // Galería de fotos con el tratamiento FilmImage del sitio.
    galeria: ({ value }: { value: GaleriaValue }) => {
      const fotos = (value.fotos ?? []).filter((f) => f?.asset?._ref);
      if (fotos.length === 0) return null;
      return (
        <div
          className={`mt-8 grid gap-4 ${fotos.length === 1 ? "" : "sm:grid-cols-2"} ${
            fotos.length > 2 ? "lg:grid-cols-3" : ""
          }`}
        >
          {fotos.map((foto, i) => (
            <FilmImage
              key={foto.asset?._ref ?? i}
              seed={`noma-guia-galeria-${i}`}
              src={imgUrl(foto, 1200)}
              alt=""
              sizes="(max-width: 640px) 100vw, 50vw"
              className={`w-full overflow-hidden rounded-2xl ${
                fotos.length === 1 ? "aspect-[16/9]" : "aspect-[4/3]"
              }`}
            />
          ))}
        </div>
      );
    },

    // Itinerario día a día con numeración de marca.
    itinerario: ({ value }: { value: ItinerarioValue }) => {
      const dias = value.dias ?? [];
      if (dias.length === 0) return null;
      return (
        <ol className="mt-8 space-y-6">
          {dias.map((dia, i) => (
            <li key={dia._key ?? i} className="flex gap-4">
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-naranja font-display text-sm text-cream"
                aria-hidden
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-sm uppercase tracking-[0.14em] text-brown">
                  Día {i + 1}
                  {dia.titulo ? ` · ${dia.titulo}` : ""}
                </h3>
                {dia.texto && (
                  <p className="mt-2 font-serif text-lg leading-relaxed text-brown/85">
                    {dia.texto}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      );
    },

    // Desplegable: <details> nativo, accesible con teclado.
    desplegable: ({ value }: { value: DesplegableValue }) => (
      <details className="group mt-6 rounded-2xl border border-brown/20 bg-paper open:border-naranja/50">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display text-sm uppercase tracking-[0.14em] text-brown [&::-webkit-details-marker]:hidden">
          {value.titulo}
          <span
            className="text-naranja transition-transform duration-300 group-open:rotate-180"
            aria-hidden
          >
            ▾
          </span>
        </summary>
        <p className="whitespace-pre-line px-6 pb-5 font-serif text-lg leading-relaxed text-brown/85">
          {value.texto}
        </p>
      </details>
    ),
  },
};

interface GuiaBloquesProps {
  bloques?: unknown[];
}

export function GuiaBloques({ bloques }: GuiaBloquesProps) {
  if (!bloques || bloques.length === 0) return null;
  return <PortableText value={bloques as PortableTextBlock[]} components={componentes} />;
}
