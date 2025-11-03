type RoomCardProps = {
  title: string
  price: string
  image: string
  description: string
}
export default function RoomCard({ title, price, image, description }: RoomCardProps) {
  return (
    <article className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3 ">{description}</p>
        <p className="text-primary font-semibold">{price} / night</p>
      </div>
    </article>
  )
}