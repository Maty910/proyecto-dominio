import { X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

type SidebarProps = {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-surface text-secondary shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-primary">Menu</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col p-6 space-y-4 text-lg font-medium">
          <Link
            to="/"
            onClick={onClose}
            className="hover:text-primary transition"
          >
            Home
          </Link>
          <Link
            to="/rooms"
            onClick={onClose}
            className="hover:text-primary transition"
          >
            Rooms
          </Link>
          <a href="#" className="hover:text-primary transition">
            About
          </a>
          <a href="#" className="hover:text-primary transition">
            Contact
          </a>

          <div className="border-t border-gray-300 my-4"></div>

          {token ? (
            <button
              onClick={handleLogout}
              className="btn-secondary text-sm px-3 py-2"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="btn-primary text-sm px-3 py-2 text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="btn-secondary text-sm px-3 py-2 text-center"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </aside>
    </>
  )
}
