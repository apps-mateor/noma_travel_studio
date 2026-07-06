// Copy real extraído del brandbook de noma. Nada acá es texto de relleno:
// son las palabras, el tono y la estrategia que definió la marca.

export const PROPOSITO =
  "Elevar la forma en que las personas viajan, ayudándolas a elegir mejor desde el criterio, vivir experiencias con sentido y volver con recuerdos que realmente valgan la pena.";

export const CONCEPTO = {
  pre: "Hay tantos viajes como viajeros en el mundo.",
  linePlain: "El mejor es el que se",
  word: "cura",
  post: "para vos.",
} as const;

export const STUDIO = {
  kicker: "Quiénes somos",
  title: "Detrás de todo, nosotras.",
  body: [
    "Nacimos de una pasión compartida por viajar y de una forma muy particular de hacerlo: con curiosidad, criterio y atención a los detalles que realmente importan.",
    "Durante años viajamos, investigamos, probamos, nos equivocamos y aprendimos, hasta darnos cuenta de que eso que hacíamos naturalmente —elegir bien, filtrar opciones y recomendar con convicción— era justamente lo que más faltaba al momento de planear un viaje.",
    "Hoy transformamos esa experiencia vivida en viajes pensados a medida, diseñados desde la escucha y no desde el catálogo. Acompañamos a cada persona antes, durante y después del viaje.",
  ],
} as const;

// Cómo nos posicionamos: Curaduría + Mirada + Criterio + Experiencia
export const POSICIONAMIENTO = ["Curaduría", "Mirada", "Criterio", "Experiencia"] as const;

// Los 4 pilares de "Cómo trabajamos" (sin numeración, pedido de la marca).
export type Pilar = { title: string; body: string };

export const PILARES: readonly Pilar[] = [
  {
    title: "Knowhow real",
    body: "Recomendamos desde la experiencia propia: sabemos dónde dormir, qué zonas funcionan y qué experiencias valen la pena. No seguimos tendencias ni catálogos; cada decisión está respaldada por criterio.",
  },
  {
    title: "Cultura customer-centric",
    body: "El viaje no se arma desde un listado de lugares, sino desde una conversación profunda 1:1. Escuchamos tu contexto, tu momento vital y tu estilo para traducir todo eso en decisiones concretas.",
  },
  {
    title: "Servicio end to end",
    body: "No entregamos un PDF y desaparecemos. Estamos presentes antes, durante y después del viaje: resolvemos dudas, ajustamos sobre la marcha y acompañamos activamente.",
  },
  {
    title: "Producto diferencial",
    body: "Reservas, documentación, rutas, recomendaciones y decisiones viven en una app exclusiva, ordenada y accesible en un solo lugar. La tecnología no reemplaza el trato humano: lo potencia.",
  },
];

// El "cómo lo hacemos": los 4 pasos del proceso, en orden.
export type Paso = { title: string; body: string };

export const PASOS: readonly Paso[] = [
  { title: "Nos contás qué estás buscando", body: "Destino, fechas, tipo de experiencia…" },
  { title: "Conectamos con el asesor ideal", body: "Alguien que conoce el destino a fondo." },
  { title: "Recibís una propuesta a medida", body: "A medida, sin paquetes armados." },
  { title: "Viajás con todo resuelto", body: "Y con asistencia cuando la necesites." },
];

// Equipo — 3 fotos individuales con bio al hover.
// 👉 TODO: reemplazar nombres, roles y bios reales, y las fotos en
//    lib/images.ts (seeds "noma-equipo-1/2/3" + "noma-equipo").
export type Integrante = { name: string; role: string; bio: string; seed: string };

