import { useState } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import { login } from '../services/api'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleLogin = async (data: FormData) => {
    const email = data.get("email") as string
    const password = data.get("password") as string

    setLoading(true)
    setError(undefined)

    try {
      await login(email, password)
      // Redirección nativa para asegurar recarga de estado de auth
      window.location.href = "/"
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Ocurrió un error al iniciar sesión.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Fondo decorativo sutil (opcional) */}
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-emerald-50 to-transparent -z-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <AuthForm
          mode="login"
          loading={loading}
          error={error}
          onSubmit={handleLogin}
        />
      </motion.div>
    </main>
  )
}