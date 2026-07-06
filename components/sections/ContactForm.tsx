"use client";

import { useState, type FormEvent } from "react";

const FIELD =
  "w-full rounded-xl border border-brown/20 bg-cream px-4 py-3 font-serif text-brown placeholder:text-brown/40 transition-colors focus:border-naranja focus:outline-none";

interface ContactFormProps {
  /** Link wa.me destino (número cargado en el admin). */
  whatsappLink: string;
}

/**
 * Formulario de contacto: arma un mensaje de WhatsApp con todos los
 * campos y abre el chat listo para enviar. No pierde ningún dato.
 */
export function ContactForm({ whatsappLink }: ContactFormProps) {
  const [enviando, setEnviando] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const campo = (name: string) => String(f.get(name) ?? "").trim();

    const lineas = [
      "Hola noma, quiero empezar a planear un viaje.",
      campo("nombre") && `Soy ${campo("nombre")}.`,
      campo("tipo") && `Tipo de viaje: ${campo("tipo")}.`,
      campo("fecha") && `Cuándo: ${campo("fecha")}.`,
      campo("mensaje"),
      campo("email") && `Mi email: ${campo("email")}`,
    ].filter(Boolean);

    const sep = whatsappLink.includes("?") ? "&" : "?";
    setEnviando(true);
    window.open(
      `${whatsappLink}${sep}text=${encodeURIComponent(lineas.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setEnviando(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl bg-cream p-6 shadow-[0_30px_60px_-30px_rgba(89,57,43,0.4)] sm:p-9"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-brown/60">Nombre</span>
          <input className={FIELD} type="text" name="nombre" placeholder="Cómo te llamás" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-brown/60">Email</span>
          <input className={FIELD} type="email" name="email" placeholder="tu@email.com" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-brown/60">Tipo de viaje</span>
          <input className={FIELD} type="text" name="tipo" placeholder="Luna de miel, roadtrip…" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-brown/60">¿Cuándo?</span>
          <input className={FIELD} type="text" name="fecha" placeholder="Aprox. mes / año" />
        </label>
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="eyebrow text-brown/60">Contanos un poco más</span>
          <textarea
            className={`${FIELD} min-h-28 resize-y`}
            name="mensaje"
            placeholder="Qué te imaginás, qué te mueve, los 'sí o sí'…"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brown px-7 py-4 font-display text-sm uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-naranja sm:w-auto"
      >
        Empezar a planear
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
      <p className="mt-4 font-serif text-sm italic text-brown/55">
        Se abre WhatsApp con tu mensaje armado, listo para enviar.
      </p>
    </form>
  );
}
