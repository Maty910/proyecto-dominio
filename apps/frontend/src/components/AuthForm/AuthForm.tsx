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
  onSubmit
}: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
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
      className="w-80 mx-auto mt-10 p-6 bg-white rounded-xl shadow-md flex flex-col gap-3 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
        {mode === 'login' ? 'Login' : 'Register'}
      </h2>

      {mode === 'register' && (
        <>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            name="surname"
            type="text"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </>
      )}

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
      />

      {mode === 'register' && (
        <input
          name="repeatPassword"
          type="password"
          placeholder="Repeat password"
          value={formData.repeatPassword}
          onChange={handleChange}
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-semibold py-2 rounded-md mt-2 transition-colors`}
      >
        {loading
          ? 'Loading...'
          : mode === 'login'
          ? 'Login'
          : 'Register'}
      </button>
    </form>
  )
}