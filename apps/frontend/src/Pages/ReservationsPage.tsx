import { useState, useEffect } from 'react'
import { fetchReservations, createReservation, deleteReservation } from '../services/api'

interface Reservation {
  id: string
  roomId: string
  checkInDate: string
  checkOutDate: string
  status: string
}

export const ReservationsPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [roomId, setRoomId] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')

  useEffect(() => {
    loadReservations()
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true)
      const data = await fetchReservations()
      setReservations(data)
    } catch (err) {
      setError('Error loading reservations')
    } finally {
      setLoading(false)
    }
  };

  const handleCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createReservation({
        id: '',
        roomId,
        checkInDate,
        checkOutDate,
        status: 'confirmed'
      })
      await loadReservations()
      setRoomId('')
      setCheckInDate('')
      setCheckOutDate('')
    } catch (err) {
      setError('Error al crear reserva')
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReservation(id)
      await loadReservations()
    } catch (err) {
      setError('Error deleting reservation')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My reservations</h1>

      {error && <div className="bg-red-100 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleCreateReservation} className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">New reservation</h2>
        
        <div className="mb-4">
          <label className="block mb-2">Room</label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Check-in</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Check-out</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Crear Reserva
        </button>
      </form>

      <div className="grid gap-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white p-4 rounded shadow">
            <p><strong>Habitación:</strong> {reservation.roomId}</p>
            <p><strong>Check-in:</strong> {reservation.checkInDate}</p>
            <p><strong>Check-out:</strong> {reservation.checkOutDate}</p>
            <p><strong>Estado:</strong> {reservation.status}</p>
            <button
              onClick={() => handleDelete(reservation.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}