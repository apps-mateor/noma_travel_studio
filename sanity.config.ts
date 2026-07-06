"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { esESLocale } from "@sanity/locale-es-es";
import { projectId, dataset } from "./sanity/env";
import { schemaTypes, SINGLETONS } from "./sanity/schemas";

const SINGLETON_TYPES = new Set<string>(SINGLETONS.map((s) => s.type));

/**
 * Sanity Studio embebido en /admin. Cada sección de la home es una
 * "zona" fija: no se pueden crear ni borrar secciones, sólo editarlas.
 */
export default defineConfig({
  name: "noma",
  title: "noma · admin del sitio",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [
    // Vista "Presentación": el sitio real embebido con click-to-edit
    // y cambios en vivo antes de publicar.
    presentationTool({
      title: "Vista del sitio",
      previewUrl: {
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
    structureTool({
      title: "Secciones",
      structure: (S) =>
        S.list()
          .title("Secciones del sitio")
          .items(
            SINGLETONS.map((s) =>
              S.listItem()
                .title(s.title)
                .id(s.type)
                .child(S.document().schemaType(s.type).documentId(s.type)),
            ),
          ),
    }),
    esESLocale(),
  ],
  schema: { types: schemaTypes },
  document: {
    // Sin "crear nuevo": las secciones son fijas.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global" ? [] : prev,
    // Sin borrar/duplicar secciones.
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({ action }) => action !== "delete" && action !== "duplicate")
        : prev,
  },
});
