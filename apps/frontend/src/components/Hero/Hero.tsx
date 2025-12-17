import { useState } from "react"
import { useNavigate } from "react-router-dom"
// Cambiamos MapPin por BedDouble para que sea más semántico
import { Search, BedDouble, Calendar, Users } from "lucide-react"

export function Hero() {
  const navigate = useNavigate()

  // Cambiamos el nombre del estado 'destination' a 'searchTerm' para no confundir
  const [searchTerm, setSearchTerm] = useState("")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("2")

  const handleSearch = () => {
    const params = new URLSearchParams()
    // AHORA usamos la clave "search" en lugar de "city"
    if (searchTerm) params.append("search", searchTerm)
    if (guests) params.append("guests", guests)
    
    navigate(`/rooms?${params.toString()}`)
  }

  return (
    <div className="relative h-[600px] w-full flex items-center justify-center">
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 ">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          alt="Hotel Hero"
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
        
        {/* Títulos... (Igual que antes) */}
        <div className="space-y-4">
          <span className="inline-block py-1 px-3 mt-15 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-semibold tracking-wider border border-white/10">
            EXPERIENCIA DE LUJO
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Descubrí tu próximo <br />
            <span className="text-primary">descanso soñado</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-light">
            Reservá habitaciones exclusivas y viví una experiencia inolvidable.
          </p>
        </div>

        {/* Botones... (Igual que antes) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={() => navigate('/rooms')} className="btn-primary rounded-full px-8 py-3 font-semibold">
            Ver Habitaciones
          </button>
          <button onClick={() => navigate('/login')} className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition backdrop-blur-sm font-semibold cursor-pointer">
            Iniciar Sesión
          </button>
        </div>

        {/* --- BARRA DE BÚSQUEDA CORREGIDA --- */}
        <div className="bg-white rounded-full p-2 max-w-4xl mx-auto shadow-2xl flex flex-col md:flex-row items-center gap-2 mt-8">
          
          {/* CAMBIO ACÁ: Input de Tipo de Habitación */}
          <div className="flex-1 w-full px-6 py-2 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-start">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <BedDouble size={14} /> ¿Qué buscás?
            </label>
            <input 
              type="text" 
              placeholder="Ej: Suite, Deluxe..." 
              className="w-full text-secondary font-medium placeholder:text-gray-300 focus:outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Input: Fecha */}
          <div className="flex-1 w-full px-6 py-2 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-start">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Calendar size={14} /> Entrada
            </label>
            <input 
              type="date" 
              className="w-full text-secondary font-medium focus:outline-none bg-transparent text-sm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Input: Huéspedes */}
          <div className="flex-1 w-full px-6 py-2 flex flex-col items-start">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Users size={14} /> Huéspedes
            </label>
            <select 
              className="w-full text-secondary font-medium focus:outline-none bg-transparent cursor-pointer"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="1">1 Persona</option>
              <option value="2">2 Personas</option>
              <option value="3">3 Personas</option>
              <option value="4">4+ Personas</option>
            </select>
          </div>

          {/* Botón Buscar */}
          <button 
            onClick={handleSearch}
            className="bg-secondary hover:bg-primary text-white p-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer flex items-center justify-center shrink-0 w-full md:w-auto"
          >
            <Search size={24} />
          </button>

        </div>

      </div>
    </div>
  )
}