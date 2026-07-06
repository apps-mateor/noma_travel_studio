import { createElement } from "react";
import { defineField, defineType } from "sanity";

// Paleta de marca para pintar palabras del título desde el editor.
const COLOR_DECORATORS = [
  { title: "Naranja", value: "naranja", hex: "#db5c35" },
  { title: "Verde", value: "verde", hex: "#2b3a2a" },
  { title: "Marrón", value: "marron", hex: "#59392b" },
].map((c) => ({
  title: c.title,
  value: c.value,
  icon: () => createElement("span", { style: { color: c.hex, fontWeight: 700 } }, "A"),
  component: (props: { children?: React.ReactNode }) =>
    createElement("span", { style: { color: c.hex } }, props.children),
}));

export const hero = defineType({
  name: "hero",
  title: "1 · Portada (Hero)",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título grande",
      description:
        "Enter corta la línea. Para pintar una palabra: seleccionala y tocá la 'A' del color en la barra.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: COLOR_DECORATORS,
            annotations: [],
          },
        },
      ],
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
