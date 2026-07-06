// Datos transversales del sitio: navegación e información de contacto.
// Mantener aquí las constantes evita repetir strings por toda la UI.

// ──────────────────────────────────────────────────────────────────
//  CONTACTO  ·  editá estos valores con los datos reales del studio
// ──────────────────────────────────────────────────────────────────
export const CONTACT = {
  // 👉 LINK DE WHATSAPP — pegá acá tu link completo de WhatsApp.
  //    Podés usar wa.me con tu número en formato internacional sin "+":
  //    "https://wa.me/5491122334455"
  //    o un link de WhatsApp Business / wa.link, lo que prefieras.
  whatsappLink: "https://wa.me/5491100000000",

  // Mensaje que aparece pre-cargado al abrir el chat (opcional).
  whatsappMessage: "Hola noma, quiero empezar a planear un viaje.",

  email: "contacto@nomatravelstudio.com",
  instagram: "https://www.instagram.com/noma__travelstudio/",
  instagramHandle: "@noma__travelstudio",
  location: "Buenos Aires, Argentina",
} as const;

/**
 * Devuelve el link de WhatsApp con el mensaje pre-cargado (si hay).
 * Usar en todos los botones/CTA de WhatsApp del sitio.
 */
export function whatsappHref(message: string = CONTACT.whatsappMessage): string {
  const sep = CONTACT.whatsappLink.includes("?") ? "&" : "?";
  return message
    ? `${CONTACT.whatsappLink}${sep}text=${encodeURIComponent(message)}`
    : CONTACT.whatsappLink;
}

export const SITE = {
  name: "noma",
  fullName: "noma travel studio",
  claim: "Curated journeys for modern explorers",
  claimEs: "Viajes curados para exploradores modernos",
} as const;

export type NavLink = { label: string; href: string };

// El sitio es una landing one-page con anclas + páginas maquetadas.
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Quiénes somos", href: "/#studio" },
  { label: "Cómo trabajamos", href: "/#metodo" },
  { label: "Destinos", href: "/#destinos" },
  { label: "Contacto", href: "/#contacto" },
];

export const FOOTER_LINKS: readonly NavLink[] = [
  { label: "Studio", href: "/studio" },
  { label: "Servicios", href: "/servicios" },
  { label: "Destinos", href: "/destinos" },
  { label: "Contacto", href: "/contacto" },
];
