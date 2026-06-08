import type { Metadata } from "next";
import "./globals.css";
import { presicav, newSpirit, railwayGank } from "./fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://nomatravelstudio.com"),
  title: {
    default: "noma · travel studio — viajes curados a medida",
    template: "%s · noma travel studio",
  },
  description:
    "Viajes curados para exploradores modernos. Diseñamos viajes a medida desde la escucha y el criterio, no desde el catálogo. Lunas de miel, roadtrips y experiencias.",
  keywords: [
    "agencia de viajes",
    "viajes a medida",
    "luna de miel",
    "travel studio",
    "viajes curados",
    "noma",
  ],
  openGraph: {
    title: "noma · travel studio",
    description: SITE.claimEs,
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${presicav.variable} ${newSpirit.variable} ${railwayGank.variable} h-full`}
    >
      <head>
        {/* Marca JS antes de pintar: habilita los reveals sólo con JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-brown">
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
      </body>
    </html>
  );
}
