import { useNavigate } from "react-router-dom"

export function CallToAction() {
  const navigate = useNavigate()
  return (
    <section className="py-20 bg-primary text-white text-center">
      <h2 className="text-3xl font-semibold mb-4">Ready to enjoy your next stay?</h2>
      <p className="text-lg mb-8">Join our community and get exclusive deals and updates.</p>
      <button onClick={()=> navigate("/register")} className="btn-secondary px-6 py-3">Sign Up Now</button>
    </section>
  )
}
