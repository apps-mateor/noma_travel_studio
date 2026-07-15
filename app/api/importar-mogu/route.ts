import { NextResponse, type NextRequest } from "next/server";
import { importarGuiaDeMogu, esImagenPermitida } from "@/lib/mogu";

// ──────────────────────────────────────────────────────────────────
//  Backend del botón "Importar desde Mogu" del admin.
//  POST { url }   → contenido de la guía parseado (JSON).
//  GET ?imagen=…  → proxy de la foto (el navegador no puede bajarla
//                   directo por CORS); solo hosts de Mogu/Unsplash.
//  Solo lee páginas públicas de Mogu: no expone datos propios.
// ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { url } = (await req.json()) as { url?: string };
    if (!url) return NextResponse.json({ error: "Falta el link de Mogu." }, { status: 400 });
    const guia = await importarGuiaDeMogu(url);
    return NextResponse.json(guia);
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : "No se pudo importar la guía.";
    console.error("[importar-mogu]", error);
    return NextResponse.json({ error: mensaje }, { status: 422 });
  }
}

export async function GET(req: NextRequest) {
  const imagen = req.nextUrl.searchParams.get("imagen");
  if (!imagen || !esImagenPermitida(imagen)) {
    return NextResponse.json({ error: "Imagen no permitida." }, { status: 400 });
  }
  const res = await fetch(imagen);
  if (!res.ok) {
    return NextResponse.json({ error: `La foto respondió ${res.status}.` }, { status: 502 });
  }
  return new NextResponse(res.body, {
    headers: {
      "content-type": res.headers.get("content-type") ?? "image/jpeg",
      "cache-control": "private, max-age=300",
    },
  });
}
