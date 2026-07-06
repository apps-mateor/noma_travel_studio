import { defineField, defineType } from "sanity";

export const contacto = defineType({
  name: "contacto",
  title: "6 · Contacto",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      initialValue: "Contacto",
    }),
    defineField({
      name: "intro",
      title: "Texto introductorio",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { prepare: () => ({ title: "Contacto" }) },
});
