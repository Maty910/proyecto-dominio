import { useState } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import { register } from '../services/api'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleRegister = async (data: FormData) => {
    const payload = {
      name: data.get("name") as string,
      surname: data.get("surname") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
    }
    if (payload.password !== data.get("repeatPassword")) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError(undefined)

    try {
      await register(payload)
      window.location.href = "/login"
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-background text-secondary">
      <AuthForm
        mode="register"
        loading={loading}
        error={error}
        onSubmit={handleRegister}
      />
    </main>
  )
}