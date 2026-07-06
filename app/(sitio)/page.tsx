import { Hero } from "@/components/sections/Hero";
import { Concepto } from "@/components/sections/Concepto";
import { Studio } from "@/components/sections/Studio";
import { Metodo } from "@/components/sections/Metodo";
import { Destinos } from "@/components/sections/Destinos";
import { Contacto } from "@/components/sections/Contacto";
import { getSiteContent } from "@/lib/cms";

// El contenido se refresca solo: SanityLive revalida al publicar en el admin.
export default async function Home() {
  const cms = await getSiteContent();

  return (
    <>
      <Hero data={cms.hero} />
      <Concepto data={cms.concepto} />
      <Studio data={cms.quienesSomos} />
      <Metodo data={cms.comoTrabajamos} />
      <Destinos data={cms.destinos} />
      <Contacto data={cms.contacto} />
    </>
  );
}
