export interface Boliche {
  id: string
  name: string
  image: string
  nightTheme: string
  dj: string
  instagram: string
  location: string
  description: string
  barrio: string
  telefono: string
  horario: string
  diasAbierto: string[]
  destacado: boolean
  direccionCompleta: string
}

export interface Trago {
  id: string
  name: string
  category: string
  price: number
  description: string
  alcoholic: boolean
  disponible: boolean
  happyHour?: {
    horario: string
    precio: number
  }
}

export interface Evento {
  id: string
  nombre: string
  poster: string
  bolicheId: string
  boliche: string
  fecha: Date
  hora: string
  djs: string[]
  tematica: string
  precio: number
  destacado: boolean
  descripcion: string
  preciosEspeciales?: { trago: string; precio: number }[]
  promos?: string[]
}

export interface PrecioPorBoliche {
  bolicheId: string
  tragoId: string
  precio: number
  disponible: boolean
}

export const boliches: Boliche[] = [
  {
    id: "macondo",
    name: "Macondo",
    image: "/nightclub-interior-red-lights.jpg",
    nightTheme: "Noche Electrónica",
    dj: "DJ Martín Rivas",
    instagram: "@macondosalta",
    location: "Balcarce 901",
    barrio: "Centro",
    telefono: "387-555-1234",
    horario: "23:00 - 06:00",
    diasAbierto: ["Jueves", "Viernes", "Sábado", "Domingo"],
    destacado: true,
    direccionCompleta: "Balcarce 901, Centro, Salta Capital",
    description:
      "El mejor lugar para disfrutar de música electrónica en Salta. Ambiente moderno con las mejores luces y sonido de la ciudad.",
  },
  {
    id: "patio-cerveceria",
    name: "Patio de la Cervecería",
    image: "/bar-vintage-warm-lights.jpg",
    nightTheme: "Cerveza Artesanal",
    dj: "DJ Lucas Paz",
    instagram: "@patiocerveceria",
    location: "Balcarce 885",
    barrio: "Centro",
    telefono: "387-555-2345",
    horario: "20:00 - 03:00",
    diasAbierto: ["Miércoles", "Jueves", "Viernes", "Sábado"],
    destacado: false,
    direccionCompleta: "Balcarce 885, Centro, Salta Capital",
    description: "Cervecería con patio al aire libre. Gran variedad de cervezas artesanales y ambiente relajado.",
  },
  {
    id: "la-vieja-estacion",
    name: "La Vieja Estación",
    image: "/colonial-bar-night.jpg",
    nightTheme: "Rock Nacional",
    dj: "DJ Franco Gómez",
    instagram: "@laviejaestacion",
    location: "Balcarce 799",
    barrio: "Centro",
    telefono: "387-555-3456",
    horario: "22:00 - 05:00",
    diasAbierto: ["Viernes", "Sábado"],
    destacado: false,
    direccionCompleta: "Balcarce 799, Centro, Salta Capital",
    description: "Rock nacional y buena onda en el corazón de Balcarce. El lugar ideal para los amantes del rock.",
  },
  {
    id: "club-social",
    name: "Club Social",
    image: "/pub-dark-atmosphere.jpg",
    nightTheme: "Reggaeton & Trap",
    dj: "DJ Sofi Torres",
    instagram: "@clubsocialsalta",
    location: "San Martín 456",
    barrio: "San Lorenzo",
    telefono: "387-555-4567",
    horario: "23:00 - 06:00",
    diasAbierto: ["Viernes", "Sábado"],
    destacado: false,
    direccionCompleta: "San Martín 456, San Lorenzo, Salta",
    description: "La mejor música urbana de Salta. Reggaeton, trap y música latina toda la noche.",
  },
  {
    id: "wayruro",
    name: "Wayruro",
    image: "/modern-nightclub-colorful.jpg",
    nightTheme: "Música Variada",
    dj: "DJ Caro Méndez",
    instagram: "@wayrurosalta",
    location: "Caseros 456",
    barrio: "Centro",
    telefono: "387-555-5678",
    horario: "22:00 - 05:00",
    diasAbierto: ["Jueves", "Viernes", "Sábado"],
    destacado: true,
    direccionCompleta: "Caseros 456, Centro, Salta Capital",
    description: "Ambiente premium con música variada. El lugar más exclusivo de Salta con los mejores tragos.",
  },
  {
    id: "terraza-bar",
    name: "Terraza Bar",
    image: "/nightclub-dance-floor.jpg",
    nightTheme: "Cumbia & Cuarteto",
    dj: "DJ Nico Valdez",
    instagram: "@terrazabarsalta",
    location: "España 650",
    barrio: "Tres Cerritos",
    telefono: "387-555-6789",
    horario: "21:00 - 04:00",
    diasAbierto: ["Viernes", "Sábado", "Domingo"],
    destacado: false,
    direccionCompleta: "España 650, Tres Cerritos, Salta Capital",
    description: "Terraza al aire libre con la mejor cumbia y cuarteto. Vista panorámica de la ciudad.",
  },
]

