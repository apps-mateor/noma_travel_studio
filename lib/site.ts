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
 * `link` permite pisar el número con el cargado en el admin (CMS).
 */
export function whatsappHref(
  message: string = CONTACT.whatsappMessage,
  link: string = CONTACT.whatsappLink,
): string {
  const sep = link.includes("?") ? "&" : "?";
  return message ? `${link}${sep}text=${encodeURIComponent(message)}` : link;
}

/** Link wa.me a partir del número cargado en el admin; fallback al de código. */
export function whatsappLinkFromNumber(numero?: string): string {
  const digits = numero?.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : CONTACT.whatsappLink;
}

/** URL de Instagram a partir del usuario cargado en el admin. */
export function instagramUrl(handle: string): string {
  return `https://www.instagram.com/${handle.replace(/^@/, "")}/`;
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
