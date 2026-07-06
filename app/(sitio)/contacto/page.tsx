import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Contacto } from "@/components/sections/Contacto";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contanos a dónde te lleva la cabeza. Escuchamos antes de proponer y curamos el resto.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        kicker="Hablemos"
        title="Empecemos a planear"
        intro="Escuchamos antes de proponer. Contanos el contexto, el momento y el estilo de viaje —el resto lo curamos nosotras."
        seed="noma-contacto-hero"
      />
      <Contacto />
    </>
  );
}
