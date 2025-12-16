import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/') 
    }, 1500)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-secondary overflow-hidden">
      
      {/* 1. IMAGEN DE FONDO (Cinemática) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop" 
          alt="Hotel Background" 
          className="w-full h-full object-cover"
        />
        {/* Overlay un poco más oscuro para que se lea el texto blanco */}
        <div className="absolute inset-0 bg-secondary/40 backdrop-blur-[2px]"></div>
      </div>

      {/* CONTENEDOR PRINCIPAL (Grid de 2 columnas) */}
      <div className="relative z-10 container mx-auto px-4 md:px-12 grid lg:grid-cols-2 gap-12 items-center h-full">
        
        {/* COLUMNA IZQUIERDA: Los textos de bienvenida (Recuperados) */}
        <div className="hidden lg:block text-white space-y-6 animate-slide-in-left">
          <h1 className="text-5xl font-bold leading-tight text-white/90">
            Bienvenido de <br />
            <span className="text-primary">nuevo.</span>
          </h1>
          <p className="text-xl text-white/80 max-w-lg leading-relaxed font-light">
            Ingresá a tu cuenta para gestionar tus reservas, guardar tus habitaciones favoritas y acceder a descuentos exclusivos pensados para vos.
          </p>
          
          {/* Un detalle visual extra (opcional) */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-4">
                <img className="w-10 h-10 rounded-full border-2 border-secondary" src="https://i.pravatar.cc/150?img=32" alt="" />
                <img className="w-10 h-10 rounded-full border-2 border-secondary" src="https://i.pravatar.cc/150?img=12" alt="" />
                <img className="w-10 h-10 rounded-full border-2 border-secondary" src="https://i.pravatar.cc/150?img=5" alt="" />
            </div>
            <p className="text-sm text-white/60">+500 viajeros confían en nosotros</p>
          </div>
        </div>

        {/* COLUMNA DERECHA: La Tarjeta Flotante (Formulario) */}
        <div className="w-full max-w-md mx-auto lg:ml-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 animate-slide-in">
            
            <div className="text-center md:text-left mb-8">
              <h2 className="text-3xl font-bold text-secondary">Iniciar Sesión</h2>
              <p className="mt-2 text-secondary/60 text-sm">
                ¿No tenés cuenta?{" "}
                <Link to="/register" className="font-semibold text-primary hover:underline">
                  Registrate gratis
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-secondary">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary/40 group-focus-within:text-primary transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all text-secondary"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-medium text-secondary">Contraseña</label>
                  <a href="#" className="text-xs font-semibold text-primary hover:underline">¿Olvidaste tu contraseña?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary/40 group-focus-within:text-primary transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all text-secondary"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary/40 hover:text-secondary cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Botón Ingresar */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-white bg-primary hover:bg-[#006244] font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Ingresando...
                  </>
                ) : (
                  <>
                    Ingresar <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>

              {/* Separador */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/50 backdrop-blur-sm text-secondary/50 rounded">O continuá con</span>
                </div>
              </div>

              {/* Botones Sociales */}
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white cursor-pointer">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Google" />
                  <span className="text-sm font-medium text-secondary">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white cursor-pointer">
                  <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5 w-5 mr-2" alt="Facebook" />
                  <span className="text-sm font-medium text-secondary">Facebook</span>
                </button>
              </div>

            </form>
          </div>

          <p className="text-white/40 text-xs text-center mt-8">
            © {new Date().getFullYear()} Hotel Now. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </div>
  )
}