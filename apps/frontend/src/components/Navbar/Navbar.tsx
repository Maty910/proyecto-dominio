import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '../Sidebar/Sidebar'

export default function Navbar() {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShow(false)
      else setShow(true)
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full bg-surface/70 backdrop-blur-lg border-b border-gray-200 z-30 
          transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Hotel Now</h1>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-secondary font-medium">
            <a href="#" className="hover:text-primary transition">Home</a>
            <a href="#" className="hover:text-primary transition">Rooms</a>
            <a href="#" className="hover:text-primary transition">About</a>
            <a href="#" className="hover:text-primary transition">Contact</a>

            <div className="flex gap-2 ml-4">
              <button className="btn-primary text-sm px-3 py-1.5">Login</button>
              <button className="btn-secondary text-sm px-3 py-1.5">Register</button>
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
