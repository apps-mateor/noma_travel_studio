import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SanityLive, getSiteContent } from "@/lib/cms";
import { whatsappLinkFromNumber } from "@/lib/site";
import { cmsEnabled } from "@/sanity/env";

/**
 * Layout del sitio público: header, footer, FAB de WhatsApp y grano.
 * Vive en el route group (sitio) para que /admin quede limpio.
 * SanityLive refresca el contenido publicado; VisualEditing activa los
 * overlays de click-to-edit cuando se mira desde /admin → Presentación.
 */
export default async function SitioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isEnabled: isDraft } = await draftMode();

  // Datos de contacto cargados en el admin (WhatsApp, email, Instagram).
  const { contacto } = await getSiteContent();
  const whatsappLink = whatsappLinkFromNumber(contacto?.whatsapp);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-brown focus:px-5 focus:py-2 focus:text-cream"
      >
        Saltar al contenido
      </a>
      <SiteHeader whatsappLink={whatsappLink} />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter
        whatsappLink={whatsappLink}
        email={contacto?.email || undefined}
        instagramHandle={contacto?.instagram || undefined}
      />
      <div className="grain" aria-hidden />
      {cmsEnabled && <SanityLive />}
      {cmsEnabled && isDraft && <VisualEditing />}
    </>
  );
}
