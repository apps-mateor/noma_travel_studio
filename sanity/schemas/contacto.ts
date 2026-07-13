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
    defineField({
      name: "whatsapp",
      title: "Número de WhatsApp",
      description:
        "Con código de país, sin '+' ni espacios ni guiones. Ej: 5491122334455. Se usa en todos los botones de WhatsApp del sitio y en el formulario.",
      type: "string",
      validation: (rule) =>
        rule.custom((v) =>
          !v || /^\d{8,15}$/.test(v)
            ? true
            : "Sólo números, con código de país (ej: 5491122334455)",
        ),
    }),
    defineField({
      name: "email",
      title: "Email de contacto",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Usuario de Instagram",
      description: "Con o sin @. Ej: noma__travelstudio",
      type: "string",
    }),
    defineField({
      name: "formulario",
      title: "Formulario — textos de ejemplo (ghost text)",
      description: "Lo que se ve en gris dentro de cada campo antes de escribir.",
      type: "object",
      options: { columns: 2 },
      fields: [
        defineField({ name: "nombre", title: "Nombre", type: "string", initialValue: "Cómo te llamás" }),
        defineField({ name: "email", title: "Email", type: "string", initialValue: "tu@email.com" }),
        defineField({ name: "tipo", title: "Tipo de viaje", type: "string", initialValue: "Luna de miel, roadtrip…" }),
        defineField({ name: "cuando", title: "¿Cuándo?", type: "string", initialValue: "Aprox. mes / año" }),
        defineField({ name: "cuantos", title: "¿Cuántos viajan?", type: "string", initialValue: "Ej: 2 adultos, 2 peques" }),
        defineField({ name: "telefono", title: "Teléfono", type: "string", initialValue: "+54 9 11 …" }),
        defineField({
          name: "mensaje",
          title: "Contanos un poco más",
          type: "string",
          initialValue: "Qué te imaginás, qué te mueve, los 'sí o sí'…",
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Contacto" }) },
});
