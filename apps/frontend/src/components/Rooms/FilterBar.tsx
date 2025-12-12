import { useState } from "react"
import { SlidersHorizontal, ChevronDown } from "lucide-react"

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
    <div className="sticky top-24 z-30 mx-auto max-w-4xl px-4 mb-8">
      <div className="bg-white/90 backdrop-blur-xl shadow-lg border border-slate-200/60 rounded-full py-3 px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 transition-all hover:shadow-xl">
        
        {/* Etiqueta Visual */}
        <div className="hidden md:flex items-center gap-2 text-slate-400 border-r border-slate-200 pr-6">
          <SlidersHorizontal size={20} />
          <span className="text-sm font-medium uppercase tracking-wider">Filtros</span>
        </div>

        <div className="flex flex-1 w-full md:w-auto items-center gap-4 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {/* Selector de Tipo */}
          <div className="relative group min-w-[140px]">
            <select 
              name="type" 
              value={type} 
              onChange={(e) => handleType(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option value="">Todas las habitaciones</option>
              <option value="standard">Estándar</option>
              <option value="suite">Suite</option>
              <option value="family">Familiar</option>
              <option value="deluxe">Deluxe</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-4 h-4 group-hover:text-emerald-500 transition-colors" />
          </div>

          {/* Rango de Precios */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">$</span>
              <input 
                type="number" 
                placeholder="Min" 
                min={0} 
                value={minPrice} 
                onChange={(e) => handleMin(e.target.value)}
                className="w-24 pl-6 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400" 
              />
            </div>
            <span className="text-slate-300">-</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">$</span>
              <input 
                type="number" 
                placeholder="Max" 
                min={0} 
                value={maxPrice} 
                onChange={(e) => handleMax(e.target.value)}
                className="w-24 pl-6 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}