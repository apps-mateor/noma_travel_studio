// ──────────────────────────────────────────────────────────────────
//  Importador de guías de Mogu.
//  Las páginas públicas de Mogu (v2.app.moguplatform.com/trips/…)
//  traen el viaje completo como JSON embebido en el HTML inicial
//  (stream RSC de Next). Acá se extrae y se convierte a los bloques
//  del documento "guia" del admin. Solo se usa del lado del servidor
//  (app/api/importar-mogu).
// ──────────────────────────────────────────────────────────────────

/** Foto pendiente de subir: la URL original viaja en _moguUrl. */
export type FotoPendiente = { _type: "image"; _key: string; _moguUrl: string };

export type GuiaImportada = {
  titulo: string;
  slug: string;
  intro?: string;
  /** URLs de la cabecera: la primera es la portada. */
  portadaUrl?: string;
  fotosUrls: string[];
  /** Bloques del admin; las galerías traen FotoPendiente en vez de asset. */
  bloques: unknown[];
  /** Cosas que no se pudieron importar y hay que armar a mano. */
  avisos: string[];
};

// ── Extracción del JSON embebido ──────────────────────────────────

/** Junta los chunks `self.__next_f.push([1,"…"])` en un solo stream. */
function streamRsc(html: string): string {
  const chunks = html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g);
  let stream = "";
  for (const [, literal] of chunks) {
    try {
      stream += JSON.parse(literal) as string;
    } catch {
      // chunk raro: se ignora, el viaje suele venir entero en uno solo
    }
  }
  return stream;
}

/** Lee un objeto JSON balanceado a partir de `desde` (estilo raw_decode). */
function jsonBalanceado(texto: string, desde: number): unknown {
  let depth = 0;
  let enString = false;
  let escape = false;
  for (let i = desde; i < texto.length; i++) {
    const c = texto[i];
    if (escape) {
      escape = false;
    } else if (c === "\\") {
      escape = true;
    } else if (c === '"') {
      enString = !enString;
    } else if (!enString) {
      if (c === "{") depth++;
      if (c === "}") {
        depth--;
        if (depth === 0) return JSON.parse(texto.slice(desde, i + 1));
      }
    }
  }
  throw new Error("JSON del viaje incompleto");
}

// ── HTML de Mogu → Portable Text ──────────────────────────────────

let contadorKeys = 0;
const key = () => `mogu${(contadorKeys++).toString(36).padStart(4, "0")}`;

const decodificar = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type MarkDef = { _type: "link"; _key: string; href: string };

/** Convierte el contenido inline de un párrafo en spans con marcas. */
function spansDe(html: string): { children: Span[]; markDefs: MarkDef[] } {
  const children: Span[] = [];
  const markDefs: MarkDef[] = [];
  const marcas: string[] = [];
  // tokens: tags y texto intercalado
  const partes = html.split(/(<[^>]+>)/).filter(Boolean);
  for (const parte of partes) {
    if (parte.startsWith("<")) {
      const tag = parte.toLowerCase();
      if (/^<(strong|b)[\s>]/.test(tag)) marcas.push("strong");
      else if (/^<\/(strong|b)>/.test(tag)) quitar(marcas, "strong");
      else if (/^<(em|i)[\s>]/.test(tag)) marcas.push("em");
      else if (/^<\/(em|i)>/.test(tag)) quitar(marcas, "em");
      else if (/^<a[\s>]/.test(tag)) {
        const href = parte.match(/href="([^"]*)"/i)?.[1];
        if (href) {
          const def: MarkDef = { _type: "link", _key: key(), href };
          markDefs.push(def);
          marcas.push(def._key);
        }
      } else if (/^<\/a>/.test(tag)) {
        const ultimoLink = [...marcas].reverse().find((m) => m.startsWith("mogu"));
        if (ultimoLink) quitar(marcas, ultimoLink);
      } else if (/^<br/.test(tag)) {
        children.push({ _type: "span", _key: key(), text: "\n", marks: [...marcas] });
      }
      // cualquier otro tag se ignora (span de estilos, etc.)
    } else {
      const texto = decodificar(parte);
      if (texto) children.push({ _type: "span", _key: key(), text: texto, marks: [...marcas] });
    }
  }
  return { children, markDefs };
}

function quitar(lista: string[], valor: string) {
  const i = lista.lastIndexOf(valor);
  if (i >= 0) lista.splice(i, 1);
}

function bloqueTexto(html: string, style = "normal", listItem?: "bullet" | "number") {
  const { children, markDefs } = spansDe(html);
  return {
    _type: "block",
    _key: key(),
    style,
    ...(listItem ? { listItem, level: 1 } : {}),
    markDefs,
    children: children.length ? children : [{ _type: "span", _key: key(), text: "", marks: [] }],
  };
}

const textoPlano = (html: string) => decodificar(html.replace(/<[^>]+>/g, "")).trim();

