import { useEffect, useState, useMemo } from "react"
import FilterBar from "../components/Rooms/FilterBar"
import RoomsGrid from "../components/Rooms/RoomsGrid"
// import { fetchRooms } from "../services/api" // <--- Comentamos esto por ahora
import { MOCK_ROOMS } from '../../../backend/src/data/rooms' // <--- 1. Importamos los datos falsos
import type { Room } from "../types/types"

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estado de los filtros
  const [filters, setFilters] = useState<{ type?: string; minPrice?: number; maxPrice?: number }>({})

  useEffect(() => {
    // 2. SIMULAMOS LA CARGA DE DATOS
    // En lugar de llamar a fetchRooms(), usamos un setTimeout para simular
    // que la red tarda un poquito (800ms) y luego seteamos los datos fijos.
    
    const loadData = () => {
      try {
        setTimeout(() => {
          setRooms(MOCK_ROOMS) // <--- Acá enchufamos los datos del mock
          setLoading(false)
        }, 800)
      } catch (err) {
        setError("Error al cargar los datos de prueba")
        setLoading(false)
      }
    }

    loadData()

    /* CUANDO ARREGLES EL BACKEND, DESCOMENTÁ ESTO Y BORRÁ LO DE ARRIBA:
    fetchRooms()
      .then(data => setRooms(data))
      .catch(err => setError(err.message || "No se pudieron cargar las habitaciones."))
      .finally(() => setLoading(false))
    */
  }, [])

  // Lógica de filtrado optimizada con useMemo
  const filteredRooms = useMemo(() => {
    return rooms.filter(r => {
      // 1. Filtro por Tipo
      if (filters.type && !r.type?.toLowerCase().includes(filters.type.toLowerCase())) {
        return false
      }

      // Preparamos el precio (limpieza robusta)
      const price = typeof r.price === 'string' 
        ? parseFloat((r.price as string).replace(/[^0-9.]/g, "")) 
        : Number(r.price)

      // 2. Filtro por Precio Mínimo
      if (filters.minPrice !== undefined && price < filters.minPrice) {
        return false
      }

      // 3. Filtro por Precio Máximo
      if (filters.maxPrice !== undefined && price > filters.maxPrice) {
        return false
      }

      return true
    })
  }, [rooms, filters])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-center">
        <div className="text-danger bg-red-50 px-6 py-4 rounded-lg border border-red-100">
          <p className="font-semibold">Ocurrió un error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-background min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-2 pt-6 px-4 text-center bg-linear-to-b from-primary to-[#248f82] text-white shadow-md">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Nuestras Habitaciones
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
            Encontrá el espacio perfecto para tu descanso, diseñado pensando en tu comodidad.
          </p>
        </div>
        
        <div className="mt-0 max-w-6xl mx-auto p-1">
          <FilterBar onFilterChange={setFilters} />
        </div>
      </section>

      {/* Grid de habitaciones */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 py-1">
        {filteredRooms.length > 0 ? (
          <RoomsGrid rooms={filteredRooms} />
        ) : (
          <div className="text-center py-20 opacity-70">
            <p className="text-xl font-medium">No encontramos habitaciones con esos filtros.</p>
            <p className="text-sm mt-2">Probá ajustando los parámetros de búsqueda.</p>
          </div>
        )}
      </section>
    </main>
  )
}