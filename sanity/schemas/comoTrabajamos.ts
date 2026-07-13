import { defineField, defineType } from "sanity";

export const comoTrabajamos = defineType({
  name: "comoTrabajamos",
  title: "4 · Cómo trabajamos",
  type: "document",
  fields: [
    defineField({
      name: "etiqueta",
      title: "Etiqueta chica sobre el título (opcional)",
      description: "El texto pequeño arriba del título (ej: La promesa). Vacío = no se muestra.",
      type: "string",
      initialValue: "La promesa",
    }),
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      initialValue: "Cómo trabajamos",
    }),
    defineField({
      name: "intro",
      title: "Texto introductorio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pilares",
      title: "Los 4 fundamentos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "titulo", title: "Título", type: "string" }),
            defineField({ name: "texto", title: "Texto", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "titulo" } },
        },
      ],
      validation: (rule) => rule.max(4).warning("El diseño está pensado para 4 fundamentos."),
    }),
    defineField({
      name: "pasos",
      title: "Los pasos del proceso (1 a 4)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "titulo", title: "Título", type: "string" }),
            defineField({ name: "texto", title: "Texto", type: "string" }),
          ],
          preview: { select: { title: "titulo", subtitle: "texto" } },
        },
      ],
      validation: (rule) => rule.max(4).warning("El diseño está pensado para 4 pasos."),
    }),
  ],
  preview: { prepare: () => ({ title: "Cómo trabajamos" }) },
});