export const tragos: Trago[] = [
  // Cervezas
  {
    id: "cerveza-quilmes",
    name: "Quilmes",
    category: "Cervezas",
    price: 2800,
    description: "Pinta de cerveza tirada",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "cerveza-andes",
    name: "Andes",
    category: "Cervezas",
    price: 2500,
    description: "Pinta de cerveza tirada",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "cerveza-stella",
    name: "Stella Artois",
    category: "Cervezas",
    price: 3200,
    description: "Botella 330ml",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "cerveza-brahma",
    name: "Brahma",
    category: "Cervezas",
    price: 2600,
    description: "Pinta de cerveza tirada",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "cerveza-corona",
    name: "Corona",
    category: "Cervezas",
    price: 3500,
    description: "Botella 355ml con limón",
    alcoholic: true,
    disponible: true,
  },

  // Tragos
  {
    id: "fernet-coca",
    name: "Fernet con Coca",
    category: "Tragos",
    price: 3500,
    description: "Fernet Branca con Coca Cola",
    alcoholic: true,
    disponible: true,
    happyHour: {
      horario: "23:00 - 01:00",
      precio: 2800,
    },
  },
  {
    id: "gin-tonic",
    name: "Gin Tonic",
    category: "Tragos",
    price: 4500,
    description: "Gin Beefeater con Schweppes",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "vodka-energy",
    name: "Vodka Energy",
    category: "Tragos",
    price: 4000,
    description: "Vodka Smirnoff con Speed",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "campari",
    name: "Campari",
    category: "Tragos",
    price: 3800,
    description: "Campari con jugo de naranja",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "mojito",
    name: "Mojito",
    category: "Tragos",
    price: 4200,
    description: "Ron, menta, lima y soda",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "daiquiri",
    name: "Daiquiri",
    category: "Tragos",
    price: 4300,
    description: "Ron, lima y azúcar",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "caipirinha",
    name: "Caipirinha",
    category: "Tragos",
    price: 4100,
    description: "Cachaça, lima y azúcar",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "whisky-coca",
    name: "Whisky con Coca",
    category: "Tragos",
    price: 5000,
    description: "Whisky Johnnie Walker Red con Coca",
    alcoholic: true,
    disponible: true,
  },

  // Shots
  {
    id: "shot-jager",
    name: "Jägermeister",
    category: "Shots",
    price: 2000,
    description: "Shot 40ml bien frío",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "shot-tequila",
    name: "Tequila",
    category: "Shots",
    price: 1800,
    description: "Shot con sal y limón",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "shot-vodka",
    name: "Vodka",
    category: "Shots",
    price: 1500,
    description: "Shot de vodka",
    alcoholic: true,
    disponible: true,
  },
  {
    id: "shot-fernet",
    name: "Fernet",
    category: "Shots",
    price: 1600,
    description: "Shot de Fernet puro",
    alcoholic: true,
    disponible: true,
  },

  // Sin Alcohol
  {
    id: "agua",
    name: "Agua Mineral",
    category: "Sin Alcohol",
    price: 1000,
    description: "Agua mineral 500ml",
    alcoholic: false,
    disponible: true,
  },
  {
    id: "coca-cola",
    name: "Coca Cola",
    category: "Sin Alcohol",
    price: 1500,
    description: "Coca Cola 500ml",
    alcoholic: false,
    disponible: true,
  },
  {
    id: "sprite",
    name: "Sprite",
    category: "Sin Alcohol",
    price: 1500,
    description: "Sprite 500ml",
    alcoholic: false,
    disponible: true,
  },
  {
    id: "jugo-natural",
    name: "Jugo Natural",
    category: "Sin Alcohol",
    price: 2000,
    description: "Jugo de naranja exprimido",
    alcoholic: false,
    disponible: true,
  },
]

