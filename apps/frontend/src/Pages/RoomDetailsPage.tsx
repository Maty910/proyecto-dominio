import { useEffect, useState, useMemo } from "react"
import { useParams, useNavigate, createSearchParams } from "react-router-dom"
import { ArrowLeft, Users, Maximize, Check, Star, MapPin } from "lucide-react"
import { MOCK_ROOMS } from "../../../backend/src/data/rooms"
import type { Room } from "../types/types"

export default function RoomDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)

  // 1. ESTADOS PARA LAS FECHAS
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  
  // Costo fijo de servicio (limpieza, gestión, etc.)
  const SERVICE_FEE = 15000 

  useEffect(() => {
    // Buscamos la habitación en el Mock
    const foundRoom = MOCK_ROOMS.find((r: { id: string | undefined }) => r.id === id)
    
    setTimeout(() => {
      setRoom(foundRoom || null)
      setLoading(false)
    }, 600)
  }, [id])

  // 2. LÓGICA DE CÁLCULO DE DÍAS Y PRECIO
  const { totalNights, totalPrice, rawPrice } = useMemo(() => {
    if (!checkIn || !checkOut || !room) {
      return { totalNights: 0, totalPrice: 0, rawPrice: 0 }
    }

    const start = new Date(checkIn)
    const end = new Date(checkOut)
    
    // Calculamos la diferencia en milisegundos y lo pasamos a días
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) 

    // Validamos que la fecha de salida sea después de la entrada
    if (end <= start) return { totalNights: 0, totalPrice: 0, rawPrice: 0 }

    const raw = diffDays * Number(room.price) // Precio solo de hospedaje
    const total = raw + SERVICE_FEE // Precio final con impuestos/servicios

    return { totalNights: diffDays, totalPrice: total, rawPrice: raw }
  }, [checkIn, checkOut, room])

  // 3. MANEJO DEL CLICK EN RESERVAR (NUEVO)
  const handleReserveClick = () => {
    if (!room) return

    // Preparamos los datos para mandarlos a la página de Checkout
    const params = {
        roomId: room.id,
        checkIn,
        checkOut,
        guests: "2", // Podrías agregar un estado para esto si querés
        nights: totalNights.toString(),
        price: totalPrice.toString()
    }

    // Navegamos al checkout con los datos en la URL
    navigate({
        pathname: "/checkout",
        search: `?${createSearchParams(params)}`
    })
  }

  // Formateador de moneda (Helper)
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(amount)
  }

  if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>
  if (!room) return <div className="text-center py-20">Habitación no encontrada</div>

  return (
    <main className="bg-background min-h-screen pb-20">
      
      {/* HERO SECTION */}
      <div className="relative h-[50vh] w-full bg-gray-200">
        <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
        <div className="absolute top-6 left-6 z-10">
          <button onClick={() => navigate(-1)} className="bg-white/90 hover:bg-white text-secondary p-3 rounded-full shadow-lg transition-all backdrop-blur-sm group cursor-pointer">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
          <div className="container mx-auto">
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">{room.type}</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{room.title}</h1>
            <div className="flex items-center gap-2 text-white/90"><MapPin size={18}/> <span>Buenos Aires, Argentina</span></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* COLUMNA IZQUIERDA (Info) */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Sobre este alojamiento</h2>
              <p className="text-lg text-secondary/80 leading-relaxed">{room.description || "Descripción detallada..."}</p>
            </div>

             {/* Características Rápidas (Hardcodeadas por ahora visualmente) */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100">
              <div className="flex items-center gap-3 text-secondary/80">
                <Users className="text-primary" size={20} />
                <span>{room.capacity} Huéspedes</span>
              </div>
              <div className="flex items-center gap-3 text-secondary/80">
                <Maximize className="text-primary" size={20} />
                <span>45 m²</span>
              </div>
              <div className="flex items-center gap-3 text-secondary/80">
                <Star className="text-primary" size={20} />
                <span>4.9 (120)</span>
              </div>
              <div className="flex items-center gap-3 text-secondary/80">
                <Check className="text-primary" size={20} />
                <span>Limpieza diaria</span>
              </div>
            </div>
            
            {/* Amenities Grid */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-6">Lo que ofrece este lugar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Mapeamos los amenities si existen, sino mostramos genéricos */}
                 {room.amenities && room.amenities.length > 0 ? (
                    room.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-secondary/80 capitalize">
                            <div className="p-2 bg-primary/5 rounded-lg text-primary"><Check size={18}/></div> 
                            <span>{amenity}</span>
                        </div>
                    ))
                 ) : (
                    <>
                        <div className="flex items-center gap-3 text-secondary/80"><div className="p-2 bg-primary/5 rounded-lg text-primary"><Check size={18}/></div> <span>Wi-Fi de alta velocidad</span></div>
                        <div className="flex items-center gap-3 text-secondary/80"><div className="p-2 bg-primary/5 rounded-lg text-primary"><Check size={18}/></div> <span>Aire Acondicionado</span></div>
                        <div className="flex items-center gap-3 text-secondary/80"><div className="p-2 bg-primary/5 rounded-lg text-primary"><Check size={18}/></div> <span>Desayuno incluido</span></div>
                        <div className="flex items-center gap-3 text-secondary/80"><div className="p-2 bg-primary/5 rounded-lg text-primary"><Check size={18}/></div> <span>Smart TV</span></div>
                    </>
                 )}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: TARJETA DE RESERVA DINÁMICA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              
              {/* Header Precio */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-sm text-secondary/60 line-through">{formatMoney(Number(room.price) * 1.2)}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-secondary">{formatMoney(Number(room.price))}</span>
                    <span className="text-secondary/60 text-sm">/ noche</span>
                  </div>
                </div>
              </div>

              {/* Inputs de Fecha */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                    <div className="border border-gray-300 rounded-lg p-3 hover:border-primary transition-colors focus-within:ring-1 focus-within:ring-primary bg-white">
                        <label className="text-xs text-gray-500 uppercase font-bold block mb-1">Llegada</label>
                        <input 
                          type="date" 
                          className="w-full text-sm outline-none text-secondary bg-transparent" 
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className="border border-gray-300 rounded-lg p-3 hover:border-primary transition-colors focus-within:ring-1 focus-within:ring-primary bg-white">
                        <label className="text-xs text-gray-500 uppercase font-bold block mb-1">Salida</label>
                        <input 
                          type="date" 
                          className="w-full text-sm outline-none text-secondary bg-transparent" 
                          min={checkIn} // Evita seleccionar salida antes de entrada
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>
              </div>

              <button 
                onClick={handleReserveClick} 
                // Deshabilitamos el botón si no hay fechas válidas
                disabled={totalNights === 0}
                className={`w-full py-3 text-lg font-bold rounded-lg transition-all shadow-lg cursor-pointer
                  ${totalNights > 0 
                    ? 'bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5 shadow-primary/30' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}
                `}
              >
                {totalNights > 0 ? 'Reservar Ahora' : 'Seleccioná fechas'}
              </button>

              {/* Desglose de Precios (Solo aparece si hay fechas seleccionadas) */}
              {totalNights > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3 text-sm text-secondary/80 animate-slide-in">
                  <div className="flex justify-between">
                      <span className="underline decoration-dotted cursor-help" title="Precio base x noches">
                        {formatMoney(Number(room.price))} x {totalNights} noches
                      </span>
                      <span>{formatMoney(rawPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                      <span className="underline decoration-dotted cursor-help" title="Tarifa fija de limpieza y gestión">
                        Tasa de servicio
                      </span>
                      <span>{formatMoney(SERVICE_FEE)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-100 mt-2 text-secondary">
                      <span>Total</span>
                      <span>{formatMoney(totalPrice)}</span>
                  </div>
                </div>
              )}
              
              {totalNights === 0 && (
                <p className="text-center text-xs text-secondary/50 mt-4">
                  No se te cobrará nada todavía.
                </p>
              )}

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}