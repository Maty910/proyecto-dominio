import { Wifi, Coffee, MapPin, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: Wifi,
    title: "Wi-Fi de Alta Velocidad",
    description: "Conexión fibra óptica gratuita en todas las habitaciones y áreas comunes."
  },
  {
    icon: Coffee,
    title: "Desayuno Buffet",
    description: "Empezá tu día con productos locales frescos, panadería artesanal y café de especialidad."
  },
  {
    icon: MapPin,
    title: "Ubicación Privilegiada",
    description: "En el corazón de la ciudad, a pasos de los mejores restaurantes y atracciones turísticas."
  },
  {
    icon: ShieldCheck,
    title: "Seguridad 24hs",
    description: "Acceso controlado y personal de seguridad para que descanses sin preocupaciones."
  }
]

export function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-secondary mb-4">Experiencia Premium</h2>
          <p className="text-secondary/80 max-w-2xl mx-auto">
            No solo ofrecemos una cama, ofrecemos una experiencia completa pensada en cada detalle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-surface p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center group"
            >
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">{feature.title}</h3>
              <p className="text-secondary/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}