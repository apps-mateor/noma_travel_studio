"use client";

import { useCallback, useState, type ChangeEvent, type CSSProperties } from "react";
import { set, useClient, useFormValue, type StringInputProps } from "sanity";
import type { FotoPendiente, GuiaImportada } from "@/lib/mogu";

// ──────────────────────────────────────────────────────────────────
//  Campo "Importar desde Mogu" del documento Guía: se pega el link,
//  se toca Importar y se llenan todos los campos (título, URL,
//  intro, portada, fotos y contenido). Las fotos se suben a Sanity
//  con la sesión del usuario logueado en el admin.
//  Sin @sanity/ui a propósito (no está en el árbol de deps): son
//  elementos planos con estilos del tema vía variables CSS.
// ──────────────────────────────────────────────────────────────────

type Estado =
  | { fase: "idle" }
  | { fase: "trabajando"; detalle: string }
  | { fase: "listo"; avisos: string[] }
  | { fase: "error"; mensaje: string };

const INPUT: CSSProperties = {
  flex: 1,
  padding: "0.55rem 0.75rem",
  borderRadius: 4,
  border: "1px solid var(--card-border-color, #ccc)",
  background: "var(--card-bg-color, #fff)",
  color: "var(--card-fg-color, #111)",
  font: "inherit",
};

const BOTON: CSSProperties = {
  padding: "0.55rem 1rem",
  borderRadius: 4,
  border: "none",
  background: "#2b402d",
  color: "#fcedc1",
  font: "inherit",
  fontWeight: 600,
  cursor: "pointer",
};

const AVISO: CSSProperties = {
  padding: "0.6rem 0.8rem",
  borderRadius: 4,
  fontSize: "0.85em",
  lineHeight: 1.45,
};

export function ImportarMoguInput(props: StringInputProps) {
  const { value, onChange } = props;
  const [estado, setEstado] = useState<Estado>({ fase: "idle" });
  const client = useClient({ apiVersion: "2026-07-06" });
  const docId = useFormValue(["_id"]) as string | undefined;

  const importar = useCallback(async () => {
    if (!value || !docId) return;
    try {
      setEstado({ fase: "trabajando", detalle: "Leyendo la guía de Mogu…" });
      const res = await fetch("/api/importar-mogu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      const guia = (await res.json()) as GuiaImportada & { error?: string };
      if (!res.ok) throw new Error(guia.error ?? "No se pudo importar.");

      // Todas las fotos: cabecera + galerías del contenido.
      const urlsGalerias = guia.bloques.flatMap((b) => {
        const bloque = b as { _type?: string; fotos?: FotoPendiente[] };
        return bloque._type === "galeria" ? (bloque.fotos ?? []).map((f) => f._moguUrl) : [];
      });
      const urls = [
        ...new Set([guia.portadaUrl, ...guia.fotosUrls, ...urlsGalerias].filter(Boolean)),
      ] as string[];

      const refPorUrl = new Map<string, string>();
      for (const [i, url] of urls.entries()) {
        setEstado({ fase: "trabajando", detalle: `Subiendo foto ${i + 1} de ${urls.length}…` });
        const foto = await fetch(`/api/importar-mogu?imagen=${encodeURIComponent(url)}`);
        if (!foto.ok) continue; // sin esa foto, pero la importación sigue
        const asset = await client.assets.upload("image", await foto.blob(), {
          filename: `mogu-${i + 1}.jpg`,
        });
        refPorUrl.set(url, asset._id);
      }

      setEstado({ fase: "trabajando", detalle: "Completando los campos…" });
      const imagen = (ref: string, keySufijo: string) => ({
        _type: "image" as const,
        _key: `mogu-img-${keySufijo}`,
        asset: { _type: "reference" as const, _ref: ref },
      });
      // Galerías: la URL pendiente se cambia por el asset subido.
      const bloques = guia.bloques.map((b) => {
        const bloque = b as { _type?: string; _key: string; fotos?: FotoPendiente[] };
        if (bloque._type !== "galeria") return b;
        const fotos = (bloque.fotos ?? [])
          .filter((f) => refPorUrl.has(f._moguUrl))
          .map((f) => imagen(refPorUrl.get(f._moguUrl)!, f._key));
        return { ...bloque, fotos };
      });

      const portadaRef = guia.portadaUrl ? refPorUrl.get(guia.portadaUrl) : undefined;
      const fotosRefs = guia.fotosUrls
        .filter((u) => refPorUrl.has(u))
        .map((u, i) => imagen(refPorUrl.get(u)!, `cabecera-${i}`));

      await client
        .patch(docId)
        .set({
          titulo: guia.titulo,
          slug: { _type: "slug", current: guia.slug },
          ...(guia.intro ? { intro: guia.intro } : {}),
          ...(portadaRef
            ? { portada: { _type: "image", asset: { _type: "reference", _ref: portadaRef } } }
            : {}),
          ...(fotosRefs.length ? { fotos: fotosRefs } : {}),
          bloques,
        })
        .commit();

      setEstado({ fase: "listo", avisos: guia.avisos });
    } catch (error: unknown) {
      setEstado({
        fase: "error",
        mensaje: error instanceof Error ? error.message : "No se pudo importar.",
      });
    }
  }, [value, docId, client]);

  const trabajando = estado.fase === "trabajando";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="url"
          style={INPUT}
          value={value ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(set(e.currentTarget.value))}
          placeholder="https://v2.app.moguplatform.com/trips/…"
          disabled={trabajando}
        />
        <button
          type="button"
          style={{ ...BOTON, opacity: !value || trabajando ? 0.5 : 1 }}
          disabled={!value || trabajando}
          onClick={importar}
        >
          {trabajando ? "Importando…" : "Importar"}
        </button>
      </div>

      {estado.fase === "trabajando" && (
        <span style={{ fontSize: "0.85em", opacity: 0.7 }}>{estado.detalle}</span>
      )}
      {estado.fase === "listo" && (
        <div style={{ ...AVISO, background: "#e3efe4", color: "#1d3320" }}>
          ¡Listo! Revisá los campos y tocá <strong>Publicar</strong> cuando esté.
          {estado.avisos.map((aviso) => (
            <div key={aviso} style={{ opacity: 0.75, marginTop: "0.3rem" }}>
              ⚠ {aviso}
            </div>
          ))}
        </div>
      )}
      {estado.fase === "error" && (
        <div style={{ ...AVISO, background: "#f8e2da", color: "#5c1f10" }}>{estado.mensaje}</div>
      )}
    </div>
  );
}
