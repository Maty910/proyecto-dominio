import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Search } from "lucide-react"

export function Hero() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  // Imagen de ejemplo de alta calidad (Unsplash)
  // Podés cambiar esto por: `url('../../assets/Hotel.jpg')`
  const bgImage = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"

  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image con efecto Parallax sutil (opcional si agregamos scroll listener) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      
      {/* Overlay Gradiente para legibilidad */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-5xl px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold tracking-wider uppercase mb-6">
            Experiencia de Lujo
          </span>
          <h1 className="text-white 5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Descubrí tu próximo <br />
            <span className="text-emerald-400">destino soñado</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Reservá habitaciones exclusivas y viví una experiencia inolvidable con solo un click.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/rooms")}
              className="group relative px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Ver Habitaciones</span>
              <ArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" />
            </button>

            {!token && (
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold text-lg transition-all flex items-center gap-2"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </motion.div>

        {/* Buscador Flotante (Decorativo por ahora, funcional a futuro) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 hidden md:flex items-center bg-white rounded-full p-2 max-w-2xl mx-auto shadow-2xl"
        >
          <div className="flex-1 px-6 border-r border-slate-200">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Destino</p>
            <p className="text-slate-800 font-medium">Buenos Aires, AR</p>
          </div>
          <div className="flex-1 px-6 border-r border-slate-200">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Entrada</p>
            <p className="text-slate-800 font-medium">Agregar fecha</p>
          </div>
          <div className="flex-1 px-6">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Huéspedes</p>
            <p className="text-slate-800 font-medium">¿Cuántos viajan?</p>
          </div>
          <button 
            onClick={() => navigate('/rooms')}
            className="p-4 bg-slate-900 rounded-full text-white hover:bg-emerald-600 transition-colors"
          >
            <Search size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}