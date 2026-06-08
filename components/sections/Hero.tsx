import { Seal } from "@/components/brand/Seal";
import { Button } from "@/components/ui/Button";
import { SwipeGallery } from "@/components/ui/SwipeGallery";
import { DESTINOS } from "@/lib/content";

/**
 * Hero split: texto editorial alineado a la izquierda y a la derecha una
 * galería de destinos swipeable (el usuario desliza, no hay auto-scroll).
 */
export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-verde text-cream">
      <div className="mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 lg:grid-cols-2">
        {/* IZQUIERDA — texto */}
        <div className="relative z-10 flex flex-col justify-center px-5 pb-10 pt-32 sm:px-8 lg:pb-0 lg:pr-12 lg:pt-24">
          <p className="hand mb-4 text-naranja" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)" }}>
            Hay tantos viajes como viajeros.
          </p>

          <h1 className="display text-[clamp(1.9rem,8vw,5.6rem)]">
            Curated
            <br />
            journeys
            <br />
            for <span className="text-naranja">modern</span>
            <br />
            explorers
          </h1>

          <p className="mt-8 max-w-md font-serif text-lg leading-relaxed text-cream/85">
            Diseñamos viajes a medida desde la escucha y el criterio —no desde el
            catálogo. Vos viajás; de los detalles nos ocupamos nosotras.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/#contacto" tone="cream">
              Planear viaje
            </Button>
            <Button href="/#servicios" variant="outline" tone="cream">
              Ver servicios
            </Button>
          </div>

          <Seal className="mt-12 hidden w-20 text-cream/80 lg:block" />
        </div>

        {/* DERECHA — galería swipeable de destinos */}
        <div className="relative flex flex-col justify-center pb-12 lg:pb-0 lg:pl-4">
          <div className="relative h-[58svh] min-h-[420px] px-5 sm:px-8 lg:h-[74vh] lg:px-0">
            <SwipeGallery items={DESTINOS} className="h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
