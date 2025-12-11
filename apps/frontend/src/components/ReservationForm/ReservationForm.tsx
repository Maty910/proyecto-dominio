import { useState, type ChangeEvent, type FormEvent } from "react"
import { createReservation } from "../../services/api"
import type { Reservation } from "../../types/reservation"
import { PlusCircle, DoorOpen, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function ReservationForm({ onAdd }: { onAdd: (reservation: Reservation) => void }) {
  const [form, setForm] = useState({
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    status: "confirmed",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { roomId, checkInDate, checkOutDate } = form

    // Validaciones básicas
    if (!roomId || !checkInDate || !checkOutDate) {
      setError("Por favor completá todos los campos.")
      return
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setError("La fecha de salida tiene que ser posterior a la de entrada.")
      return
    }

    try {
      setLoading(true)
      
      // Creamos la reserva. Asumimos que la API genera el ID.
      // Si tu API necesita que le pases el ID desde el front, agregalo acá.
      const newReservation = await createReservation({
        ...form,
        id: "", // O generalo acá si es necesario: crypto.randomUUID()
      } as Reservation)
      
      onAdd(newReservation)
      // Reseteamos el form
      setForm({ roomId: "", checkInDate: "", checkOutDate: "", status: "confirmed" })
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Hubo un error al crear la reserva.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit sticky top-6">
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-blue-500 p-2 rounded-lg">
          <PlusCircle className="text-white h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-white">Nueva Reserva</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Habitación
          </label>
          <div className="relative">
            <DoorOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <select
              name="roomId"
              value={form.roomId}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 appearance-none"
            >
              <option value="">Seleccioná una habitación</option>
              <option value="101">101 - Suite Vista Mar</option>
              <option value="102">102 - Suite Ejecutiva</option>
              <option value="205">205 - Doble Standard</option>
              <option value="304">304 - Single Deluxe</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Check-in</label>
            <input
              type="date"
              name="checkInDate"
              value={form.checkInDate}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-700 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Check-out</label>
            <input
              type="date"
              name="checkOutDate"
              value={form.checkOutDate}
              min={form.checkInDate}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-700 text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <span>Confirmar Reserva</span>
              <CheckCircle2 className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}