export const eventos: Evento[] = [
  {
    id: "fiesta-neon",
    nombre: "Fiesta Neon",
    poster: "/neon-party-poster.jpg",
    bolicheId: "macondo",
    boliche: "Macondo",
    fecha: new Date("2025-10-15"),
    hora: "23:00",
    djs: ["DJ Snake", "DJ Mike"],
    tematica: "Neon Party",
    precio: 5000,
    destacado: true,
    descripcion:
      "Vení a la mejor fiesta neon de Salta. Música electrónica toda la noche con los mejores DJs. Tragos especiales y sorpresas durante toda la noche. Dress code: Ropa blanca o neon.",
    preciosEspeciales: [
      { trago: "Fernet con Coca", precio: 2500 },
      { trago: "Vodka Energy", precio: 3000 },
    ],
    promos: ["2x1 en tragos hasta la 1am", "Entrada gratis para mujeres hasta las 12am"],
  },
  {
    id: "rock-night",
    nombre: "Rock Night",
    poster: "/rock-concert-poster.png",
    bolicheId: "la-vieja-estacion",
    boliche: "La Vieja Estación",
    fecha: new Date("2025-10-16"),
    hora: "22:00",
    djs: ["DJ Franco Gómez", "DJ Rock Master"],
    tematica: "Rock Nacional",
    precio: 4000,
    destacado: false,
    descripcion:
      "La mejor noche de rock nacional en Salta. Desde los clásicos hasta lo más nuevo del rock argentino. Ambiente único para los verdaderos rockeros.",
    preciosEspeciales: [{ trago: "Cerveza Quilmes", precio: 2000 }],
    promos: ["Happy hour de 22 a 24hs"],
  },
  {
    id: "reggaeton-party",
    nombre: "Reggaeton Party",
    poster: "/reggaeton-party-poster.jpg",
    bolicheId: "club-social",
    boliche: "Club Social",
    fecha: new Date("2025-10-22"),
    hora: "23:00",
    djs: ["DJ Sofi Torres", "DJ Perreo"],
    tematica: "Reggaeton & Trap",
    precio: 4500,
    destacado: false,
    descripcion:
      "La noche más caliente de Salta. Puro reggaeton, trap y música urbana. Los mejores hits del momento y los clásicos que nunca fallan.",
    promos: ["Entrada con consumición incluida"],
  },
  {
    id: "electronica-night",
    nombre: "Electrónica Night",
    poster: "/electronic-music-poster.jpg",
    bolicheId: "wayruro",
    boliche: "Wayruro",
    fecha: new Date("2025-10-23"),
    hora: "23:00",
    djs: ["DJ Caro Méndez", "DJ Techno Master", "DJ House"],
    tematica: "House & Techno",
    precio: 6000,
    destacado: true,
    descripcion:
      "Noche de música electrónica de primer nivel. House, techno y progressive con los mejores DJs de la región. Ambiente premium y producción de luces espectacular.",
    preciosEspeciales: [
      { trago: "Gin Tonic", precio: 3500 },
      { trago: "Vodka Energy", precio: 3200 },
    ],
    promos: ["Open bar hasta la 1am para VIP"],
  },
  {
    id: "retro-80s-90s",
    nombre: "Retro 80s/90s",
    poster: "/80s-90s-retro-party-poster.jpg",
    bolicheId: "patio-cerveceria",
    boliche: "Patio de la Cervecería",
    fecha: new Date("2025-10-29"),
    hora: "22:00",
    djs: ["DJ Lucas Paz"],
    tematica: "Retro",
    precio: 3500,
    destacado: false,
    descripcion:
      "Viajá en el tiempo con los mejores hits de los 80s y 90s. Rock, pop, new wave y todo lo que marcó una época. Dress code: Retro style.",
    promos: ["Cerveza a precio especial toda la noche"],
  },
  {
    id: "trap-night",
    nombre: "Trap Night",
    poster: "/trap-music-poster.jpg",
    bolicheId: "macondo",
    boliche: "Macondo",
    fecha: new Date("2025-10-30"),
    hora: "23:00",
    djs: ["DJ Martín Rivas", "DJ Trap King"],
    tematica: "Trap",
    precio: 5000,
    destacado: false,
    descripcion: "Puro trap argentino y latino. Los mejores exponentes del género en una noche inolvidable.",
    promos: ["Entrada anticipada con descuento"],
  },
  {
    id: "cumbia-show",
    nombre: "Cumbia Show",
    poster: "/cumbia-party-poster.jpg",
    bolicheId: "terraza-bar",
    boliche: "Terraza Bar",
    fecha: new Date("2025-11-05"),
    hora: "21:00",
    djs: ["DJ Nico Valdez", "DJ Cumbia Master"],
    tematica: "Cumbia & Cuarteto",
    precio: 3000,
    destacado: false,
    descripcion:
      "La mejor cumbia y cuarteto en la terraza más linda de Salta. Ambiente familiar y mucha diversión. Vení a bailar toda la noche.",
    promos: ["Entrada gratis para grupos de 4 o más"],
  },
  {
    id: "halloween-party",
    nombre: "Halloween Party",
    poster: "/halloween-party-poster.jpg",
    bolicheId: "la-vieja-estacion",
    boliche: "La Vieja Estación",
    fecha: new Date("2025-10-31"),
    hora: "22:00",
    djs: ["DJ Franco Gómez", "DJ Terror"],
    tematica: "Halloween",
    precio: 5500,
    destacado: true,
    descripcion:
      "La noche más terrorífica del año. Vení disfrazado y participá del concurso de disfraces con premios increíbles. Decoración especial y tragos temáticos.",
    preciosEspeciales: [
      { trago: "Sangre de Vampiro", precio: 3500 },
      { trago: "Poción Mágica", precio: 3800 },
    ],
    promos: ["Entrada gratis con disfraz", "Premios para los mejores disfraces"],
  },
]

