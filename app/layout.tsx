import type { Metadata } from "next";
import "./globals.css";
import { presicav, newSpirit, railwayGank } from "./fonts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  // www es el dominio principal en Vercel; el apex redirige acá.
  metadataBase: new URL("https://www.nomatravelstudio.com"),
  title: {
    default: "NOMA - Travel Studio",
    template: "%s · NOMA - Travel Studio",
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
    title: "NOMA - Travel Studio",
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
      {/* Header, footer y grano viven en app/(sitio)/layout.tsx para
          que /admin (Sanity Studio) quede a pantalla completa. */}
      <body className="min-h-full flex flex-col bg-cream text-brown">
        {children}
      </body>
    </html>
  );
}
