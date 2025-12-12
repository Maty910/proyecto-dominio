import type { Room } from './../../types/types' 

type RoomCardProps = Room & {
  checkInDate?: string
  checkOutDate?: string
}

export default function RoomCard({
  title,
  price,
  image,
  description,
  status,
  checkInDate,
  checkOutDate,
}: RoomCardProps) {
  return (
    <article className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      )}

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>

        {checkInDate && checkOutDate && (
          <p className="text-sm text-secondary mb-2">
            🗓️ {new Date(checkInDate).toLocaleDateString()} -{" "}
            {new Date(checkOutDate).toLocaleDateString()}
          </p>
        )}

        {status && (
          <p
            className={`text-sm font-semibold ${
              status === "available"
                ? "text-green-600"
                : status === "maintenance"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {status.toUpperCase()}
          </p>
        )}

        {price && <p className="text-primary font-semibold">{price} / night</p>}
      </div>
    </article>
  )
}
