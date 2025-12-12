import type { Room } from "./../../../frontend/src/types/types"

export const MOCK_ROOMS: Room[] = [
  {
    id: "1",
    title: "Standard Individual",
    type: "Single",
    price: 45000,
    capacity: 1,
    description: "Habitación acogedora perfecta para viajeros solitarios o de negocios. Decoración minimalista con toques esmeralda.",
    amenities: ["Wi-Fi", "TV Smart", "Escritorio", "Aire Acondicionado"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format&fit=crop",
    status: "available"
  },
  {
    id: "2",
    title: "Doble Clásica",
    type: "Double",
    price: 75000,
    capacity: 2,
    description: "Espacio confortable con cama Queen size y vista interna. Silenciosa y relajante.",
    amenities: ["Wi-Fi", "Desayuno incluido", "Baño privado", "Caja fuerte"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop",
    status: "available"
  },
  {
    id: "3",
    title: "Doble Deluxe con Balcón",
    type: "Double",
    price: 98000,
    capacity: 2,
    description: "Habitación amplia con balcón privado y vistas al jardín central. Mucha luz natural.",
    amenities: ["Wi-Fi", "Minibar", "Balcón", "Smart TV 50\""],
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000&auto=format&fit=crop",
    status: "available"
  },
  {
    id: "4",
    title: "Suite Esmeralda",
    type: "Suite",
    price: 150000,
    capacity: 3,
    description: "Nuestra suite insignia. Sala de estar separada, baño con hidromasaje y decoración de lujo.",
    amenities: ["Jacuzzi", "King Size", "Room Service 24h", "Cafetera Nespresso"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop",
    status: "occupied"
  },
  {
    id: "5",
    title: "Familiar Confort",
    type: "Family",
    price: 110000,
    capacity: 4,
    description: "Ideal para familias. Dos ambientes conectados, con espacio para que jueguen los chicos.",
    amenities: ["2 Baños", "Juegos de mesa", "Microondas", "Cunas disponibles"],
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1000&auto=format&fit=crop",
    status: "available"
  },
  {
    id: "6",
    title: "Penthouse Panorámico",
    type: "Penthouse",
    price: 250000,
    capacity: 2,
    description: "La joya del hotel. Ubicada en el último piso con terraza privada y vistas 360 de la ciudad.",
    amenities: ["Terraza privada", "Barra de tragos", "Sistema de sonido", "Check-out tardío"],
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000&auto=format&fit=crop",
    status: "available"
  },
  {
    id: "7",
    title: "Estudio Ejecutivo",
    type: "Single",
    price: 55000,
    capacity: 1,
    description: "Diseñada para trabajar remoto. Silla ergonómica, internet de alta velocidad e insonorización.",
    amenities: ["Wi-Fi 500mb", "Escritorio amplio", "Cafetera", "Impresora"],
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop",
    status: "available"
  },
  {
    id: "8",
    title: "Triple Amigos",
    type: "Family",
    price: 85000,
    capacity: 3,
    description: "Tres camas individuales en un ambiente moderno y divertido. Económica y funcional.",
    amenities: ["Lockers", "Wi-Fi", "Baño compartido", "Desayuno"],
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop",
    status: "maintenance"
  },
  {
    id: "9",
    title: "Garden Suite",
    type: "Suite",
    price: 135000,
    capacity: 2,
    description: "Acceso directo al jardín y piscina. Un oasis de tranquilidad con ducha exterior.",
    amenities: ["Acceso piscina", "Hamaca", "King Size", "Bata y pantuflas"],
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop",
    status: "available"
  },
  {
    id: "10",
    title: "Loft Industrial",
    type: "Double",
    price: 88000,
    capacity: 2,
    description: "Estilo moderno con ladrillo a la vista y techos altos. Muy elegida por parejas jóvenes.",
    amenities: ["Smart Home", "Cocina integrada", "Netflix", "Bicicletas gratis"],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000&auto=format&fit=crop",
    status: "available"
  },
  {
    id: "11",
    title: "Económica Backpacker",
    type: "Single",
    price: 30000,
    capacity: 1,
    description: "Pequeña pero funcional. Todo lo necesario para descansar después de recorrer la ciudad.",
    amenities: ["Ventilador", "Cama simple", "USB ports", "Mapa de la ciudad"],
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop",
    status: "available"
  },
  {
    id: "12",
    title: "Presidencial",
    type: "Suite",
    price: 320000,
    capacity: 4,
    description: "Máximo lujo y privacidad. Dos dormitorios, comedor formal y mayordomo a disposición.",
    amenities: ["Mayordomo", "Cine privado", "Cava de vinos", "Seguridad privada"],
    image: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?q=80&w=1000&auto=format&fit=crop",
    status: "available"
  }
]