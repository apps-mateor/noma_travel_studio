import { Hero } from "@/components/sections/Hero";
import { Concepto } from "@/components/sections/Concepto";
import { Studio } from "@/components/sections/Studio";
import { Metodo } from "@/components/sections/Metodo";
import { Servicios } from "@/components/sections/Servicios";
import { Destinos } from "@/components/sections/Destinos";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Contacto } from "@/components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Hero />
      <Concepto />
      <Studio />
      <Metodo />
      <Servicios />
      <Destinos />
      <Manifiesto />
      <Contacto />
    </>
  );
}
