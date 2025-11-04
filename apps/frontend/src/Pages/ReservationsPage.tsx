import { useState, useEffect } from "react"
import ReservationForm from "../components/ReservationForm/ReservationForm"
import ReservationList from "../components/ReservationList/ReservationList"

export interface Reservation {
  id: string
  name: string
  roomType: string
  checkIn: string
  checkOut: string
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("reservations")
    if (saved) setReservations(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations))
  }, [reservations])

  const addReservation = (reservation: Reservation) => {
    setReservations([...reservations, reservation])
  }

  const removeReservation = (id: string) => {
    setReservations(reservations.filter((r) => r.id !== id))
  }

  return (
    <main className="bg-background text-secondary min-h-screen py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Reservations</h1>

      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <ReservationForm onAdd={addReservation} />
        <ReservationList reservations={reservations} onRemove={removeReservation} />
      </div>
    </main>
  )
}
