import { defineField, defineType } from "sanity";

export const quienesSomos = defineType({
  name: "quienesSomos",
  title: "3 · Quiénes somos",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      initialValue: "Detrás de todo, nosotras.",
    }),
    defineField({
      name: "parrafos",
      title: "Párrafos de la historia",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "fotoEquipo",
      title: "Foto grande del equipo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "equipo",
      title: "Las 3 fotos individuales",
      description: "Al pasar el mouse se muestra el rol y la descripción de cada una.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "nombre", title: "Nombre", type: "string" }),
            defineField({ name: "rol", title: "Rol (ej: Co-founder · Curaduría)", type: "string" }),
            defineField({ name: "bio", title: "Descripción / background", type: "text", rows: 3 }),
            defineField({ name: "foto", title: "Foto", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "nombre", subtitle: "rol", media: "foto" } },
        },
      ],
      validation: (rule) => rule.max(3).warning("El diseño está pensado para 3 integrantes."),
    }),
  ],
  preview: { prepare: () => ({ title: "Quiénes somos" }) },
});