/** "💡 NickiTip: …" al inicio de un párrafo → bloque tip del admin. */
function comoTip(html: string) {
  const plano = textoPlano(html);
  const m = plano.match(/^💡?\s*(nicki\s?tips?|nick\s?tips?|tip de nick|tips?)\s*:?\s*/iu);
  if (!/^💡/u.test(plano) && !m?.[1]) return null;
  const texto = plano.replace(/^💡\s*/u, "").replace(/^(nicki\s?tips?|nick\s?tips?|tip de nick|tips?)\s*:?\s*/iu, "");
  return { _type: "tip", _key: key(), titulo: "Tip de Nick", texto };
}

/** HTML de un bloque "text" de Mogu → lista de bloques del admin. */
function htmlABloques(html: string): unknown[] {
  const bloques: unknown[] = [];
  // elementos de nivel de bloque en orden
  const elementos = html.matchAll(
    /<p[^>]*>([\s\S]*?)<\/p>|<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>|<(ul|ol)[^>]*>([\s\S]*?)<\/\3>/gi,
  );
  for (const el of elementos) {
    const [, p, h, tipoLista, lista] = el;
    if (h !== undefined) {
      if (textoPlano(h)) bloques.push(bloqueTexto(h, "h2"));
    } else if (tipoLista !== undefined) {
      const items = lista.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      for (const [, item] of items) {
        if (textoPlano(item))
          bloques.push(bloqueTexto(item, "normal", tipoLista === "ol" ? "number" : "bullet"));
      }
    } else if (p !== undefined) {
      const plano = textoPlano(p);
      if (!plano) continue;
      const tip = comoTip(p);
      if (tip) {
        bloques.push(tip);
      } else if (/^[-•]\s*\S/.test(plano)) {
        // guiones sueltos escritos a mano → viñetas
        bloques.push(bloqueTexto(p.replace(/^\s*[-•]\s*/, ""), "normal", "bullet"));
      } else {
        bloques.push(bloqueTexto(p));
      }
    }
  }
  return bloques;
}

// ── Mapeo del viaje completo ──────────────────────────────────────

type MoguBlock = { type: string; content?: Record<string, unknown> };
type MoguTrip = {
  title?: string;
  slug?: string;
  seoDescription?: string;
  config?: {
    blocks?: MoguBlock[];
    images?: { files?: { url?: string }[] };
  };
};

export async function importarGuiaDeMogu(url: string): Promise<GuiaImportada> {
  const parsed = new URL(url);
  if (parsed.hostname !== "v2.app.moguplatform.com" || !parsed.pathname.startsWith("/trips/")) {
    throw new Error("El link tiene que ser una guía pública de Mogu (v2.app.moguplatform.com/trips/…).");
  }

  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (noma importador)" } });
  if (!res.ok) throw new Error(`Mogu respondió ${res.status} — ¿el link es correcto y público?`);

  const stream = streamRsc(await res.text());
  const inicio = stream.indexOf('{"trip":');
  if (inicio < 0) throw new Error("No encontré el contenido del viaje en esa página.");
  const trip = (jsonBalanceado(stream, inicio) as { trip: MoguTrip }).trip;

  contadorKeys = 0;
  const avisos: string[] = [];
  const bloques: unknown[] = [];

  for (const block of trip.config?.blocks ?? []) {
    const contenido = block.content ?? {};
    switch (block.type) {
      case "title": {
        const titulo = String(contenido.title ?? "").trim();
        if (titulo) bloques.push(bloqueTexto(titulo, "h2"));
        break;
      }
      case "text":
        bloques.push(...htmlABloques(String(contenido.text ?? "")));
        break;
      case "gallery": {
        const imagenes = (contenido.images as { url?: string }[] | undefined) ?? [];
        const fotos: FotoPendiente[] = imagenes
          .map((i) => i.url)
          .filter((u): u is string => Boolean(u))
          .map((u) => ({ _type: "image", _key: key(), _moguUrl: u }));
        if (fotos.length) bloques.push({ _type: "galeria", _key: key(), fotos });
        break;
      }
      case "itinerary":
        avisos.push("El itinerario día a día no viene en la página pública: armalo con el bloque \"Itinerario\".");
        break;
      case "form":
        break; // el form de leads lo pone el sitio solo
      default:
        avisos.push(`Bloque "${block.type}" sin equivalente: se salteó.`);
    }
  }

  // Primer párrafo normal → introducción de la portada.
  let intro: string | undefined;
  const primero = bloques[0] as { _type?: string; style?: string; children?: Span[] } | undefined;
  if (primero?._type === "block" && primero.style === "normal") {
    intro = (primero.children ?? []).map((c) => c.text).join("").trim() || undefined;
    if (intro) bloques.shift();
  }

  const cabecera = (trip.config?.images?.files ?? [])
    .map((f) => f.url)
    .filter((u): u is string => Boolean(u));

  return {
    titulo: trip.title?.trim() || "Guía importada",
    slug: (trip.slug ?? "").replace(/-curatedbynoma$/, "") || "guia-importada",
    intro,
    portadaUrl: cabecera[0],
    fotosUrls: cabecera.slice(1),
    bloques,
    avisos,
  };
}

/** Hosts desde los que se pueden traer fotos (proxy de imágenes). */
export function esImagenPermitida(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      (u.hostname === "storage.googleapis.com" && u.pathname.startsWith("/mogu-prod")) ||
      u.hostname === "images.unsplash.com"
    );
  } catch {
    return false;
  }
}
