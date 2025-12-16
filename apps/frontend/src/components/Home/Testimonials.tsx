import { Star } from "lucide-react"

const reviews = [
  {
    name: "Sofía Martínez",
    role: "Viajera de Negocios",
    content: "La conexión a internet es excelente, pude trabajar desde la habitación sin problemas. El café del desayuno es un 10.",
    stars: 5
  },
  {
    name: "Lucas & Ana",
    role: "Pareja",
    content: "La Suite Esmeralda es increíble. La atención del personal hizo que nuestro aniversario fuera inolvidable.",
    stars: 5
  },
  {
    name: "Carlos Ruiz",
    role: "Turista",
    content: "Muy buena ubicación, cerca de todo pero súper silencioso para dormir. Volvería sin dudarlo.",
    stars: 4
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-emerald-50">Lo que dicen nuestros huéspedes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="flex gap-1 mb-4 text-accent"> {/* Usamos el amarillo Accent para las estrellas */}
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    fill={i < review.stars ? "currentColor" : "none"} 
                    className={i < review.stars ? "" : "text-gray-500"}
                  />
                ))}
              </div>
              <p className="text-gray-200 mb-6 italic">"{review.content}"</p>
              <div>
                <p className="font-semibold text-teal-600">{review.name}</p>
                <p className="text-sm text-amber-50 font-small">{review.role}</p> {/* Texto Primary resalta sobre oscuro */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}