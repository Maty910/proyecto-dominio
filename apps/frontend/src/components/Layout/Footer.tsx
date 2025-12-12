import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-18 pb-5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* 1. BIG CTA (Inspirado en Affinity) */}
        <div className="mb-20 border-b border-white/10 pb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6 max-w-4xl text-white">
            ¿Listo para tu <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#4ecdc4]">
              próxima escapada?
            </span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
            <p className="text-xl text-white/60 max-w-md font-light">
              Reservá hoy mismo y descubrí el confort que te merecés. Sin sorpresas, solo relax.
            </p>
            
            <a href="/rooms" className="group flex items-center gap-4 bg-white text-secondary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300">
              Ver Disponibilidad
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* 2. LINKS & NEWSLETTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-10">
          
          {/* Logo / Brand Area (Columna ancha) */}
          <div className="md:col-span-4 space-y-6">
            <div className="text-2xl font-bold tracking-tight">
              HOTEL <span className="text-primary">NOW</span>.
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Diseñado en Buenos Aires. <br/>
              Inspirado en el mundo. <br/>
              Pensado para vos.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2">
            <h4 className="font-semibold mb-6 text-white">Explorar</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="/" className="hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="/rooms" className="hover:text-primary transition-colors">Habitaciones</a></li>
              <li><a href="/amenities" className="hover:text-primary transition-colors">Servicios</a></li>
              <li><a href="/dining" className="hover:text-primary transition-colors">Restaurante</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold mb-6 text-white">Compañía</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="/about" className="hover:text-primary transition-colors">Nosotros</a></li>
              <li><a href="/careers" className="hover:text-primary transition-colors">Trabajá acá</a></li>
              <li><a href="/press" className="hover:text-primary transition-colors">Prensa</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Newsletter Minimalista */}
          <div className="md:col-span-4">
            <h4 className="font-semibold mb-6 text-white">Newsletter</h4>
            <p className="text-white/50 text-sm mb-6">
              Recibí ofertas exclusivas y novedades.
            </p>
            <form className="flex flex-col gap-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="tu@email.com" 
                  className="w-full bg-transparent border-b border-white/30 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                />
                <button type="submit" className="absolute right-0 top-3 text-white/50 hover:text-primary transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3. BOTTOM BAR (Legal & Socials) */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-5 border-t border-white/10 gap-6">
          <div className="flex gap-6 text-xs text-white/40 font-medium uppercase tracking-wider">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-primary hover:scale-110 transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white/60 hover:text-primary hover:scale-110 transition-all">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-white/60 hover:text-primary hover:scale-110 transition-all">
              <Facebook size={20} />
            </a>
          </div>
          
          <div className="text-xs text-white/30">
            © {new Date().getFullYear()} Hotel Now Inc.
          </div>
        </div>
      </div>
    </footer>
  )
}