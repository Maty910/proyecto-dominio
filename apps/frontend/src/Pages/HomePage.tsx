import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar/Navbar"
import { Hero } from "../components/Hero/Hero"
import RoomsGrid from "../components/Rooms/RoomsGrid"
import { Features } from "../components/Features/Features"
import { CallToAction } from "../components/CTA/CallToAction"
import { fetchRooms } from "../services/api"
import type { Room } from "../types"

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadRooms() {
      try {
        const data = await fetchRooms()
        setRooms(data)
      } catch (err: any) {
        console.error(err)
        setError("Failed to load rooms")
      } finally {
        setLoading(false)
      }
    }

    loadRooms()
  }, [])

  return (
    <main className="bg-background text-secondary">
      <Navbar />
      <Hero />

      {loading ? (
        <p className="text-center py-16 text-muted-foreground">Loading rooms...</p>
      ) : error ? (
        <p className="text-center py-16 text-red-600">{error}</p>
      ) : (
        <RoomsGrid rooms={rooms.slice(0, 3)} />
      )}

      <Features />
      <CallToAction />
    </main>
  )
}
