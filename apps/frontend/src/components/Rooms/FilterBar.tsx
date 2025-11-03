import { useState } from 'react'

type FilterBarProps = {
  onFilterChange?: (filters: { type: string; price: string }) => void
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState({ type: "", price: ""})

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  return (
    <div className="bg-surface shadow-sm border border-gray-200 rounded-xl mx-auto my-8 p-4 flex flex-wrap justify-center gap-4 max-w-5xl">
      {/* Room Type */}
      <div>
        <label className="text-sm font-medium text-secondary mr-2">Room Type:</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-secondary bg-white focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="">All</option>
          <option value="standard">Standard</option>
          <option value="suite">Suite</option>
          <option value="family">Family</option>
          <option value="deluxe">Deluxe</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="text-sm font-medium text-secondary mr-2">Price:</label>
        <select
          name="price"
          value={filters.price}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-secondary bg-white focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="">All</option>
          <option value="100-150">$100 – $150</option>
          <option value="150-200">$150 – $200</option>
          <option value="200-250">$200 – $250</option>
          <option value="250+">$250+</option>
        </select>
      </div>
    </div>
  )
}