// Precios por boliche (matriz de precios)
export const preciosPorBoliche: PrecioPorBoliche[] = [
  // Macondo
  { bolicheId: "macondo", tragoId: "cerveza-quilmes", precio: 2800, disponible: true },
  { bolicheId: "macondo", tragoId: "cerveza-andes", precio: 2500, disponible: true },
  { bolicheId: "macondo", tragoId: "cerveza-stella", precio: 3200, disponible: true },
  { bolicheId: "macondo", tragoId: "fernet-coca", precio: 4500, disponible: true },
  { bolicheId: "macondo", tragoId: "gin-tonic", precio: 5000, disponible: true },
  { bolicheId: "macondo", tragoId: "vodka-energy", precio: 4500, disponible: true },
  { bolicheId: "macondo", tragoId: "shot-jager", precio: 2000, disponible: true },
  { bolicheId: "macondo", tragoId: "shot-tequila", precio: 1800, disponible: true },

  // Patio Cervecería
  { bolicheId: "patio-cerveceria", tragoId: "cerveza-quilmes", precio: 2500, disponible: true },
  { bolicheId: "patio-cerveceria", tragoId: "cerveza-andes", precio: 2800, disponible: true },
  { bolicheId: "patio-cerveceria", tragoId: "cerveza-stella", precio: 3000, disponible: true },
  { bolicheId: "patio-cerveceria", tragoId: "fernet-coca", precio: 3500, disponible: true },
  { bolicheId: "patio-cerveceria", tragoId: "gin-tonic", precio: 4800, disponible: true },
  { bolicheId: "patio-cerveceria", tragoId: "vodka-energy", precio: 4200, disponible: true },

  // La Vieja Estación
  { bolicheId: "la-vieja-estacion", tragoId: "cerveza-quilmes", precio: 2800, disponible: true },
  { bolicheId: "la-vieja-estacion", tragoId: "cerveza-andes", precio: 2700, disponible: true },
  { bolicheId: "la-vieja-estacion", tragoId: "fernet-coca", precio: 3800, disponible: true },
  { bolicheId: "la-vieja-estacion", tragoId: "gin-tonic", precio: 4500, disponible: true },
  { bolicheId: "la-vieja-estacion", tragoId: "vodka-energy", precio: 4000, disponible: true },
  { bolicheId: "la-vieja-estacion", tragoId: "shot-jager", precio: 1900, disponible: true },

  // Club Social
  { bolicheId: "club-social", tragoId: "cerveza-quilmes", precio: 3000, disponible: true },
  { bolicheId: "club-social", tragoId: "fernet-coca", precio: 4000, disponible: true },
  { bolicheId: "club-social", tragoId: "gin-tonic", precio: 4700, disponible: false },
  { bolicheId: "club-social", tragoId: "vodka-energy", precio: 4300, disponible: true },
  { bolicheId: "club-social", tragoId: "shot-tequila", precio: 2000, disponible: true },

  // Wayruro
  { bolicheId: "wayruro", tragoId: "cerveza-quilmes", precio: 3200, disponible: true },
  { bolicheId: "wayruro", tragoId: "cerveza-stella", precio: 3500, disponible: true },
  { bolicheId: "wayruro", tragoId: "fernet-coca", precio: 5000, disponible: true },
  { bolicheId: "wayruro", tragoId: "gin-tonic", precio: 6000, disponible: true },
  { bolicheId: "wayruro", tragoId: "vodka-energy", precio: 5500, disponible: true },
  { bolicheId: "wayruro", tragoId: "whisky-coca", precio: 6500, disponible: true },

  // Terraza Bar
  { bolicheId: "terraza-bar", tragoId: "cerveza-quilmes", precio: 2600, disponible: true },
  { bolicheId: "terraza-bar", tragoId: "cerveza-andes", precio: 2400, disponible: true },
  { bolicheId: "terraza-bar", tragoId: "fernet-coca", precio: 3600, disponible: true },
  { bolicheId: "terraza-bar", tragoId: "vodka-energy", precio: 3900, disponible: true },
]

