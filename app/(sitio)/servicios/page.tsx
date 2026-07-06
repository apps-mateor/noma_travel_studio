import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Servicios } from "@/components/sections/Servicios";
import { Metodo } from "@/components/sections/Metodo";
import { Contacto } from "@/components/sections/Contacto";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diseño de viaje a medida, lunas de miel, roadtrips y gestión end-to-end con la app de noma.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        kicker="Qué hacemos"
        title="Formas de viajar"
        intro="Cada viaje se arma desde una conversación 1:1, no desde un catálogo. Estas son las maneras en que acompañamos —elegí por dónde empezar."
        seed="noma-servicios-hero"
      />
      <Servicios />
      <Metodo />
      <Contacto />
    </>
  );
}
