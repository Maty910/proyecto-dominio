import { useState, useEffect } from 'react'
import { fetchReservations } from '../services/api'
import type { Reservation } from '../types/reservation'
import ReservationForm from '../components/ReservationForm/ReservationForm'
import ReservationList from '../components/ReservationList/ReservationList'
import { Hotel, AlertCircle, X } from 'lucide-react'

export const ReservationsPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadReservations()
  }, [])

  const loadReservations = async () => {
    try {
      setLoading(true)
      const data = await fetchReservations()
      setReservations(data)
    } catch (err) {
      setError('No pudimos cargar las reservas, intentalo de nuevo más tarde.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddReservation = (newReservation: Reservation) => {
    // Agregamos la nueva reserva al principio de la lista
    setReservations((prev) => [newReservation, ...prev])
  }

  const handleRemoveReservation = (id: string) => {
    // Filtramos la reserva eliminada
    setReservations((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600">
            <Hotel className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight text-slate-900">HotelAdmin</span>
          </div>
          {/* Acá podrías poner el avatar del usuario logueado */}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Columna Izquierda: Formulario */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <ReservationForm onAdd={handleAddReservation} />
          </div>

          {/* Columna Derecha: Listado */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Mis Reservas</h1>
                <p className="text-slate-500">Gestioná la ocupación de las habitaciones desde acá.</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
                Total: <span className="text-slate-900 font-bold ml-1">{reservations.length}</span>
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                </div>
                <button onClick={() => setError("")} className="hover:bg-red-100 p-1 rounded">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {loading ? (
              <div className="grid gap-4">
                 {/* Skeletors de carga */}
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm animate-pulse h-32"></div>
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm animate-pulse h-32"></div>
              </div>
            ) : (
              <ReservationList 
                reservations={reservations} 
                onRemove={handleRemoveReservation} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}