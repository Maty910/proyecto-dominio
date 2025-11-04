import type { ChangeEvent, FormEvent } from "react"
import { useState } from "react"

export default function ReservationForm({ onAdd }: { onAdd: (reservation: any) => void }) {
  const [form, setForm] = useState({
    name: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.name || !form.roomType || !form.checkIn || !form.checkOut) return

    const newReservation = { ...form, id: Date.now() }
    onAdd(newReservation)
    setForm({ name: "", roomType: "", checkIn: "", checkOut: "" })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface p-6 rounded-xl shadow-md border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-4">Make a Reservation</h2>

      <div className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <select
          name="roomType"
          value={form.roomType}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Select room type</option>
          <option value="Standard">Standard</option>
          <option value="Suite">Suite</option>
          <option value="Family">Family</option>
          <option value="Deluxe">Deluxe</option>
        </select>

        <label className="text-sm font-medium text-secondary">Check-in</label>
        <input
          type="date"
          name="checkIn"
          value={form.checkIn}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <label className="text-sm font-medium text-secondary">Check-out</label>
        <input
          type="date"
          name="checkOut"
          value={form.checkOut}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          className="btn-primary mt-3 px-4 py-2 text-white rounded-lg"
        >
          Reserve Now
        </button>
      </div>
    </form>
  )
}
