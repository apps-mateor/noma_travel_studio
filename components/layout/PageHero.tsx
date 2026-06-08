import { Eyebrow } from "@/components/ui/Section";
import { FilmImage } from "@/components/ui/FilmImage";

interface PageHeroProps {
  kicker: string;
  title: string;
  intro?: string;
  seed: string;
}

/** Encabezado editorial compartido por las páginas internas. */
export function PageHero({ kicker, title, intro, seed }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-verde text-cream">
      <FilmImage
        seed={seed}
        alt=""
        priority
        wash={0.45}
        sizes="100vw"
        mode="cover"
        className="opacity-55"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(43,64,45,0.6), rgba(89,57,43,0.75))" }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-[1180px] px-5 pb-20 pt-40 sm:px-8 sm:pb-24 sm:pt-48">
        <Eyebrow className="text-cream/60">{kicker}</Eyebrow>
        <h1 className="display mt-5 text-[clamp(2.4rem,7vw,5.5rem)]">{title}</h1>
        {intro && (
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-cream/85">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
