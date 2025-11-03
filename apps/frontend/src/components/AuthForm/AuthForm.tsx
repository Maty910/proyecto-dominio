import { useState } from 'react'

type AuthFormProps = {
  mode?: 'login' | 'register'
  loading?: boolean
  error?: string
  onSubmit?: (data: FormData) => void
}

export default function AuthForm({
  mode = 'login',
  loading = false,
  error,
  onSubmit,
}: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      const data = new FormData(e.target as HTMLFormElement)
      onSubmit(data)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-full max-w-md flex flex-col gap-4 mx-auto"
    >
      <h2 className="text-center">
        {mode === 'login' ? 'Welcome! 👋' : 'Create your account'}
      </h2>

      {mode === 'register' && (
        <>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />
          <input
            name="surname"
            type="text"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            className="input-field"
          />
        </>
      )}

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="input-field"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="input-field"
      />

      {mode === 'register' && (
        <input
          name="repeatPassword"
          type="password"
          placeholder="Repeat password"
          value={formData.repeatPassword}
          onChange={handleChange}
          className="input-field"
        />
      )}

      {error && <p className="text-danger text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`btn-primary mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
      </button>

      <p className="caption text-center mt-2">
        {mode === 'login'
          ? "Don't have an account? Register now"
          : 'Already have an account? Login here'}
      </p>
    </form>
  )
}
