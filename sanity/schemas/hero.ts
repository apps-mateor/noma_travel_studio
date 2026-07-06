import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "1 · Portada (Hero)",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título grande",
      description: "El texto principal de la portada. Usá saltos de línea para cortarlo.",
      type: "text",
      rows: 2,
      initialValue: "Curated journeys\nfor modern explorers",
    }),
    defineField({
      name: "estilo",
      title: "Estilo del título",
      type: "object",
      options: { columns: 3 },
      fields: [
        defineField({
          name: "tipografia",
          title: "Tipografía",
          type: "string",
          options: {
            layout: "radio",
            list: [
              { title: "Presicav (títulos de marca)", value: "display" },
              { title: "New Spirit (serif editorial)", value: "serif" },
              { title: "Railway Gank (manuscrita)", value: "hand" },
            ],
          },
          initialValue: "display",
        }),
        defineField({
          name: "tamano",
          title: "Tamaño",
          type: "string",
          options: {
            layout: "radio",
            list: [
              { title: "Chico", value: "chico" },
              { title: "Mediano", value: "mediano" },
              { title: "Grande", value: "grande" },
            ],
          },
          initialValue: "mediano",
        }),
        defineField({
          name: "alineacion",
          title: "Alineación",
          type: "string",
          options: {
            layout: "radio",
            list: [
              { title: "Izquierda", value: "izquierda" },
              { title: "Centro", value: "centro" },
              { title: "Derecha", value: "derecha" },
            ],
          },
          initialValue: "centro",
        }),
      ],
    }),
    defineField({
      name: "palabraNaranja",
      title: "Palabra en naranja",
      description: "Qué palabra del título se pinta de naranja (tiene que estar escrita igual en el título).",
      type: "string",
      initialValue: "modern",
    }),
    defineField({
      name: "subtitulo",
      title: "Subtítulo",
      description: "La línea chica en mayúsculas debajo del título.",
      type: "string",
      initialValue: "Viajes a medida, desde la escucha y el criterio",
    }),
    defineField({
      name: "fondo",
      title: "Fondo (imagen o video)",
      description:
        "Subí una foto (jpg/png/webp) o un video corto (.mp4, ideal menos de 8mb, sin audio). El sitio detecta solo cuál es.",
      type: "file",
      options: { accept: "image/*,video/mp4,video/webm" },
    }),
  ],
  preview: { prepare: () => ({ title: "Portada (Hero)" }) },
});
