import { Button } from "@/components/ui/Button";
import { Seal } from "@/components/brand/Seal";
import { imageSrc } from "@/lib/images";

// 👉 VIDEO DEL HERO — poné tu video en /public/videos/hero.mp4
//    (mp4 comprimido, ideal < 8mb, sin audio). Mientras no exista,
//    se muestra el poster (seed "noma-hero", ver lib/images.ts).
const HERO_VIDEO = "/videos/hero.mp4";

/**
 * Hero full-bleed con video de fondo (referencia: Black Tomato).
 * Contenido centrado: claim manuscrito, título display (Presicav)
 * y CTAs "Destinos" + "Planeá tu viaje".
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-verde text-cream">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO}
        poster={imageSrc("noma-hero", { w: 1920, h: 1080 })}
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

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center px-5 pb-16 pt-32 text-center sm:px-8">
        <p className="hand mb-5 text-naranja" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)" }}>
          Hay tantos viajes como viajeros.
        </p>

        <h1 className="display max-w-5xl text-[clamp(2.2rem,7.5vw,5.6rem)] leading-[1.02]">
          Curated journeys
          <br />
          for <span className="text-naranja">modern</span> explorers
        </h1>

        <p className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-cream/85">
          Diseñamos viajes a medida desde la escucha y el criterio —no desde el
          catálogo. Vos viajás; de los detalles nos ocupamos nosotras.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/#contacto" tone="naranja">
            Planeá tu viaje
          </Button>
          <Button href="/#destinos" variant="outline" tone="cream">
            Destinos
          </Button>
        </div>

        <Seal className="mt-14 hidden w-16 text-cream/70 lg:block" />
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <span className="eyebrow animate-pulse text-cream/60">Scroll</span>
      </div>
    </section>
  );
}
