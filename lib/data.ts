export interface Boliche {
  id: string
  name: string
  image: string
  nightTheme: string
  dj: string
  instagram: string
  location: string
  description: string
}

export interface Trago {
  id: string
  name: string
  category: string
  price: number
  description: string
  alcoholic: boolean
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
    description: "El mejor lugar para disfrutar de música electrónica en Salta",
  },
  {
    id: "la-vieja-estacion",
    name: "La Vieja Estación",
    image: "/bar-vintage-warm-lights.jpg",
    nightTheme: "Rock Nacional",
    dj: "DJ Lucas Paz",
    instagram: "@laviejaestacion",
    location: "Balcarce 885",
    description: "Rock nacional y buena onda en el corazón de Balcarce",
  },
  {
    id: "wayruro",
    name: "Wayruro",
    image: "/modern-nightclub-colorful.jpg",
    nightTheme: "Reggaeton Night",
    dj: "DJ Sofi Torres",
    instagram: "@wayrurosalta",
    location: "Caseros 456",
    description: "La mejor música urbana y reggaeton de la ciudad",
  },
  {
    id: "oveja-negra",
    name: "Oveja Negra",
    image: "/pub-dark-atmosphere.jpg",
    nightTheme: "Indie & Alternative",
    dj: "DJ Franco Gómez",
    instagram: "@ovejanegrasalta",
    location: "Balcarce 799",
    description: "Música indie y alternativa para los que buscan algo diferente",
  },
  {
    id: "la-casona-del-molino",
    name: "La Casona del Molino",
    image: "/colonial-bar-night.jpg",
    nightTheme: "Cumbia & Cuarteto",
    dj: "DJ Caro Méndez",
    instagram: "@lacasonadelmolino",
    location: "Caseros 2500",
    description: "Cumbia y cuarteto en un ambiente único",
  },
  {
    id: "fenix-club",
    name: "Fénix Club",
    image: "/nightclub-dance-floor.jpg",
    nightTheme: "House & Techno",
    dj: "DJ Nico Valdez",
    instagram: "@fenixclubsalta",
    location: "España 650",
    description: "House y techno de primer nivel",
  },
]

export const tragos: Trago[] = [
  // Cócteles Clásicos
  {
    id: "1",
    name: "Fernet con Cola",
    category: "Clásicos",
    price: 2500,
    description: "El clásico argentino",
    alcoholic: true,
  },
  {
    id: "2",
    name: "Mojito",
    category: "Clásicos",
    price: 3000,
    description: "Ron, menta, lima y soda",
    alcoholic: true,
  },
  {
    id: "3",
    name: "Caipirinha",
    category: "Clásicos",
    price: 2800,
    description: "Cachaça, lima y azúcar",
    alcoholic: true,
  },
  { id: "4", name: "Daiquiri", category: "Clásicos", price: 3200, description: "Ron, lima y azúcar", alcoholic: true },

  // Tragos Premium
  {
    id: "5",
    name: "Gin Tonic",
    category: "Premium",
    price: 3500,
    description: "Gin premium con tónica",
    alcoholic: true,
  },
  { id: "6", name: "Negroni", category: "Premium", price: 3800, description: "Gin, Campari y vermut", alcoholic: true },
  {
    id: "7",
    name: "Old Fashioned",
    category: "Premium",
    price: 4000,
    description: "Whisky, bitter y azúcar",
    alcoholic: true,
  },
  {
    id: "8",
    name: "Margarita",
    category: "Premium",
    price: 3500,
    description: "Tequila, triple sec y lima",
    alcoholic: true,
  },

  // Shots
  {
    id: "9",
    name: "Tequila Shot",
    category: "Shots",
    price: 1500,
    description: "Shot de tequila con limón y sal",
    alcoholic: true,
  },
  {
    id: "10",
    name: "Jägermeister",
    category: "Shots",
    price: 1800,
    description: "Shot de Jäger bien frío",
    alcoholic: true,
  },
  {
    id: "11",
    name: "B-52",
    category: "Shots",
    price: 2000,
    description: "Kahlúa, Baileys y Grand Marnier",
    alcoholic: true,
  },

  // Cervezas
  {
    id: "12",
    name: "Cerveza Quilmes",
    category: "Cervezas",
    price: 1800,
    description: "Pinta de Quilmes",
    alcoholic: true,
  },
  {
    id: "13",
    name: "Cerveza Artesanal",
    category: "Cervezas",
    price: 2500,
    description: "Cerveza artesanal local",
    alcoholic: true,
  },
  { id: "14", name: "Corona", category: "Cervezas", price: 2200, description: "Cerveza importada", alcoholic: true },

  // Sin Alcohol
  {
    id: "15",
    name: "Limonada",
    category: "Sin Alcohol",
    price: 1500,
    description: "Limonada natural",
    alcoholic: false,
  },
  {
    id: "16",
    name: "Mojito Virgin",
    category: "Sin Alcohol",
    price: 2000,
    description: "Mojito sin alcohol",
    alcoholic: false,
  },
  {
    id: "17",
    name: "Coca Cola",
    category: "Sin Alcohol",
    price: 1200,
    description: "Coca Cola 500ml",
    alcoholic: false,
  },
  {
    id: "18",
    name: "Agua Mineral",
    category: "Sin Alcohol",
    price: 1000,
    description: "Agua mineral 500ml",
    alcoholic: false,
  },
]

export function searchItems(query: string) {
  const lowerQuery = query.toLowerCase().trim()

  if (!lowerQuery) return { boliches: [], tragos: [] }

  const matchedBoliches = boliches.filter(
    (b) =>
      b.name.toLowerCase().includes(lowerQuery) ||
      b.nightTheme.toLowerCase().includes(lowerQuery) ||
      b.location.toLowerCase().includes(lowerQuery),
  )

  const matchedTragos = tragos.filter(
    (t) => t.name.toLowerCase().includes(lowerQuery) || t.category.toLowerCase().includes(lowerQuery),
  )

  return { boliches: matchedBoliches, tragos: matchedTragos }
}
