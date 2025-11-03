import { X } from 'lucide-react'

type SidebarProps = {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
      />

      {/* Sidebar panel */}
      <aside
        className="fixed top-0 left-0 h-full w-64 bg-surface/80 backdrop-blur-xl shadow-xl border-r border-gray-200 
                  z-50 p-6 transform transition-transform duration-300 ease-out animate-slide-in"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-primary transition"
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        <nav className="mt-10 space-y-4">
          <a href="#" className="block text-secondary hover:text-primary font-medium">
            Home
          </a>
          <a href="#" className="block text-secondary hover:text-primary font-medium">
            Rooms
          </a>
          <a href="#" className="block text-secondary hover:text-primary font-medium">
            About
          </a>
          <a href="#" className="block text-secondary hover:text-primary font-medium">
            Contact
          </a>

          <div className="mt-8 border-t border-gray-200 pt-4 space-y-2">
            <button className="btn-primary w-full">Login</button>
            <button className="btn-secondary w-full">Register</button>
          </div>
        </nav>
      </aside>
    </>
  )
}
