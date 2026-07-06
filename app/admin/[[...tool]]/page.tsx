import { cmsEnabled } from "@/sanity/env";
import { Studio } from "./Studio";

export { metadata, viewport } from "next-sanity/studio";

export const dynamic = "force-static";

/**
 * Admin del sitio (Sanity Studio embebido). Requiere iniciar sesión
 * con una cuenta invitada al proyecto de Sanity.
 */
export default function AdminPage() {
  if (!cmsEnabled) {
    return (
      <main style={{ display: "grid", placeItems: "center", minHeight: "100svh", padding: "2rem", fontFamily: "system-ui" }}>
        <div style={{ maxWidth: "34rem" }}>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>El admin todavía no está conectado</h1>
          <p style={{ marginTop: "0.8rem", lineHeight: 1.6 }}>
            Falta configurar el proyecto de Sanity. Definí las variables
            <code> NEXT_PUBLIC_SANITY_PROJECT_ID</code> y
            <code> NEXT_PUBLIC_SANITY_DATASET</code> en <code>.env.local</code> (y
            en Vercel) y volvé a deployar. Ver <code>SANITY_SETUP.md</code>.
          </p>
        </div>
      </main>
    );
  }
  return <Studio />;
}
