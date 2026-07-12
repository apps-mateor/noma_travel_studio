import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { CMS_CACHE_TAG } from "@/lib/cms";

// ──────────────────────────────────────────────────────────────────
//  Webhook de Sanity → revalidación del sitio.
//  Sanity llama a este endpoint cada vez que se publica (o borra)
//  contenido. Sin esto, el caché solo se regenera cuando alguien
//  tiene el sitio abierto en el momento de publicar.
//  La firma se valida con SANITY_REVALIDATE_SECRET (mismo secreto
//  configurado en el webhook de Sanity).
// ──────────────────────────────────────────────────────────────────

type WebhookPayload = { _type?: string };

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error("[revalidate] Falta SANITY_REVALIDATE_SECRET en el entorno");
    return NextResponse.json({ error: "Webhook no configurado" }, { status: 501 });
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret);

    if (!isValidSignature) {
      return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    }

    revalidateTag(CMS_CACHE_TAG, "max");
    return NextResponse.json({ revalidated: true, tipo: body?._type ?? null });
  } catch (error: unknown) {
    console.error("[revalidate] Error procesando el webhook:", error);
    return NextResponse.json({ error: "Error procesando el webhook" }, { status: 500 });
  }
}
