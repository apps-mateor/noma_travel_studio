import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Apaga el modo borrador (borra la cookie de preview) y vuelve a la home.
// Útil si quedó activo un preview roto: /api/draft-mode/disable
export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
