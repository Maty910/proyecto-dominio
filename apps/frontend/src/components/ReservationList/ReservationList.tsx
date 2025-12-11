import { useState } from "react"
import { deleteReservation } from "../../services/api"
import type { Reservation } from "../../types/reservation"
import { CalendarDays, Clock, DoorOpen, Trash2, Calendar } from 'lucide-react'

interface ReservationListProps {
  reservations: Reservation[]
  onRemove: (id: string) => void
}

export default function ReservationList({ reservations, onRemove }: ReservationListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    // Confirmación simple antes de borrar
    if (!window.confirm("¿Estás seguro que querés cancelar esta reserva?")) return

    try {
      setDeletingId(id)
      await deleteReservation(id)
      onRemove(id)
    } catch (err) {
      console.error(err)
      alert('Error al borrar la reserva')
    } finally {
      setDeletingId(null)
    }
  }

  const statusStyles: Record<string, string> = {
    confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
    default: "bg-slate-100 text-slate-700 border-slate-200"
  };

  if (reservations.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-200">
        <div className="bg-slate-50 p-4 rounded-full inline-block mb-4">
          <Calendar className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900">No hay reservas activas</h3>
        <p className="mt-1 text-slate-500 max-w-sm mx-auto">
          Parece que está todo tranquilo por ahora. ¡Creá una nueva reserva para empezar!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {reservations.map((r) => (
        <div 
          key={r.id} 
          className="group bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
        >
          {/* Barrita decorativa al hover */}
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-1 rounded-full border uppercase tracking-wider ${statusStyles[r.status] || statusStyles.default}`}>
                  {r.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <DoorOpen className="h-5 w-5 text-slate-400" />
                Habitación {r.roomId}
              </h3>
            </div>
            
            <button 
              onClick={() => handleDelete(r.id)}
              disabled={deletingId === r.id}
              className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
              title="Cancelar reserva"
            >
              {deletingId === r.id ? (
                <div className="animate-spin h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full"></div>
              ) : (
                <Trash2 className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="flex-1">
              <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Entrada</div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CalendarDays className="h-4 w-4 text-blue-500" />
                {r.checkInDate}
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex-1">
              <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Salida</div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Clock className="h-4 w-4 text-blue-500" />
                {r.checkOutDate}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}