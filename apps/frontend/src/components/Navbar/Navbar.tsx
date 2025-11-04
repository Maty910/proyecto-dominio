import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar"

export function Navbar() {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShow(false)
      else setShow(true)
      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full bg-surface/70 backdrop-blur-lg border-b border-gray-200 z-30 
          transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">Hotel Now</Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-secondary font-medium">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <Link to="/rooms" className="hover:text-primary transition">Rooms</Link>
            <Link to="/about" className="hover:text-primary transition">About</Link>
            <Link to="/contact" className="hover:text-primary transition">Contact</Link>

            <div className="flex gap-2 ml-4">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm px-3 py-1.5"
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn-primary text-sm px-3 py-1.5">
                    Login
                  </Link>
                  <Link to="/register" className="btn-secondary text-sm px-3 py-1.5">
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-secondary hover:text-primary transition"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
