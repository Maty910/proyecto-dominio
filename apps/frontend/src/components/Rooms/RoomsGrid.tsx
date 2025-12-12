import RoomCard from "../RoomCard/RoomCard" // Ajustar ruta si RoomCard no está dentro de RoomsGrid
import type { Room } from "../../types/types"
import { motion } from "framer-motion"

type RoomsGridProps = {
  rooms: Room[]
}

export default function RoomsGrid({ rooms }: RoomsGridProps) {
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Encontrá tu lugar ideal
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl">
          Explorá nuestra selección de habitaciones exclusivas pensadas para tu confort y descanso.
        </p>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-400 text-lg">No encontramos habitaciones disponibles en este momento.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <RoomCard
                id={room.id}
                title={room.title}
                price={room.price}
                capacity={0} 
                description={room.description}
                amenities={[]}
                image={room.image}
                status={room.status}
                checkInDate={room.checkInDate}
                checkOutDate={room.checkOutDate}
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}