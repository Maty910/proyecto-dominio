import { useState, type ChangeEvent, type FormEvent } from "react"
import { createReservation } from "../../services/api"
import type { Reservation } from "../../types/reservation"

export default function ReservationForm({ onAdd }: { onAdd: (reservation: Reservation) => void }) {
  const [form, setForm] = useState({
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    status: "confirmed",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
    setSuccess("")
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { roomId, checkInDate, checkOutDate } = form

    if (!roomId || !checkInDate || !checkOutDate) {
      setError("Please fill in all fields.")
      return
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setError("Check-out date must be after check-in date.")
      return
    }

    try {
      setLoading(true)
      
      const reservationId = `rsv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const newReservation = await createReservation({
        id: reservationId,
        roomId,
        checkInDate,
        checkOutDate,
        status: "confirmed",
      } as Reservation)
      
      onAdd(newReservation)
      setSuccess("Reservation created successfully ✅")
      setForm({ roomId: "", checkInDate: "", checkOutDate: "", status: "confirmed" })
    } catch (err: any) {
      console.error('Error creating reservation:', err)
      setError(err.message || "Failed to create reservation")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface p-6 rounded-xl shadow-md border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-4">Make a Reservation</h2>

      <div className="flex flex-col gap-3">
        <select
          name="roomId"
          value={form.roomId}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Select room</option>
          <option value="101">Room 101</option>
          <option value="102">Room 102</option>
          <option value="103">Room 103</option>
        </select>

        <label className="text-sm font-medium text-secondary">Check-in</label>
        <input
          type="date"
          name="checkInDate"
          value={form.checkInDate}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <label className="text-sm font-medium text-secondary">Check-out</label>
        <input
          type="date"
          name="checkOutDate"
          value={form.checkOutDate}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          min={form.checkInDate || ""}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

        <button
          type="submit"
          className="btn-primary mt-3 px-4 py-2 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? "Saving..." : "Reserve Now"}
        </button>
      </div>
    </form>
  )
}