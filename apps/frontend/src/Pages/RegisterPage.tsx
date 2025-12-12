import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm/AuthForm'
import { register } from '../services/api'
import { motion } from 'framer-motion'

export const RegisterPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const navigate = useNavigate()

  const handleRegister = async (data: FormData) => {
    const name = data.get("name") as string
    const surname = data.get("surname") as string
    const email = data.get("email") as string
    const password = data.get("password") as string
    const repeatPassword = data.get("repeatPassword") as string

    // Validación básica de contraseñas
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

    setLoading(true)
    setError(undefined)

    try {
      // Si necesitás el select de rol, habría que agregarlo a AuthForm.
      await register(email, password, 'admin', name, surname)
      navigate('/login')
    } catch (err: any) {
      console.error("Register error:", err)
      setError(err.message || "Error al registrar el usuario.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -z-10 translate-y-1/2 translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <AuthForm
          mode="register"
          loading={loading}
          error={error}
          onSubmit={handleRegister}
        />
      </motion.div>
    </main>
  )
}