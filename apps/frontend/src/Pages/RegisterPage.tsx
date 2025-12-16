import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, CheckCircle } from "lucide-react"
import { register } from "../services/api"

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    repeatPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)

    if (formData.password !== formData.repeatPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.")
      return
    }

    setLoading(true)

    try {
      await register(formData.email, formData.password, 'client', formData.name, formData.surname)
      navigate('/login')
    } catch (err: any) {
      console.error("Register error:", err)
      setError(err.message || "Ocurrió un error al registrarte. Intentalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-secondary overflow-hidden">
      
      {/* 1. CAMBIO DE IMAGEN DE FONDO (Una más luminosa) */}
      <div className="absolute inset-0 z-0">
        <img 
          // Usamos una imagen de un lobby lujoso y luminoso para que contraste mejor
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Hotel Lobby" 
          className="w-full h-full object-cover"
        />
        {/* Overlay oscuro para asegurar legibilidad del texto */}
        <div className="absolute inset-0 bg-secondary/50 backdrop-blur-[2px]"></div>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 container mx-auto px-4 md:px-12 grid lg:grid-cols-2 gap-12 items-center h-full py-10">
        
        {/* COLUMNA IZQUIERDA: Texto Inspirador */}
        {/* 2. ARREGLO DE COLOR DE TEXTO: Forzamos 'text-white' explícitamente en los elementos */}
        <div className="hidden lg:block space-y-8 animate-slide-in-left">
          <h1 className="text-5xl font-bold leading-tight text-white">
            Empezá tu <br />
            <span className="text-primary">aventura hoy.</span>
          </h1>
          <p className="text-xl text-white/80 max-w-lg leading-relaxed font-light">
            Unite a Hotel Now y accedé a las mejores habitaciones, ofertas personalizadas y un proceso de reserva sin estrés.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg text-primary"><CheckCircle size={20}/></div>
                <span className="text-white/90 font-medium">Reservas instantáneas y seguras.</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg text-primary"><CheckCircle size={20}/></div>
                <span className="text-white/90 font-medium">Atención al cliente 24/7.</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg text-primary"><CheckCircle size={20}/></div>
                <span className="text-white/90 font-medium">Cancelación flexible en estadías seleccionadas.</span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Formulario de Registro (Sin cambios acá) */}
        <div className="w-full max-w-md mx-auto lg:ml-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 animate-slide-in">
            
            <div className="text-center md:text-left mb-6">
              <h2 className="text-3xl font-bold text-secondary">Crear Cuenta</h2>
              <p className="mt-2 text-secondary/60 text-sm">
                ¿Ya tenés cuenta?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Iniciá sesión
                </Link>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              
              {/* Nombre y Apellido (Grid) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary ml-1">Nombre</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary/40 group-focus-within:text-primary transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Juan"
                      className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all text-secondary text-sm"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary ml-1">Apellido</label>
                  <div className="relative group">
                    <input
                      name="surname"
                      type="text"
                      required
                      placeholder="Pérez"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all text-secondary text-sm"
                      value={formData.surname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary ml-1">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary/40 group-focus-within:text-primary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all text-secondary text-sm"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary ml-1">Contraseña</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary/40 group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all text-secondary text-sm"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary/40 hover:text-secondary cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Repetir Contraseña */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary ml-1">Confirmar Contraseña</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary/40 group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    name="repeatPassword"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all text-secondary text-sm"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-white bg-primary hover:bg-[#006244] font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    Registrarme <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>

            </form>
          </div>
          
          <p className="text-white/40 text-xs text-center mt-6">
            © {new Date().getFullYear()} Hotel Now. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </div>
  )
}