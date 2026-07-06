import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * Layout del sitio público: header, footer, FAB de WhatsApp y grano.
 * Vive en el route group (sitio) para que /admin quede limpio.
 */
export default function SitioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-brown focus:px-5 focus:py-2 focus:text-cream"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <div className="grain" aria-hidden />
    </>
  );
}
