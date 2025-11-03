export function Hero() {
  return (
    <section className="relative bg-primary/10 backdrop-blur-sm py-24 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Welcome to <span className="text-primary">Hotel Now</span>
        </h1>
        <p className="text-lg text-secondary/80 mb-8">
          Discover comfort and style — book your perfect stay in just a few clicks.
        </p>
        <button className="btn-primary text-lg px-6 py-3">Book Now</button>
      </div>
    </section>
  )
}