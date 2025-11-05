import { useState } from "react"
import { deleteReservation } from "../../services/api"
import type { Reservation } from "../../types/reservation"

interface ReservationListProps {
  reservations: Reservation[]
  onRemove: (id: string) => void
}

export default function ReservationList({ reservations, onRemove }: ReservationListProps) {
  const [deleting, setDeleting] = useState("")

  async function handleDelete(id: string) {
    try {
      setDeleting(id)
      await deleteReservation(id)
      onRemove(id)
    } catch (err) {
      console.error(err)
      alert('Error deleting reservation')
    } finally {
      setDeleting("")
    }
  }

  if (reservations.length === 0) {
    return <p className="text-center text-muted-foreground">You have no reservations yet.</p>
  }

  return (
    <div className="bg-surface p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Your Reservations</h2>
      <ul className="space-y-4">
        {reservations.map((r) => (
          <li
            key={r.id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-medium">Room ID: {r.roomId}</p>
              <p className="text-sm text-muted-foreground">
                {r.checkInDate} → {r.checkOutDate} ({r.status})
              </p>
            </div>
            <button
              onClick={() => handleDelete(r.id)}
              className="text-red-500 hover:text-red-700"
              disabled={deleting === r.id}
            >
              {deleting === r.id ? "Deleting..." : "Cancel"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}