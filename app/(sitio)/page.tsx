import { Hero } from "@/components/sections/Hero";
import { Concepto } from "@/components/sections/Concepto";
import { Studio } from "@/components/sections/Studio";
import { Metodo } from "@/components/sections/Metodo";
import { Destinos } from "@/components/sections/Destinos";
import { Contacto } from "@/components/sections/Contacto";
import { getSiteContent } from "@/lib/cms";
import { CONTACT, SITE } from "@/lib/site";

// Datos estructurados para Google (perfil de negocio en resultados).
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "NOMA Travel Studio",
  url: "https://www.nomatravelstudio.com",
  description: SITE.claimEs,
  email: CONTACT.email,
  sameAs: [CONTACT.instagram],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
} as const;

// El contenido se refresca solo: SanityLive revalida al publicar en el admin.
export default async function Home() {
  const cms = await getSiteContent();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Hero data={cms.hero} />
      <Concepto data={cms.concepto} />
      <Studio data={cms.quienesSomos} />
      <Metodo data={cms.comoTrabajamos} />
      <Destinos data={cms.destinos} />
      <Contacto data={cms.contacto} />
    </>
  );
}
