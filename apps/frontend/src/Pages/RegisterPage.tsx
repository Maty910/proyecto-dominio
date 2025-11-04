import { useEffect, useState } from "react"
import ReservationForm from "../components/ReservationForm/ReservationForm"
import ReservationList from "../components/ReservationList/ReservationList"
import { getReservations } from "../services/api"
import type { Reservation } from "../types/reservation"

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function loadReservations() {
    try {
      setLoading(true)
      const data = await getReservations()
      setReservations(data)
    } catch (err: any) {
      setError(err.message || "Failed to load reservations")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReservations()
  }, [])

  const handleAdd = (newReservation: Reservation) => {
    setReservations((prev) => [...prev, newReservation])
  }

  const handleRemove = (id: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <main className="bg-background text-secondary min-h-screen py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Reservations</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
          <ReservationForm onAdd={handleAdd} />
          <ReservationList reservations={reservations} onRemove={handleRemove} />
        </div>
      )}
    </main>
  )
}