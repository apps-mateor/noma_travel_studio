import localFont from "next/font/local";

// Fuentes reales del brandbook de noma (auto-hospedadas).
// Presicav Bold → títulos display (mayúscula, tracked).
export const presicav = localFont({
  src: "./fonts/Presicav-Bold.otf",
  variable: "--font-presicav",
  weight: "700",
  display: "swap",
});

// New Spirit → cuerpo editorial / serif.
export const newSpirit = localFont({
  src: "./fonts/NewSpirit.otf",
  variable: "--font-newspirit",
  display: "swap",
});

// Railway Gank → acentos manuscritos.
export const railwayGank = localFont({
  src: "./fonts/RailwayGank.otf",
  variable: "--font-railway",
  display: "swap",
});
