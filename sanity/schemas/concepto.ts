import { defineField, defineType } from "sanity";

export const concepto = defineType({
  name: "concepto",
  title: "2 · Concepto (frase 'cura')",
  type: "document",
  fields: [
    defineField({
      name: "fraseInicio",
      title: "Frase — inicio",
      type: "string",
      initialValue: "Hay tantos viajes como viajeros en el mundo.",
    }),
    defineField({
      name: "fraseMedio",
      title: "Frase — antes de la palabra destacada",
      type: "string",
      initialValue: "El mejor es el que se",
    }),
    defineField({
      name: "palabraTachada",
      title: "Palabra tachada (opcional)",
      description:
        "Aparece tachada justo antes de la palabra destacada (el gesto ~~piensa~~ cura del brandbook). Dejar vacío para no mostrarla.",
      type: "string",
      initialValue: "piensa",
    }),
    defineField({
      name: "palabraDestacada",
      title: "Palabra destacada (cursiva naranja)",
      type: "string",
      initialValue: "cura",
    }),
    defineField({
      name: "fraseFin",
      title: "Frase — final",
      type: "string",
      initialValue: "para vos.",
    }),
    defineField({
      name: "proposito",
      title: "Párrafo de propósito",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "recuadros",
      title: "Recuadros naranjas (propuesta de valor)",
      description: "Los 4 recuadros numerados debajo del propósito.",
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
      validation: (rule) => rule.max(4).warning("El diseño está pensado para 4 recuadros."),
    }),
  ],
  preview: { prepare: () => ({ title: "Concepto (frase 'cura')" }) },
});
