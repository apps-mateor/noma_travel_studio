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
  ],
  preview: { prepare: () => ({ title: "Contacto" }) },
});
