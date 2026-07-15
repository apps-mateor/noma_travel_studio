import { createElement } from "react";
import { defineArrayMember, defineField, defineType } from "sanity";

// Decoradores de tipografía para el editor: seleccionás texto y le
// aplicás una fuente de marca, igual que negrita/cursiva.
const TIPOGRAFIA_DECORATORS = [
  {
    title: "Manuscrita (Railway Gank)",
    value: "hand",
    icon: () =>
      createElement("span", { style: { fontFamily: "cursive", fontWeight: 600 } }, "A"),
    component: (props: { children?: React.ReactNode }) =>
      createElement("span", { style: { fontFamily: "cursive" } }, props.children),
  },
  {
    title: "Tipografía de marca (Presicav)",
    value: "display",
    icon: () =>
      createElement("span", { style: { fontWeight: 700, letterSpacing: "0.08em" } }, "A"),
    component: (props: { children?: React.ReactNode }) =>
      createElement(
        "span",
        { style: { fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" } },
        props.children,
      ),
  },
];

// ──────────────────────────────────────────────────────────────────
//  Guía de viaje — reemplaza las guías que se armaban en Mogu.
//  A diferencia de las secciones del sitio (fijas), las guías se
//  crean y borran libremente desde el admin. Cada una se publica
//  en /destinos/<url> con la estética del sitio.
//
//  El contenido es un editor continuo: se escribe texto normal y se
//  insertan bloques especiales (tip, galería, itinerario, desplegable)
//  con el botón "+" del editor, como en Mogu.
// ──────────────────────────────────────────────────────────────────

export const guia = defineType({
  name: "guia",
  title: "Guía de viaje",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      description: "Ej: Milos – La joyita escondida de Grecia",
      type: "string",
      validation: (rule) => rule.required().error("La guía necesita un título."),
    }),
    defineField({
      name: "slug",
      title: "URL de la guía",
      description:
        "La dirección donde vive la guía: /destinos/<esto>. Apretá \"Generate\" para crearla desde el título. ⚠️ No cambiarla después de compartir el link.",
      type: "slug",
      options: { source: "titulo", maxLength: 60 },
      validation: (rule) => rule.required().error("Sin URL la guía no se puede publicar."),
    }),
    defineField({
      name: "etiqueta",
      title: "Etiqueta",
      description: "Se ve arriba del título. Ej: Milos · Grecia",
      type: "string",
    }),
    defineField({
      name: "tipografia",
      title: "Tipografía del título",
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
      name: "intro",
      title: "Introducción",
      description: "El párrafo de apertura, debajo del título en la portada.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "portada",
      title: "Imagen de portada",
      description: "El fondo de la portada, detrás del título.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "fotos",
      title: "Imágenes adicionales",
      description:
        "Debajo de la portada: la primera grande a la izquierda y hasta dos apiladas a la derecha. Si hay más, se ven con el botón \"Ver galería\".",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "bloques",
      title: "Contenido de la guía",
      description:
        "Escribí el texto y usá el botón + para insertar bloques: título de sección, tip de Nick, galería, itinerario o desplegable.",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Texto", value: "normal" },
            { title: "Título de sección", value: "h2" },
          ],
          lists: [
            { title: "Viñetas", value: "bullet" },
            { title: "Numerada", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Cursiva", value: "em" },
              ...TIPOGRAFIA_DECORATORS,
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              },
            ],
          },
        }),

        // Imagen suelta entre párrafos (al ancho del texto).
        defineArrayMember({
          type: "image",
          title: "Imagen",
          options: { hotspot: true },
        }),

        // 💡 Tip — el consejo destacado, con título editable.
        defineArrayMember({
          type: "object",
          name: "tip",
          title: "Tip 💡",
          fields: [
            defineField({
              name: "titulo",
              title: "Título del tip",
              description: "Ej: Tip de Nick, Ojo con esto…",
              type: "string",
              initialValue: "Tip de Nick",
            }),
            defineField({
              name: "texto",
              title: "El tip",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "titulo", subtitle: "texto" },
            prepare: ({ title, subtitle }) => ({ title: `💡 ${title || "Tip"}`, subtitle }),
          },
        }),

        // Galería de fotos dentro del contenido.
        defineArrayMember({
          type: "object",
          name: "galeria",
          title: "Galería",
          fields: [
            defineField({
              name: "fotos",
              title: "Fotos",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: { fotos: "fotos", media: "fotos.0" },
            prepare: ({ fotos, media }) => ({
              title: "Galería",
              subtitle: `${fotos?.length ?? 0} foto(s)`,
              media,
            }),
          },
        }),

        // Itinerario día a día.
        defineArrayMember({
          type: "object",
          name: "itinerario",
          title: "Itinerario día a día",
          fields: [
            defineField({
              name: "dias",
              title: "Días (en orden)",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "titulo",
                      title: "Título del día (ej: Gardens by the Bay)",
                      type: "string",
                    }),
                    defineField({ name: "texto", title: "Qué se hace", type: "text", rows: 3 }),
                  ],
                  preview: { select: { title: "titulo", subtitle: "texto" } },
                }),
              ],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: { dias: "dias" },
            prepare: ({ dias }) => ({
              title: "Itinerario",
              subtitle: `${dias?.length ?? 0} día(s)`,
            }),
          },
        }),

        // Desplegable: pregunta/título que se abre al tocar.
        defineArrayMember({
          type: "object",
          name: "desplegable",
          title: "Desplegable",
          fields: [
            defineField({
              name: "titulo",
              title: "Título (lo que se ve cerrado)",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "texto",
              title: "Contenido (se ve al abrir)",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "titulo", subtitle: "texto" },
            prepare: ({ title, subtitle }) => ({ title: `▾ ${title}`, subtitle }),
          },
        }),
      ],
    }),
    defineField({
      name: "agente",
      title: "Tu contacto — nombre",
      description: "Quién firma esta guía en la tarjeta de contacto.",
      type: "string",
      initialValue: "Nicole Quinteros",
    }),
    defineField({
      name: "whatsapp",
      title: "Tu contacto — WhatsApp",
      description:
        "Número en formato internacional (ej: +54 9 11 5949 5632). Si queda vacío se usa el de la sección Contacto.",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "etiqueta", media: "portada" },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Guía sin título",
      subtitle,
      media,
    }),
  },
});
