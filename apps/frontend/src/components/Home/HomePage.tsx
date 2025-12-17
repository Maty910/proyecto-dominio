import { useEffect, useState } from "react"
import { Navbar } from "..//Navbar/Navbar"
import { Hero } from "../Hero/Hero"
import RoomsGrid from "../Rooms/RoomsGrid"
import ChatAssistant from "..//ChatAssistant/ChatAssistant"
import { Features } from "../Home/Features" // <--- Import nuevo
import { Testimonials } from "..//Home/Testimonials" // <--- Import nuevo
import { MOCK_ROOMS } from "../../../../backend/src/data/rooms"
import type { Room } from "../../types/types"
import { Loader2, Mail } from "lucide-react"

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = () => {
      try {
        setTimeout(() => {
          setRooms(MOCK_ROOMS)
          setLoading(false)
        }, 800)
      } catch (err) {
        setError("Error de carga")
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <main className="min-h-screen bg-background font-sans text-secondary selection:bg-primary/20 selection:text-primary">
      <Hero />

      {/* --- SECCIÓN 1: HABITACIONES DESTACADAS --- */}
      <section className="relative container mx-auto px-4 py-16">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-bold text-secondary">Destacadas para vos</h2>
          <p className="text-secondary/80 max-w-2xl mx-auto">
            Una selección de nuestras mejores estancias.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-secondary/50">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
          </div>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : (
          <RoomsGrid rooms={rooms.slice(0, 3)} /> // Mostramos solo 3 para que no sea eterno el home
        )}
        
        <div className="text-center mt-12">
          <a href="/rooms" className="btn-secondary inline-block">
            Ver todas las habitaciones
          </a>
        </div>
      </section>

      {/* --- SECCIÓN 2: FEATURES / SERVICIOS --- */}
      <Features />

      {/* --- SECCIÓN 3: TESTIMONIOS (FONDO OSCURO) --- */}
      <Testimonials />

      {/* --- SECCIÓN 4: CTA / NEWSLETTER --- */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Mail size={32} />
          </div>
          <h2 className="text-3xl font-bold text-secondary mb-4">No te pierdas ninguna oferta</h2>
          <p className="text-secondary/80 mb-8">
            Suscribite a nuestro newsletter y recibí descuentos exclusivos para tu próxima estadía.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="tu@email.com" 
              className="input-field"
            />
            <button className="btn-primary whitespace-nowrap">
              Suscribirme
            </button>
          </div>
        </div>
      </section>

      <ChatAssistant />
    </main>
  )
}