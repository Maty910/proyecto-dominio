import { useEffect, useState } from "react"
import FilterBar from "../components/Rooms/FilterBar"
import RoomsGrid from "../components/Rooms/RoomsGrid"
import { fetchRooms } from "../services/api"
import type { Room } from "../types"

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [filtered, setFiltered] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<{ type?: string; minPrice?: number; maxPrice?: number }>({})

  useEffect(() => {
    fetchRooms()
      .then(data => { setRooms(data); setFiltered(data) })
      .catch(err => setError(err.message || "Failed to load rooms"))
      .finally(()=> setLoading(false))
  }, [])

  useEffect(() => {
    let res = [...rooms]
    if (filters.type) {
      res = res.filter(r => (r.type ?? "").toLowerCase().includes(filters.type?.toLowerCase() ?? ""))
    }
    if (filters.minPrice !== undefined) {
      res = res.filter(r => {
        const value = parseFloat(String(r.price).replace(/[^0-9.]/g,"")) || 0
        return value >= filters.minPrice!
      })
    }
    if (filters.maxPrice !== undefined) {
      res = res.filter(r => {
        const value = parseFloat(String(r.price).replace(/[^0-9.]/g,"")) || 0
        return value <= filters.maxPrice!
      })
    }
    setFiltered(res)
  }, [filters, rooms])

  if (loading) return <p className="text-center py-10">Loading rooms...</p>
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>

  return (
    <main className="bg-background text-secondary min-h-screen">
      <section className="py-16 text-center bg-primary text-white">
        <h1 className="text-4xl font-bold mb-2">Our Rooms</h1>
        <p className="text-lg text-white/90">Choose the perfect space for your stay.</p>
      </section>

      <FilterBar onFilterChange={(f) => setFilters(f)} />
      <RoomsGrid rooms={filtered} />
    </main>
  )
}
