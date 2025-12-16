import { Award, Heart, Leaf, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen">
      
      {/* 1. HERO SECTION (Simple y centrado) */}
      <section className="bg-secondary text-white py-20 px-4 relative overflow-hidden">
        {/* Un patrón sutil de fondo o gradiente */}
        <div className="absolute inset-0 bg-linear-to-r from-secondary to-[#1a3a46] z-0" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-emerald-50">
            Nuestra historia, <span className="text-primary">tu descanso.</span>
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            En Hotel Now, creemos que viajar no es solo moverse de un lugar a otro, 
            sino encontrar un espacio donde sentirte en casa, rodeado de confort y naturaleza.
          </p>
        </div>
      </section>

      {/* 2. LA HISTORIA (Layout 2 columnas) */}
      <section className="py-20 container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-2">
              Sobre Nosotros
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              Redefiniendo la hospitalidad desde 2020
            </h2>
            <p className="text-secondary/70 text-lg leading-relaxed">
              Lo que comenzó como un pequeño proyecto familiar en las afueras de la ciudad, 
              hoy es un refugio para viajeros de todo el mundo. Nuestro objetivo siempre fue simple: 
              ofrecer un servicio de lujo sin perder la calidez humana.
            </p>
            <p className="text-secondary/70 text-lg leading-relaxed">
              Cada habitación ha sido diseñada pensando en la funcionalidad y el descanso, 
              utilizando materiales sustentables y tecnología moderna para garantizar 
              una estadía inolvidable.
            </p>
            
            <div className="pt-4 flex gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">+5k</span>
                <span className="text-sm text-secondary/60">Huéspedes Felices</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">4.9</span>
                <span className="text-sm text-secondary/60">Rating Promedio</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">15</span>
                <span className="text-sm text-secondary/60">Premios Ganados</span>
              </div>
            </div>
          </div>
          
          {/* Imagen con borde redondeado y sombra */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl -z-10 transform translate-x-2 translate-y-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop" 
              alt="Lobby del hotel" 
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. NUESTROS VALORES (Grid de tarjetas) */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary mb-4">Lo que nos hace únicos</h2>
            <p className="text-secondary/70">
              No solo vendemos habitaciones, construimos experiencias basadas en pilares fundamentales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Valor 1 */}
            <div className="bg-background p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-primary/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Leaf size={24} />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Sustentabilidad</h3>
              <p className="text-secondary/70 leading-relaxed">
                Comprometidos con el medio ambiente, utilizamos energía renovable y productos biodegradables en todas nuestras instalaciones.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="bg-background p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-primary/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Pasión por el Servicio</h3>
              <p className="text-secondary/70 leading-relaxed">
                Nuestro equipo está disponible 24/7 para asegurarse de que cada detalle de tu estadía sea perfecto.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="bg-background p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-primary/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Calidad Premium</h3>
              <p className="text-secondary/70 leading-relaxed">
                Desde las sábanas de algodón egipcio hasta el café de especialidad, elegimos solo lo mejor para vos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EQUIPO / CTA FINAL */}
      <section className="py-20 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-secondary mb-8">Conocé al equipo detrás de la magia</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-12">
           {/* Podés poner fotos reales o avatares genéricos */}
          <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=11" alt="CEO" className="w-full h-full object-cover" />
              </div>
              <p className="font-semibold text-secondary">Martín Gómez</p>
              <p className="text-xs text-secondary/60">Fundador</p>
          </div>
          <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=5" alt="Manager" className="w-full h-full object-cover" />
              </div>
              <p className="font-semibold text-secondary">Laura Silva</p>
              <p className="text-xs text-secondary/60">Gerente General</p>
          </div>
          <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=33" alt="Chef" className="w-full h-full object-cover" />
              </div>
              <p className="font-semibold text-secondary">Julián R.</p>
              <p className="text-xs text-secondary/60">Jefe de Cocina</p>
          </div>
        </div>

        <div className="bg-primary/5 rounded-3xl p-8 max-w-3xl mx-auto border border-primary/10">
          <h3 className="text-2xl font-bold text-secondary mb-4">¿Listo para vivir la experiencia?</h3>
          <p className="text-secondary/80 mb-6">
            Reservá hoy mismo y descubrí por qué somos el hotel mejor valorado de la zona.
          </p>
          <a href="/rooms" className="btn-primary inline-flex items-center gap-2">
            Ver Habitaciones Disponibles <CheckCircle size={18} />
          </a>
        </div>
      </section>
      
    </main>
  )
}