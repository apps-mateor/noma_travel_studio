"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  src: string;
  poster: string;
}

/**
 * ¿El usuario pidió gastar menos datos o energía?
 * Cubre el modo "ahorro de datos" (Android/Chrome), la media query
 * equivalente y "reducir movimiento" (un video de fondo es movimiento).
 */
function prefiereAhorro(): boolean {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  return (
    Boolean(conn?.saveData) ||
    window.matchMedia("(prefers-reduced-data: reduce)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Video de fondo del hero. Es componente cliente porque React no emite el
 * atributo `muted` en el HTML del servidor, y los navegadores embebidos
 * (Instagram, Facebook) deciden el autoplay con ese HTML crudo: al no ver
 * el video muteado lo bloquean y muestran el botón de play nativo.
 * Acá forzamos el mute por propiedad y disparamos el play() desde JS.
 *
 * Fallback de ahorro: el video arranca con `preload="none"` y sin
 * `autoplay`, así no descarga nada hasta decidirlo acá. Con ahorro de
 * datos/energía activo queda solo la imagen (0 bytes de video).
 *
 * Fallback visual: la imagen del hero vive siempre debajo del video, y el
 * video es invisible hasta que dispara `playing`. Cualquier falla —autoplay
 * bloqueado, mp4 ausente, codec no soportado— termina mostrando la foto,
 * nunca un rectángulo negro ni un botón de play.
 */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reproduciendo, setReproduciendo] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefiereAhorro()) return;

    video.muted = true;
    video.defaultMuted = true;

    const play = () => {
      // play() dispara la descarga (pisa el preload="none") y arranca.
      video.play().catch(() => {
        // Autoplay bloqueado (ej. modo bajo consumo): queda el poster
        // y el reintento al primer toque.
      });
    };

    play();

    // Algunos WebViews recién permiten play() tras la primera interacción.
    window.addEventListener("touchstart", play, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", play);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      {/* La foto del hero es el piso: se ve siempre que el video no esté
          reproduciendo de verdad. Es el LCP de la página. */}
      <img
        src={poster}
        alt=""
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={ref}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          reproduciendo ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        onPlaying={() => setReproduciendo(true)}
        // Atributo legado que los WebViews de iOS todavía respetan para
        // reproducir inline sin ir a pantalla completa.
        {...{ "webkit-playsinline": "true" }}
      />
    </div>
  );
}