export const EQUIPO: readonly Integrante[] = [
  {
    name: "Nombre Apellido",
    role: "Co-founder · Curaduría",
    bio: "Años de viajes propios convertidos en criterio: destinos probados, zonas que funcionan y experiencias que valen la pena.",
    seed: "noma-equipo-1",
  },
  {
    name: "Nombre Apellido",
    role: "Co-founder · Experiencia",
    bio: "La mirada sobre el detalle: ritmo del viaje, bases y tiempos pensados desde la escucha de cada viajero.",
    seed: "noma-equipo-2",
  },
  {
    name: "Nombre Apellido",
    role: "Co-founder · Operación",
    bio: "El acompañamiento antes, durante y después: reservas, rutas y decisiones ordenadas en un solo lugar.",
    seed: "noma-equipo-3",
  },
];

export type Servicio = {
  title: string;
  tag: string;
  body: string;
  seed: string;
};

export const SERVICIOS: readonly Servicio[] = [
  {
    tag: "A medida",
    title: "Diseño de viaje",
    body: "Un itinerario pensado para vos, no para todos. Ritmo, bases, experiencias y tiempos definidos desde la escucha.",
    seed: "noma-disenio",
  },
  {
    tag: "Honeymoon",
    title: "Lunas de miel",
    body: "Una luna de miel distinta, a la altura de las expectativas, sin que tengas que ocuparte de los detalles.",
    seed: "noma-luna",
  },
  {
    tag: "Aventura",
    title: "Roadtrips & exploración",
    body: "Para el viajero inquieto: naturaleza, deporte y confort en la dosis justa. Experiencias, no postales.",
    seed: "noma-roadtrip",
  },
  {
    tag: "End to end",
    title: "Gestión con la app",
    body: "Toda la información del viaje —reservas, rutas y recomendaciones— ordenada y accesible en un solo lugar.",
    seed: "noma-app",
  },
];

export type Destino = {
  name: string;
  place: string;
  note: string;
  seed: string;
};

// Destinos editoriales, en línea con el perfil de "explorador moderno":
// exótico, curado, con mirada propia. Imágenes placeholder a reemplazar
// por la fotografía analógica ad hoc de la marca.
export const DESTINOS: readonly Destino[] = [
  { name: "Japón", place: "Kioto · Tokio", note: "Rituales cotidianos y cafés escondidos.", seed: "noma-japon" },
  { name: "Toscana", place: "Italia", note: "Un roadtrip de colinas, vino y tiempo lento.", seed: "noma-toscana" },
  { name: "Marruecos", place: "Atlas · Sáhara", note: "Mercados, color y noches de desierto.", seed: "noma-marruecos" },
  { name: "Patagonia", place: "Argentina · Chile", note: "Fin del mundo, escala humana.", seed: "noma-patagonia" },
  { name: "Vietnam", place: "Norte a sur", note: "Paisaje, comida y movimiento.", seed: "noma-vietnam" },
  { name: "Noruega", place: "Fiordos", note: "Silencio, agua y luz del norte.", seed: "noma-noruega" },
];

// Manifiesto (tono editorial, sin urgencia ni signos de exclamación).
export const MANIFIESTO_LINES: readonly string[] = [
  "Hay tantas maneras de viajar como viajeros en el mundo.",
  "Viajes cortos, viajes largos.",
  "Viajes para festejar. Viajes para sanar.",
  "Viajes para moverse. Viajes para parar.",
  "Viajes para buscar compañía. Viajes para estar en soledad.",
  "Cada uno empieza en una idea —y merece estar bien pensado.",
];

// Personalidad de marca — para el marquee "somos".
export const SOMOS = [
  "Curadoras",
  "Sensibles",
  "Profesionales",
  "Aspiracionales",
  "Cercanas",
  "Expertas",
  "Inspiradoras",
  "Detallistas",
  "Modernas",
] as const;

// Propuesta de valor (cuatro líneas).
export const PROPUESTA_VALOR: readonly { title: string; body: string }[] = [
  { title: "Viajes curados", body: "Por personas que lo hicieron." },
  { title: "Gestión simple", body: "Simpleza en la gestión integral." },
  { title: "Cercanía", body: "Experiencia real y humana." },
  { title: "Comunicación", body: "Sólida, curada y aspiracional." },
];
