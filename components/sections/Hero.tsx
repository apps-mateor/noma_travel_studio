import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { imageSrc } from "@/lib/images";
import { cdnImage, type CmsHero, type CmsEstilo, type CmsBlock } from "@/lib/cms";

// 👉 VIDEO DEL HERO — poné tu video en /public/videos/hero.mp4
//    (mp4 comprimido, ideal < 8mb, sin audio) o subilo directo desde
//    el admin en "Fondo". Mientras no exista, se muestra la imagen.
const HERO_VIDEO = "/videos/hero.mp4";

// Colores de marca disponibles como marks en el título enriquecido.
const COLOR_MARK: Record<string, string> = {
  naranja: "text-naranja",
  verde: "text-verde",
  marron: "text-brown",
};

// Presets de estilo editables desde el admin. Acotados a la identidad
// de marca: tipografías del brandbook y escalas que no rompen el layout.
const TIPOGRAFIA: Record<NonNullable<CmsEstilo["tipografia"]>, string> = {
  display: "display",
  serif: "font-serif",
  hand: "hand",
};

const TAMANO: Record<NonNullable<CmsEstilo["tamano"]>, string> = {
  chico: "text-[clamp(1.4rem,3.5vw,2.6rem)]",
  mediano: "text-[clamp(1.7rem,4.5vw,3.4rem)]",
  grande: "text-[clamp(2.1rem,6.5vw,5rem)]",
};

const ALINEACION: Record<
  NonNullable<CmsEstilo["alineacion"]>,
  { wrap: string; text: string }
> = {
  izquierda: { wrap: "items-start", text: "text-left" },
  centro: { wrap: "items-center", text: "text-center" },
  derecha: { wrap: "items-end", text: "text-right" },
  justificado: { wrap: "items-center", text: "text-center" },
};

// Justificado editorial: el bloque toma el ancho de la línea más larga
// (display: table) y las demás se estiran hasta emparejar los bordes.
// Sólo desde sm — en mobile el texto envuelve y quedaría agujereado.
const JUSTIFICADO_CLASS =
  "text-center sm:table sm:text-justify sm:[text-align-last:justify]";

/** Renderiza el título enriquecido: cada bloque es una línea, los marks pintan color. */
function Titulo({ bloques }: { bloques: CmsBlock[] }) {
  return (
    <>
      {bloques.map((block, i) => (
        <Fragment key={block._key ?? i}>
          {block.children?.map((span, j) => {
            const colorClass = span.marks?.map((m) => COLOR_MARK[m]).find(Boolean);
            return colorClass ? (
              <span key={j} className={colorClass}>
                {span.text}
              </span>
            ) : (
              <Fragment key={j}>{span.text}</Fragment>
            );
          })}
          {i < bloques.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

/** Título por defecto cuando el CMS no tiene contenido cargado. */
function TituloDefault() {
  return (
    <>
      Curated journeys
      <br />
      for <span className="text-naranja">modern</span> explorers
    </>
  );
}

interface HeroProps {
  data?: CmsHero | null;
}

/**
 * Hero full-bleed con video o imagen de fondo (referencia: Black Tomato).
 * Contenido compacto: la imagen/video protagoniza. La tipografía, el
 * tamaño y la alineación del título se eligen desde el admin.
 */
export function Hero({ data }: HeroProps) {
  const fondoUrl = data?.fondo?.url;
  const fondoEsVideo = Boolean(data?.fondo?.mimeType?.startsWith("video/"));

  const poster =
    fondoUrl && !fondoEsVideo
      ? cdnImage(fondoUrl, 1920)
      : imageSrc("noma-hero", { w: 1920, h: 1080 });
  const videoSrc = fondoEsVideo && fondoUrl ? fondoUrl : HERO_VIDEO;

  const tipografia = TIPOGRAFIA[data?.estilo?.tipografia ?? "display"];
  const tamano = TAMANO[data?.estilo?.tamano ?? "mediano"];
  const modoAlineacion = data?.estilo?.alineacion ?? "centro";
  const alineacion = ALINEACION[modoAlineacion];
  const esJustificado = modoAlineacion === "justificado";

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-verde text-cream">
      {/* Fondo: video (subido o /public/videos/hero.mp4) con imagen de respaldo */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      {/* Oscurecido para legibilidad del texto sobre el video */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(43,58,42,0.55) 0%, rgba(43,58,42,0.35) 45%, rgba(43,58,42,0.7) 100%)",
        }}
        aria-hidden
      />

      {/* Contenido compacto (ref. Black Tomato): la imagen manda */}
      <div
        className={`relative z-10 flex w-full max-w-[1400px] flex-col px-5 pb-16 pt-32 sm:px-8 ${alineacion.wrap} ${alineacion.text}`}
      >
        <h1
          className={`${tipografia} ${tamano} leading-[1.08] ${
            esJustificado ? `max-w-full ${JUSTIFICADO_CLASS}` : "max-w-4xl"
          }`}
        >
          {data?.titulo?.length ? <Titulo bloques={data.titulo} /> : <TituloDefault />}
        </h1>

        <div className={`mt-9 flex flex-wrap items-center gap-4 ${alineacion.wrap === "items-center" ? "justify-center" : ""}`}>
          <Button href="/#contacto" tone="naranja">
            Planeá tu viaje
          </Button>
          <Button href="/#destinos" variant="outline" tone="cream">
            Destinos
          </Button>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <span className="eyebrow animate-pulse text-cream/60">Scroll</span>
      </div>
    </section>
  );
}
