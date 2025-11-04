import { useState } from "react"

type Filters = { type?: string; minPrice?: number; maxPrice?: number }
type FilterBarProps = {
  onFilterChange?: (filters: Filters) => void
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [type, setType] = useState("")
  const [minPrice, setMinPrice] = useState<number | "">("")
  const [maxPrice, setMaxPrice] = useState<number | "">("")

  const emit = (newFilters: Filters) => onFilterChange?.(newFilters)

  const handleType = (v: string) => {
    setType(v)
    emit({ type: v, minPrice: minPrice === "" ? undefined : Number(minPrice), maxPrice: maxPrice === "" ? undefined : Number(maxPrice) })
  }

  const handleMin = (v: string) => {
    const num = v === "" ? "" : Math.max(0, Number(v))
    setMinPrice(num)
    emit({ type, minPrice: num === "" ? undefined : Number(num), maxPrice: maxPrice === "" ? undefined : Number(maxPrice) })
  }

  const handleMax = (v: string) => {
    const num = v === "" ? "" : Math.max(0, Number(v))
    setMaxPrice(num)
    emit({ type, minPrice: minPrice === "" ? undefined : Number(minPrice), maxPrice: num === "" ? undefined : Number(num) })
  }

  return (
    <div className="bg-surface shadow-sm border border-gray-200 rounded-xl mx-auto my-8 p-4 flex flex-wrap justify-center gap-4 max-w-5xl">
      <div>
        <label className="text-sm font-medium text-secondary mr-2">Room Type</label>
        <select name="type" value={type} onChange={(e)=> handleType(e.target.value)}
          className="border rounded-lg px-3 py-2">
          <option value="">All</option>
          <option value="standard">Standard</option>
          <option value="suite">Suite</option>
          <option value="family">Family</option>
          <option value="deluxe">Deluxe</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-secondary mr-2">Min Price</label>
        <input type="number" min={0} value={minPrice === "" ? "" : minPrice} onChange={(e)=> handleMin(e.target.value)}
          className="border rounded-lg px-3 py-2 w-32" />
      </div>

      <div>
        <label className="text-sm font-medium text-secondary mr-2">Max Price</label>
        <input type="number" min={0} value={maxPrice === "" ? "" : maxPrice} onChange={(e)=> handleMax(e.target.value)}
          className="border rounded-lg px-3 py-2 w-32" />
      </div>
    </div>
  )
}
