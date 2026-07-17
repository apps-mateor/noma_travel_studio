import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

// Imagen que aparece al compartir el sitio (WhatsApp, Instagram, etc.).
// Se genera en build con las fuentes y colores del brandbook.

export const alt = `NOMA Travel Studio — ${SITE.claimEs}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [presicav, newSpirit] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/Presicav-Bold.otf")),
    readFile(join(process.cwd(), "app/fonts/NewSpirit.otf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#2b402d",
          color: "#fcedc1",
        }}
      >
        <div
          style={{
            fontFamily: "Presicav",
            fontSize: 150,
            letterSpacing: "0.08em",
          }}
        >
          NOMA
        </div>
        <div
          style={{
            fontFamily: "Presicav",
            fontSize: 34,
            letterSpacing: "0.5em",
            marginTop: 8,
            // Compensa el tracking del último carácter para centrar de verdad.
            paddingLeft: "0.5em",
            color: "#db5c35",
          }}
        >
          TRAVEL STUDIO
        </div>
        <div
          style={{
            fontFamily: "NewSpirit",
            fontSize: 32,
            marginTop: 48,
            color: "rgba(252, 237, 193, 0.85)",
          }}
        >
          {SITE.claimEs}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Presicav", data: presicav, weight: 700, style: "normal" },
        { name: "NewSpirit", data: newSpirit, weight: 400, style: "normal" },
      ],
    },
  );
}
