import { useState, useEffect } from "react"
import { Menu, X, User, LogOut, Hotel } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  // Simulación de auth
  const token = localStorage.getItem("token")
  
  // Detectamos si estamos en la home para aplicar el efecto transparente
  const isHome = location.pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      // Bajamos el umbral a 10px para que reaccione rápido
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
    window.location.reload()
  }

  // Lógica para determinar el estilo actual
  // Si NO estamos en home, forzamos el estilo "scrolled" (fondo blanco, texto oscuro) siempre.
  // Si estamos en home, dependemos del scroll.
  const useSolidStyle = !isHome || isScrolled

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Habitaciones", path: "/rooms" },
    ...(token ? [{ name: "Mis Reservas", path: "/reservations" }] : []),
    { name: "Nosotros", path: "/about" },
    { name: "Contacto", path: "/contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b",
        // Eliminamos el cambio de py-5 a py-3 para evitar el salto de altura. Usamos py-4 fijo.
        "py-4", "pt-4",
        useSolidStyle
          ? "bg-white/90 backdrop-blur-md border-transparent-200 shadow-sm" 
          : "bg-white/90 backdrop-blur-md border-transparent-200 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-emerald-600 rounded-lg text-white group-hover:bg-emerald-700 transition-colors">
            <Hotel size={24} />
          </div>
          <span className={cn(
            "text-xl font-bold tracking-tight transition-colors",
            useSolidStyle ? "text-slate-800" : "text-slate-800"
          )}>
            Hotel Now
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-emerald-500",
                "text-slate-600",
                location.pathname === link.path && ("text-emerald-600 font-semibold")
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLogout}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  useSolidStyle ? "text-slate-500 hover:text-red-500" : "text-slate-500 hover:text-white drop-shadow-md"
                )}
              >
                <LogOut size={18} />
                Salir
              </button>
              <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 font-bold shadow-sm">
                <User size={20} />
              </div>
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className={cn(
                  "px-4 py-2 text-sm font-semibold transition-colors hover:underline",
                  "text-slate-600"
                )}
              >
                Ingresar
              </Link>
              <Link 
                to="/register" 
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95",
                  useSolidStyle 
                    ? "bg-slate-900 text-white hover:bg-slate-800" 
                    : "bg-white text-emerald-900 hover:bg-emerald-50"
                )}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            useSolidStyle ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"
          )}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg font-medium text-slate-600 hover:text-emerald-600 transition-colors py-2 border-b border-slate-50 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="mt-4 flex flex-col gap-3">
                {token ? (
                  <button 
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                >
                  <LogOut size={18} />
                  Cerrar Sesión
                </button>
                ) : (
                  <>
                    <Link to="/login" className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-center hover:border-slate-300 transition-colors">
                      Iniciar Sesión
                    </Link>
                    <Link to="/register" className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-center shadow-lg hover:bg-emerald-700 transition-colors">
                      Crear Cuenta
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}