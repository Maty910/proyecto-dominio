import { useNavigate } from "react-router-dom"

export function Hero() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  return (
    <section
      className="relative bg-cover bg-center h-[80vh] flex flex-col justify-center items-center text-center text-white"
      style={{ backgroundImage: `url('../../assets/Hotel.avif')` }}
    >
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to Hotel Now</h1>
        <p className="text-lg mb-8">
          Discover our rooms and book your stay with just one click.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/rooms")}
            className="px-6 py-3 bg-primary hover:bg-primary/80 rounded-xl font-semibold"
          >
            View Rooms
          </button>
          {!token && (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-white text-primary hover:bg-gray-100 rounded-xl font-semibold"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </section>
  )
}