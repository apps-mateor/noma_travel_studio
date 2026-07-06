// Carga el contenido actual del sitio en Sanity, para que el admin
// arranque con todo pre-cargado en vez de campos vacíos.
//
// Uso:
//   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx SANITY_WRITE_TOKEN=yyy node scripts/seed-cms.mjs
//
// El token puede ser el del login del CLI (~/.config/sanity/config.json)
// o uno creado en sanity.io/manage → API → Tokens (permiso Editor).
// Correr UNA sola vez; si se corre de nuevo, pisa lo editado en el admin.

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Faltan variables: NEXT_PUBLIC_SANITY_PROJECT_ID y SANITY_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2026-07-06", token, useCdn: false });

const docs = [
  {
    _id: "hero",
    _type: "hero",
    titulo: "Curated journeys\nfor modern explorers",
    palabraNaranja: "modern",
    subtitulo: "Viajes a medida, desde la escucha y el criterio",
  },
  {
    _id: "concepto",
    _type: "concepto",
    fraseInicio: "Hay tantos viajes como viajeros en el mundo.",
    fraseMedio: "El mejor es el que se",
    palabraDestacada: "cura",
    fraseFin: "para vos.",
    proposito:
      "Elevar la forma en que las personas viajan, ayudándolas a elegir mejor desde el criterio, vivir experiencias con sentido y volver con recuerdos que realmente valgan la pena.",
    recuadros: [
      { _key: "r1", titulo: "Viajes curados", texto: "Por personas que lo hicieron." },
      { _key: "r2", titulo: "Gestión simple", texto: "Simpleza en la gestión integral." },
      { _key: "r3", titulo: "Cercanía", texto: "Experiencia real y humana." },
      { _key: "r4", titulo: "Comunicación", texto: "Sólida, curada y aspiracional." },
    ],
  },
  {
    _id: "quienesSomos",
    _type: "quienesSomos",
    titulo: "Detrás de todo, nosotras.",
    parrafos: [
      "Nacimos de una pasión compartida por viajar y de una forma muy particular de hacerlo: con curiosidad, criterio y atención a los detalles que realmente importan.",
      "Durante años viajamos, investigamos, probamos, nos equivocamos y aprendimos, hasta darnos cuenta de que eso que hacíamos naturalmente —elegir bien, filtrar opciones y recomendar con convicción— era justamente lo que más faltaba al momento de planear un viaje.",
      "Hoy transformamos esa experiencia vivida en viajes pensados a medida, diseñados desde la escucha y no desde el catálogo. Acompañamos a cada persona antes, durante y después del viaje.",
    ],
    equipo: [
      {
        _key: "e1",
        nombre: "Nombre Apellido",
        rol: "Co-founder · Curaduría",
        bio: "Años de viajes propios convertidos en criterio: destinos probados, zonas que funcionan y experiencias que valen la pena.",
      },
      {
        _key: "e2",
        nombre: "Nombre Apellido",
        rol: "Co-founder · Experiencia",
        bio: "La mirada sobre el detalle: ritmo del viaje, bases y tiempos pensados desde la escucha de cada viajero.",
      },
      {
        _key: "e3",
        nombre: "Nombre Apellido",
        rol: "Co-founder · Operación",
        bio: "El acompañamiento antes, durante y después: reservas, rutas y decisiones ordenadas en un solo lugar.",
      },
    ],
  },
  {
    _id: "comoTrabajamos",
    _type: "comoTrabajamos",
    titulo: "Cómo trabajamos",
    intro:
      "Cuatro fundamentos que sostienen cada viaje. No es una promesa de marketing: es la forma en que trabajamos, de principio a fin.",
    pilares: [
      {
        _key: "p1",
        titulo: "Knowhow real",
        texto:
          "Recomendamos desde la experiencia propia: sabemos dónde dormir, qué zonas funcionan y qué experiencias valen la pena. No seguimos tendencias ni catálogos; cada decisión está respaldada por criterio.",
      },
      {
        _key: "p2",
        titulo: "Cultura customer-centric",
        texto:
          "El viaje no se arma desde un listado de lugares, sino desde una conversación profunda 1:1. Escuchamos tu contexto, tu momento vital y tu estilo para traducir todo eso en decisiones concretas.",
      },
      {
        _key: "p3",
        titulo: "Servicio end to end",
        texto:
          "No entregamos un PDF y desaparecemos. Estamos presentes antes, durante y después del viaje: resolvemos dudas, ajustamos sobre la marcha y acompañamos activamente.",
      },
      {
        _key: "p4",
        titulo: "Producto diferencial",
        texto:
          "Reservas, documentación, rutas, recomendaciones y decisiones viven en una app exclusiva, ordenada y accesible en un solo lugar. La tecnología no reemplaza el trato humano: lo potencia.",
      },
    ],
    pasos: [
      { _key: "s1", titulo: "Nos contás qué estás buscando", texto: "Destino, fechas, tipo de experiencia…" },
      { _key: "s2", titulo: "Conectamos con el asesor ideal", texto: "Alguien que conoce el destino a fondo." },
      { _key: "s3", titulo: "Recibís una propuesta a medida", texto: "A medida, sin paquetes armados." },
      { _key: "s4", titulo: "Viajás con todo resuelto", texto: "Y con asistencia cuando la necesites." },
    ],
  },
  {
    _id: "destinos",
    _type: "destinos",
    titulo: "Destinos con mirada",
    intro:
      "No las fotos típicas de siempre. Lugares elegidos por lo que se vive en ellos —arrastrá para explorar.",
    lista: [
      { _key: "d1", nombre: "Japón", lugar: "Kioto · Tokio", nota: "Rituales cotidianos y cafés escondidos." },
      { _key: "d2", nombre: "Toscana", lugar: "Italia", nota: "Un roadtrip de colinas, vino y tiempo lento." },
      { _key: "d3", nombre: "Marruecos", lugar: "Atlas · Sáhara", nota: "Mercados, color y noches de desierto." },
      { _key: "d4", nombre: "Patagonia", lugar: "Argentina · Chile", nota: "Fin del mundo, escala humana." },
      { _key: "d5", nombre: "Vietnam", lugar: "Norte a sur", nota: "Paisaje, comida y movimiento." },
      { _key: "d6", nombre: "Noruega", lugar: "Fiordos", nota: "Silencio, agua y luz del norte." },
    ],
  },
  {
    _id: "contacto",
    _type: "contacto",
    titulo: "Contacto",
    intro:
      "Escuchamos antes de proponer. Contanos el contexto, el momento y el estilo de viaje —el resto lo curamos nosotras.",
  },
];

const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction());
const result = await tx.commit();
console.log(`✓ Cargadas ${result.results.length} secciones en Sanity (${projectId}/${dataset}).`);