export function searchItems(query: string) {
  const lowerQuery = query.toLowerCase().trim()

  if (!lowerQuery) return { boliches: [], tragos: [], eventos: [] }

  const matchedBoliches = boliches.filter(
    (b) =>
      b.name.toLowerCase().includes(lowerQuery) ||
      b.nightTheme.toLowerCase().includes(lowerQuery) ||
      b.location.toLowerCase().includes(lowerQuery) ||
      b.barrio.toLowerCase().includes(lowerQuery),
  )

  const matchedTragos = tragos.filter(
    (t) => t.name.toLowerCase().includes(lowerQuery) || t.category.toLowerCase().includes(lowerQuery),
  )

  const matchedEventos = eventos.filter(
    (e) =>
      e.nombre.toLowerCase().includes(lowerQuery) ||
      e.tematica.toLowerCase().includes(lowerQuery) ||
      e.boliche.toLowerCase().includes(lowerQuery),
  )

  return { boliches: matchedBoliches, tragos: matchedTragos, eventos: matchedEventos }
}

export function getBolicheById(id: string) {
  return boliches.find((b) => b.id === id)
}

export function getEventoById(id: string) {
  return eventos.find((e) => e.id === id)
}

export function getEventosByBoliche(bolicheId: string) {
  return eventos.filter((e) => e.bolicheId === bolicheId)
}

export function getPreciosByBoliche(bolicheId: string) {
  return preciosPorBoliche.filter((p) => p.bolicheId === bolicheId)
}

export function getTragoById(id: string) {
  return tragos.find((t) => t.id === id)
}
