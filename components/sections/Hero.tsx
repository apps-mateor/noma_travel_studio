import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { imageSrc } from "@/lib/images";
import { cdnImage, type CmsHero } from "@/lib/cms";

// 👉 VIDEO DEL HERO — poné tu video en /public/videos/hero.mp4
//    (mp4 comprimido, ideal < 8mb, sin audio) o cargá una URL desde
//    el admin. Mientras no exista, se muestra la imagen de fondo.
const HERO_VIDEO = "/videos/hero.mp4";

const DEFAULT_TITULO = "Curated journeys\nfor modern explorers";
const DEFAULT_PALABRA = "modern";
const DEFAULT_SUBTITULO = "Viajes a medida, desde la escucha y el criterio";

/** Renderiza el título respetando saltos de línea y pintando la palabra naranja. */
function Titulo({ texto, palabra }: { texto: string; palabra?: string }) {
  const lines = texto.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const at = palabra ? line.indexOf(palabra) : -1;
        return (
          <Fragment key={i}>
            {at >= 0 && palabra ? (
              <>
                {line.slice(0, at)}
                <span className="text-naranja">{palabra}</span>
                {line.slice(at + palabra.length)}
              </>
            ) : (
              line
            )}
            {i < lines.length - 1 && <br />}
          </Fragment>
        );
      })}
    </>
  );
}

interface HeroProps {
  data?: CmsHero | null;
}

/**
 * Hero full-bleed con video de fondo (referencia: Black Tomato).
 * Contenido compacto y centrado: la imagen/video protagoniza.
 */
export function Hero({ data }: HeroProps) {
  const poster = data?.imagenFondo
    ? cdnImage(data.imagenFondo, 1920)
    : imageSrc("noma-hero", { w: 1920, h: 1080 });

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-verde text-cream">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={data?.videoUrl ?? HERO_VIDEO}
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

      {/* Contenido centrado, compacto (ref. Black Tomato): la imagen manda */}
      <div className="relative z-10 flex flex-col items-center px-5 pb-16 pt-32 text-center sm:px-8">
        <h1 className="display max-w-4xl text-[clamp(1.7rem,4.5vw,3.4rem)] leading-[1.08]">
          <Titulo
            texto={data?.titulo ?? DEFAULT_TITULO}
            palabra={data?.palabraNaranja ?? DEFAULT_PALABRA}
          />
        </h1>

        <p className="mt-5 max-w-xl font-display text-[0.72rem] uppercase tracking-[0.22em] text-cream/85">
          {data?.subtitulo ?? DEFAULT_SUBTITULO}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
