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
      name: "imagenFondo",
      title: "Imagen de fondo",
      description: "Se muestra mientras carga el video, o si no hay video.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "videoUrl",
      title: "Video de fondo (URL)",
      description: "Link directo a un .mp4 (opcional). Si está vacío se usa la imagen.",
      type: "url",
    }),
  ],
  preview: { prepare: () => ({ title: "Portada (Hero)" }) },
});
