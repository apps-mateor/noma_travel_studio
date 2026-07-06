import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/lib/cms";

// Habilita el modo borrador cuando el admin abre la vista "Presentación".
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
