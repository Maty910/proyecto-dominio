import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar/Navbar" // Corregí el path si es necesario (NavBar.tsx)
import { Hero } from "../components/Hero/Hero"
import RoomsGrid from "../components/Rooms/RoomsGrid" // Asegurate que el nombre del archivo coincida
import ChatAssistant from "../components/ChatAssistant/ChatAssistant"
import { fetchRooms } from "../services/api"
import type { Room } from "../types/types"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadRooms() {
      try {
        const data = await fetchRooms()
        setRooms(data)
      } catch (err: any) {
        console.error(err)
        setError("No pudimos cargar las habitaciones. Por favor, intentá más tarde.")
      } finally {
        setLoading(false)
      }
    }

    loadRooms()
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <Hero />

      {/* Sección de Habitaciones Destacadas */}
      <div className="relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-emerald-500" />
            <p className="text-lg font-medium">Buscando las mejores estancias...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center py-20 px-4">
            <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl border border-red-100 shadow-sm max-w-md text-center">
                <p className="font-semibold">¡Ups! Algo salió mal.</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        ) : (
          // Pasamos solo las primeras 3 o 6 para el home, tipo "Destacados"
          <RoomsGrid rooms={rooms.slice(0, 6)} />
        )}
      </div>

      {/* ACÁ IRÍAN FEATURES Y CTA SI LOS QUERÉS MANTENER */}
      {/* <Features /> */}
      {/* <CallToAction /> */}
      
      {/* Chatbot flotante siempre visible en Home */}
      <ChatAssistant />
    </main>
  )
}