import { defineField, defineType } from "sanity";

export const destinos = defineType({
  name: "destinos",
  title: "5 · Destinos",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      initialValue: "Destinos con mirada",
    }),
    defineField({
      name: "intro",
      title: "Texto introductorio",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "lista",
      title: "Destinos (en orden)",
      description: "Arrastrá para reordenar. Cada destino tiene su foto y su nota.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "nombre", title: "Nombre (ej: Japón)", type: "string" }),
            defineField({ name: "lugar", title: "Lugar (ej: Kioto · Tokio)", type: "string" }),
            defineField({ name: "nota", title: "Nota corta", type: "string" }),
            defineField({ name: "foto", title: "Foto", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "nombre", subtitle: "lugar", media: "foto" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Destinos" }) },
});
