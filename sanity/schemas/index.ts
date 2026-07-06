import { hero } from "./hero";
import { concepto } from "./concepto";
import { quienesSomos } from "./quienesSomos";
import { comoTrabajamos } from "./comoTrabajamos";
import { destinos } from "./destinos";
import { contacto } from "./contacto";

export const schemaTypes = [hero, concepto, quienesSomos, comoTrabajamos, destinos, contacto];

/** Tipos que funcionan como documento único (una sola "zona" por sección). */
export const SINGLETONS = [
  { type: "hero", title: "1 · Portada (Hero)" },
  { type: "concepto", title: "2 · Concepto (frase 'cura')" },
  { type: "quienesSomos", title: "3 · Quiénes somos" },
  { type: "comoTrabajamos", title: "4 · Cómo trabajamos" },
  { type: "destinos", title: "5 · Destinos" },
  { type: "contacto", title: "6 · Contacto" },
] as const;
