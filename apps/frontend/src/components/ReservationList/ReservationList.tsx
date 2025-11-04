import type { Reservation } from "../../types/reservation"

interface ReservationListProps {
  reservations: Reservation[]
  onRemove: (id: string) => void
}

export default function ReservationList({ reservations, onRemove }: ReservationListProps) {
  if (reservations.length === 0) {
    return <p className="text-center text-muted-foreground">No reservations yet.</p>
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
              <p className="font-medium">{r.name}</p>
              <p className="text-sm text-muted-foreground">
                {r.roomType} — {r.checkIn} to {r.checkOut}
              </p>
            </div>
            <button
              onClick={() => onRemove(r.id)}
              className="text-red-500 hover:text-red-700"
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}