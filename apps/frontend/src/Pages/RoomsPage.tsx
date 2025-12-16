import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import FilterBar from "../components/Rooms/FilterBar"
import RoomsGrid from "../components/Rooms/RoomsGrid"
// Asegurate que la ruta al mock sea la correcta según tu estructura de carpetas
import { MOCK_ROOMS } from "../../../backend/src/data/rooms" 
import type { Room } from "../types/types"

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // 1. LEER PARÁMETROS DE LA URL
  const [searchParams] = useSearchParams()

  // 2. INICIALIZAR FILTROS CON LOS DATOS DE LA URL
  const [filters, setFilters] = useState<{ 
    type?: string; 
    minPrice?: number; 
    maxPrice?: number; 
    capacity?: number; 
    search?: string;   
  }>(() => {
    // Esto se ejecuta una sola vez al montar el componente
    const guests = searchParams.get("guests")
    const search = searchParams.get("search") // Leemos el término de búsqueda (ej: "Suite")

    return {
      capacity: guests ? parseInt(guests) : undefined,
      search: search || undefined,
      // Los filtros de la FilterBar arrancan vacíos
      type: undefined,
      minPrice: undefined,
      maxPrice: undefined
    }
  })

  useEffect(() => {
    const loadData = () => {
      try {
        // Simulamos delay de red
        setTimeout(() => {
          setRooms(MOCK_ROOMS)
          setLoading(false)
        }, 800)
      } catch (err) {
        setError("Error al cargar los datos.")
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Lógica de filtrado optimizada con useMemo
  const filteredRooms = useMemo(() => {
    return rooms.filter(r => {
      
      // --- 1. Filtro por TIPO (FilterBar) ---
      if (filters.type && !r.type?.toLowerCase().includes(filters.type.toLowerCase())) {
        return false
      }

      // --- 2. Filtro por PRECIO (FilterBar) ---
      // Limpiamos el precio si viene como string sucio
      const price = typeof r.price === 'string' 
        ? parseFloat((r.price as string).replace(/[^0-9.]/g, "")) 
        : Number(r.price)

      if (filters.minPrice !== undefined && price < filters.minPrice) return false
      if (filters.maxPrice !== undefined && price > filters.maxPrice) return false

      // --- 3. Filtro por CAPACIDAD (Viene del Hero - Guests) ---
      // Si busco para 2 personas, muestro habitaciones con capacidad 2 o más
      if (filters.capacity !== undefined && (r.capacity || 0) < filters.capacity) {
        return false
      }

      // --- 4. Filtro por BÚSQUEDA / TEXTO (Viene del Hero - Search) ---
      if (filters.search) {
        const term = filters.search.toLowerCase()
        // Buscamos en el nombre, descripción o tipo
        const matchesName = r.title.toLowerCase().includes(term)
        const matchesDesc = r.description?.toLowerCase().includes(term)
        const matchesType = r.type?.toLowerCase().includes(term)
        
        if (!matchesName && !matchesDesc && !matchesType) {
          return false
        }
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
      {/* Header de la sección */}
      <section className="relative py-2 pt-6 px-4 text-center bg-gradient-to-b from-primary to-[#248f82] text-white shadow-md">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Nuestras Habitaciones
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
            Encontrá el espacio perfecto para tu descanso.
          </p>
        </div>
        
        <div className="mt-0 max-w-6xl mx-auto p-1">
          {/* FilterBar: Le pasamos la función para actualizar filtros */}
          <FilterBar onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))} />
        </div>
      </section>

      {/* Grid de Resultados */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        
        {/* Badges de filtros activos (Search o Capacity) */}
        {(filters.search || filters.capacity) && (
          <div className="mb-6 flex gap-2 flex-wrap items-center animate-fade-in">
            {filters.search && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                Buscando: <strong>"{filters.search}"</strong>
              </span>
            )}
            {filters.capacity && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                Huéspedes: <strong>{filters.capacity}+</strong>
              </span>
            )}
            
            <button 
                onClick={() => setFilters({})} 
                className="text-sm text-gray-500 hover:text-danger hover:underline ml-2 transition-colors"
            >
                Limpiar todo
            </button>
          </div>
        )}

        {/* Renderizado Condicional: Grid o Empty State */}
        {filteredRooms.length > 0 ? (
          <RoomsGrid rooms={filteredRooms} />
        ) : (
          <div className="text-center py-20 opacity-70">
            <p className="text-xl font-medium text-secondary">No encontramos habitaciones con esos criterios.</p>
            <p className="text-sm mt-2 text-secondary/60">Probá usando palabras más generales (ej: "Suite", "Doble") o bajando la cantidad de huéspedes.</p>
            <button 
                onClick={() => setFilters({})} 
                className="mt-6 text-primary font-semibold hover:underline border border-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition-all"
            >
                Ver todas las habitaciones
            </button>
          </div>
        )}
      </section>
    </main>
  )
}