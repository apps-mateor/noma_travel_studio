import { Hero } from "@/components/sections/Hero";
import { Concepto } from "@/components/sections/Concepto";
import { Studio } from "@/components/sections/Studio";
import { Metodo } from "@/components/sections/Metodo";
import { Destinos } from "@/components/sections/Destinos";
import { Contacto } from "@/components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Hero />
      <Concepto />
      <Studio />
      <Metodo />
      <Destinos />
      <Contacto />
    </>
  );
}
