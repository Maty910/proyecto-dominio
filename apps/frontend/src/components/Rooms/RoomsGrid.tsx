import RoomCard from './RoomCard'

type Room = {
  id: number
  title: string
  price: string
  image: string
  description: string
}

type RoomsGridProps = {
  rooms: Room[]
}

export default function RoomsGrid({ rooms }: RoomsGridProps) {
  return (
    <section className="py-12 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-secondary mb-8 text-center">
          Our Rooms
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard 
              key={room.id}
              title={room.title}
              price={room.price}
              image={room.image}
              description={room.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}