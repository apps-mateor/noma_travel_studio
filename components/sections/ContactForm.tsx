"use client";

import { useState, type FormEvent } from "react";

const FIELD =
  "w-full rounded-xl border border-brown/20 bg-cream px-4 py-3 font-serif text-brown placeholder:text-brown/40 transition-colors focus:border-naranja focus:outline-none";

type Estado = "idle" | "enviando" | "ok" | "error";

// Textos de ejemplo (ghost text) por defecto; se pisan desde el admin.
const PLACEHOLDERS = {
  nombre: "Cómo te llamás",
  email: "tu@email.com",
  tipo: "Luna de miel, roadtrip…",
  cuando: "Aprox. mes / año",
  cuantos: "Ej: 2 adultos, 2 peques",
  telefono: "+54 9 11 …",
  mensaje: "Qué te imaginás, qué te mueve, los 'sí o sí'…",
} as const;

type Placeholders = Partial<Record<keyof typeof PLACEHOLDERS, string>>;

interface ContactFormProps {
  /** Casilla que recibe las consultas (se edita en el admin → Contacto). */
  email: string;
  /** Ghost text de cada campo (se edita en el admin → Contacto). */
  placeholders?: Placeholders | null;
}

/**
 * Formulario de contacto — envía la consulta por email (FormSubmit).
 * ⚠️ Primera vez: FormSubmit manda un mail de activación a la casilla
 * destino; hay que clickear "Activate" una única vez para empezar a recibir.
 */
export function ContactForm({ email, placeholders }: ContactFormProps) {
  const [estado, setEstado] = useState<Estado>("idle");
  const ph = (campo: keyof typeof PLACEHOLDERS) =>
    placeholders?.[campo] || PLACEHOLDERS[campo];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const campo = (name: string) => String(f.get(name) ?? "").trim();

    setEstado("enviando");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nueva consulta desde la web — ${campo("nombre") || "sin nombre"}`,
          _template: "table",
          _captcha: "false",
          Nombre: campo("nombre"),
          Email: campo("email"),
          "Tipo de viaje": campo("tipo"),
          Cuándo: campo("fecha"),
          "Cuántos viajan": campo("personas"),
          Teléfono: campo("telefono"),
          Mensaje: campo("mensaje"),
        }),
      });
      if (!res.ok) throw new Error(`FormSubmit ${res.status}`);
      setEstado("ok");
      form.reset();
    } catch {
      setEstado("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl bg-cream p-6 shadow-[0_30px_60px_-30px_rgba(89,57,43,0.4)] sm:p-9"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-brown">Nombre</span>
          <input className={FIELD} type="text" name="nombre" placeholder={ph("nombre")} required />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-brown">Email</span>
          <input className={FIELD} type="email" name="email" placeholder={ph("email")} required />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow whitespace-nowrap text-brown">Tipo de viaje</span>
          <input className={FIELD} type="text" name="tipo" placeholder={ph("tipo")} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow whitespace-nowrap text-brown">¿Cuándo?</span>
          <input className={FIELD} type="text" name="fecha" placeholder={ph("cuando")} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow whitespace-nowrap text-brown">¿Cuántos viajan?</span>
          <input className={FIELD} type="text" name="personas" placeholder={ph("cuantos")} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow whitespace-nowrap text-brown">Teléfono (opcional)</span>
          <input className={FIELD} type="tel" name="telefono" placeholder={ph("telefono")} />
        </label>
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="eyebrow text-brown">Contanos un poco más</span>
          <textarea
            className={`${FIELD} min-h-28 resize-y`}
            name="mensaje"
            placeholder={ph("mensaje")}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brown px-7 py-4 font-display text-sm uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-naranja disabled:opacity-60 sm:w-auto"
      >
        {estado === "enviando" ? "Enviando…" : "Empezar a planear"}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>

      {estado === "ok" && (
        <p className="mt-4 font-serif text-sm italic text-verde">
          ¡Listo! Nos llegó tu consulta. Te respondemos a la brevedad.
        </p>
      )}
      {estado === "error" && (
        <p className="mt-4 font-serif text-sm italic text-naranja">
          Ups, no pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp.
        </p>
      )}
    </form>
  );
}
