import RoomCard from "./RoomCard"
import type { Room } from "../../types/types"

type RoomsGridProps = {
  rooms: Room[]
}

export default function RoomsGrid({ rooms }: RoomsGridProps) {
  return (
    <section className="py-12 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-secondary mb-8 text-center">
          Available Rooms
        </h2>

        {rooms.length === 0 ? (
          <p className="text-center text-muted-foreground">No rooms found</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                id={room.id}
                title={room.title}
                description={room.description}
                price={room.price}
                image={room.image}
                status={room.status}
                checkInDate={room.checkInDate}
                checkOutDate={room.checkOutDate}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
