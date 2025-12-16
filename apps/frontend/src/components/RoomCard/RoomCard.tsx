import { Link } from "react-router-dom"
import type { Room } from './../../types/types' 
import { ArrowRight } from "lucide-react"
import { formatDate } from "../../../utils/dateFormatter"

type RoomCardProps = Room & {
  checkInDate?: string
  checkOutDate?: string
}

export default function RoomCard({
  id,           
  title,         
  price,
  image,
  description,
  status,
  checkInDate,
  checkOutDate,
}: RoomCardProps) {
  
  // Formateador de moneda para que se vea lindo ($ 45.000)
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(Number(price))

  return (
    // Envolvemos todo en un Link que lleva a /rooms/ID
    <Link to={`/rooms/${id}`} className="group block h-full">
      <article className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        <div className="relative overflow-hidden h-56">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          {/* Badge de estado flotante */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide bg-white/90 backdrop-blur-sm shadow-sm
                ${status === 'available' ? 'text-primary' : 'text-gray-500'}
            `}>
                {status === 'available' ? 'Disponible' : 'Ocupado'}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
          </div>
          
          <p className="text-sm text-secondary/70 mb-4 line-clamp-2 flex-1">{description}</p>

          {checkInDate && checkOutDate && (
            <p className="text-sm text-secondary mb-2 bg-gray-50 p-2 rounded">
              🗓️ {formatDate(checkInDate)} -{" "}
              {formatDate(checkOutDate)}
            </p>
          )}

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
            <div>
                <p className="text-xs text-secondary/50">Precio por noche</p>
                <p className="text-primary font-bold text-lg">{formattedPrice}</p>
            </div>
            <span className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <ArrowRight size={20} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}