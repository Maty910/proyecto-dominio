import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { ArrowLeft, ShieldCheck, CreditCard } from "lucide-react"
import { MOCK_ROOMS } from "../../../backend/src/data/rooms"
import type { Room } from "../types/types"

export default function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  // 1. RECUPERAMOS LOS DATOS DE LA URL
  const roomId = searchParams.get("roomId")
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const nights = searchParams.get("nights")
  const totalPrice = searchParams.get("price")
  
  const [room, setRoom] = useState<Room | null>(null)

  // 2. BUSCAMOS LA INFO DE LA HABITACIÓN (Solo para mostrar la foto y nombre)
  useEffect(() => {
    const found = MOCK_ROOMS.find(r => r.id === roomId)
    if (found) setRoom(found)
  }, [roomId])

  // Helper de moneda
  const formatMoney = (amount: string | number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(Number(amount))
  }

  // Helper para formatear fechas a DD/MM/YYYY
  const formatDate = (dateString: string | null) => {
    if (!dateString) return ""
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
  }

  const handleConfirm = () => {
    // ACÁ IRÍA LA LÓGICA DE GUARDAR EN BASE DE DATOS
    // Como es un mock, simulamos éxito y vamos a "Mis Reservas"
    alert("¡Reserva confirmada con éxito!")
    navigate('/reservations')
  }

  if (!room || !checkIn || !checkOut) {
    return <div className="text-center py-20">Faltan datos para la reserva.</div>
  }

  return (
    <main className="bg-background min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header simple */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft size={24} className="text-secondary" />
          </button>
          <h1 className="text-3xl font-bold text-secondary">Confirmar y Pagar</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* COLUMNA IZQUIERDA: Formulario / Login simulado */}
          <div className="space-y-8">
            
            {/* Banner de Login (Simulación) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-secondary mb-4">Tu viaje</h2>
              
              <div className="flex justify-between items-start py-4 border-b border-gray-100">
                <div>
                  <p className="font-semibold text-secondary">Fechas</p>
                  <p className="text-secondary/70">{formatDate(checkIn)} al {formatDate(checkOut)}</p>
                </div>
                <button className="text-primary font-semibold underline text-sm">Editar</button>
              </div>

              <div className="flex justify-between items-start py-4">
                <div>
                  <p className="font-semibold text-secondary">Huéspedes</p>
                  <p className="text-secondary/70">2 Huéspedes (Mock)</p>
                </div>
                <button className="text-primary font-semibold underline text-sm">Editar</button>
              </div>
            </div>

            {/* Método de Pago Visual */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <CreditCard size={20} /> Forma de pago
              </h2>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 border border-primary bg-primary/5 rounded-xl cursor-pointer">
                    <span className="font-semibold text-secondary">Tarjeta de Crédito</span>
                    <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary"></div>
                 </div>
                 <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl opacity-60">
                    <span className="font-semibold text-secondary">Transferencia / Efectivo</span>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                 </div>
              </div>
            </div>
            
            <button 
              onClick={handleConfirm}
              className="btn-primary w-full py-4 text-lg shadow-lg hover:scale-[1.02] transition-transform"
            >
              Confirmar Reserva
            </button>

          </div>

          {/* COLUMNA DERECHA: Resumen (Sticky) */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
              
              {/* Card de Habitación Chiquita */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                <img src={room.image} alt={room.title} className="w-24 h-24 object-cover rounded-xl" />
                <div>
                  <p className="text-xs text-secondary/60 uppercase font-bold">{room.type}</p>
                  <h3 className="font-bold text-secondary leading-tight mb-1">{room.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-secondary/70">
                    <ShieldCheck size={14} className="text-primary" />
                    <span>Anfitrión verificado</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-secondary mb-4">Detalle del precio</h3>
              
              <div className="space-y-3 text-secondary/80">
                <div className="flex justify-between">
                  <span>$ {formatMoney(room.price)} x {nights} noches</span>
                  <span>$ {formatMoney(Number(room.price) * Number(nights))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline decoration-dotted">Tasa de servicio</span>
                  <span>$ 15.000</span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-6 pt-6 flex justify-between items-center">
                <span className="font-bold text-lg text-secondary">Total (ARS)</span>
                <span className="font-bold text-2xl text-secondary">{formatMoney(totalPrice || "0")}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}