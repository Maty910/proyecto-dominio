import FilterBar from "../components/Rooms/FilterBar";
import RoomsGrid from "../components/Rooms/RoomsGrid";
import { useState } from "react";

export default function RoomsPage() {
  const rooms = [
    {
      id: 1,
      title: "Deluxe Suite",
      price: "$180",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      description: "Spacious suite with modern decor and balcony view.",
    },
    {
      id: 2,
      title: "Standard Room",
      price: "$120",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      description: "Cozy room perfect for couples or solo travelers.",
    },
    {
      id: 3,
      title: "Family Room",
      price: "$210",
      image: "https://images.unsplash.com/photo-1560448205-17d3a46c84de?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      description: "Ideal for families, with extra beds and space.",
    },
    {
      id: 4,
      title: "Ocean View",
      price: "$250",
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2105f",
      description: "Enjoy breathtaking sea views from your private balcony.",
    },
    {
      id: 5,
      title: "Business Suite",
      price: "$190",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      description: "Perfect for business travelers, with workspace and Wi-Fi.",
    }
  ]

  const [filters, setFilters] = useState({ type: "", price: ""})

  const storedFilters = localStorage.getItem("storybook-filters")
  if (storedFilters) {
    try {
      setFilters(JSON.parse(storedFilters))
      localStorage.removeItem("storybook-filters")
    } catch (e) {
      console.error("Invalid filters in Storybook")
    }
  }
  
  const handleFilterChange = (newFilters: { type: string; price: string }) => {
    setFilters(newFilters)
  }

  const filteredRooms = rooms.filter(room => {
    const matchType = filters.type ? room.title.toLowerCase().includes(filters.type) : true

    const roomPrice = Number(room.price.replace('$', ''))

    const matchPrice = (() => {
      if (!filters.price) return true
      if (filters.price === "250+") return roomPrice >= 250
      const [min, max] = filters.price.split('-').map(Number)
      return roomPrice >= min && roomPrice <= max
    })()

    return matchType && matchPrice
  })

  return (
    <main className="bg-background text-secondary min-h-screen">
      <section className="py-16 text-center bg-primary text-white">
        <h1 className="text-4xl font-bold mb-2">Our Rooms</h1>
        <p className="text-lg text-white/90">
        Choose the perfect space for your stay.
        </p>
      </section>

      <FilterBar onFilterChange={handleFilterChange} />
      <RoomsGrid rooms={filteredRooms} />
    </main>
  )
}