import { useState } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import { login } from '../services/api'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleLogin = async (data: FormData) => {
    const email = data.get("email") as string
    const password = data.get("password") as string

    setLoading(true)
    setError(undefined)

    try{
      await login(email, password)
      window.location.href = "/"
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-background text-secondary">
      <AuthForm
        mode="login"
        loading={loading}
        error={error}
        onSubmit={handleLogin}
      />
    </main>
  )
}