import { useState, useEffect } from "react"
import { Menu, X, User, LogOut, Hotel, CalendarCheck } from "lucide-react"
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
  const token = localStorage.getItem("token")
  
  const isHome = location.pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const isTransparent = isHome && !isScrolled
  
  // Colores dinámicos
  const textColor = isTransparent ? "text-white" : "text-secondary hover:text-primary"
  const logoText = isTransparent ? "text-white" : "text-secondary"
  const logoBg = isTransparent ? "bg-white/20 text-white" : "bg-primary text-white"

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
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 antialiased",
        isScrolled ? "py-3" : "py-5",
        isTransparent 
          ? "bg-transparent border-b border-white/10" 
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className={cn("p-2 rounded-lg transition-colors", logoBg)}>
            <Hotel size={24} />
          </div>
          <span className={cn("text-xl font-medium tracking-tight transition-colors", logoText)}>
            Hotel <span className={isTransparent ? "text-primary font-extrabold" : "text-primary"}>Now</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-light transition-colors relative tracking-wide",
                textColor
              )}
            >
              {link.name}
              
              {/* Línea animada */}
              {location.pathname === link.path && (
                <motion.div 
                    layoutId="underline"
                    className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-4">
              <Link to="/reservations" className={cn("transition-colors hover:text-primary", textColor)}>
                <CalendarCheck size={20} />
              </Link>
              <div className={cn("h-6 w-px mx-1", isTransparent ? "bg-white/30" : "bg-gray-300")}></div>
              <button 
                onClick={handleLogout}
                className={cn("flex items-center gap-2 text-sm font-light transition-colors hover:text-primary")}
              >
                <LogOut size={18} /> Salir
              </button>
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-primary to-emerald-400 p-0.5">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User size={18} className="text-secondary" />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* CAMBIO: Usamos font-semibold. Esto elimina el borde blanco al hacer hover */}
              <Link 
                to="/login" 
                className={cn("px-4 py-2 text-white font-extralight transition-colors hover:text-primary",)}
              >
                Ingresar
              </Link>
              <Link 
                to="/register" 
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95",
                  isTransparent 
                    ? "bg-white text-secondary hover:bg-gray-100" 
                    : "bg-primary text-white hover:bg-[#006244]"
                )}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            isTransparent ? "text-white hover:bg-white/10" : "text-secondary hover:bg-gray-100"
          )}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4 text-secondary">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                      "text-lg font-medium transition-colors py-3 border-b border-gray-50 last:border-0 flex justify-between items-center",
                      location.pathname === link.path ? "text-primary font-bold" : "text-secondary hover:text-primary"
                  )}
                >
                  {link.name}
                  {location.pathname === link.path && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </Link>
              ))}
              
              <div className="mt-6 flex flex-col gap-3">
                {token ? (
                  <button 
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full py-3 rounded-xl border border-red-100 text-red-600 bg-red-50 font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                  >
                    <LogOut size={18} />
                    Cerrar Sesión
                  </button>
                ) : (
                  <>
                    <Link 
                        to="/login" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3 rounded-xl border-2 border-secondary text-secondary font-bold text-center hover:bg-secondary hover:text-white transition-colors"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link 
                        to="/register" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3 rounded-xl bg-primary text-white font-bold text-center shadow-lg hover:bg-[#006244] transition-colors"
                    >
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