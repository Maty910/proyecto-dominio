import { useState } from 'react'
// Reemplazamos Link con 'a' para evitar errores de contexto si falta el Router
// import { Link } from 'react-router-dom' 
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility para combinar clases de Tailwind de forma segura
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
    name: "",
    surname: "",
    email: "",
    password: "",
    repeatPassword: "",
  })

  // Estado para animaciones de foco en inputs
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

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

  const isLogin = mode === 'login'

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
              {isLogin ? "¡Hola de nuevo!" : "Crear cuenta"}
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              {isLogin 
                ? "Ingresá tus datos para gestionar tus reservas." 
                : "Unite a nosotros y planeá tu próxima escapada."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <InputGroup
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  icon={<User size={18} />}
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                  isFocused={focusedInput === 'name'}
                />
                <InputGroup
                  name="surname"
                  placeholder="Apellido"
                  value={formData.surname}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('surname')}
                  onBlur={() => setFocusedInput(null)}
                  isFocused={focusedInput === 'surname'}
                />
              </div>
            )}

            <InputGroup
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail size={18} />}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              isFocused={focusedInput === 'email'}
            />

            <InputGroup
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              icon={<Lock size={18} />}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              isFocused={focusedInput === 'password'}
            />

            {!isLogin && (
              <InputGroup
                name="repeatPassword"
                type="password"
                placeholder="Repetir contraseña"
                value={formData.repeatPassword}
                onChange={handleChange}
                icon={<Lock size={18} />}
                onFocus={() => setFocusedInput('repeatPassword')}
                onBlur={() => setFocusedInput(null)}
                isFocused={focusedInput === 'repeatPassword'}
              />
            )}

            <InputGroup
              name="role"
              type="hidden"
              value={isLogin ? "customer" : "admin"} // Por defecto 'customer' para login, 'admin' para registro
              onChange={() => {}}
            />

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isLogin ? "Iniciar Sesión" : "Registrarse"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              {isLogin ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
              {/* Usamos <a> para evitar el crash si no hay Router padre en la preview */}
              <a 
                href={isLogin ? "/register" : "/login"} 
                className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors cursor-pointer"
              >
                {isLogin ? "Registrate acá" : "Ingresá acá"}
              </a>
            </p>
          </div>
        </div>
        
        {/* Decoración inferior */}
        <div className="h-1.5 w-full bg-linear-to-r from-emerald-400 to-emerald-600" />
      </motion.div>
    </div>
  )
}

// Subcomponente para los inputs
type InputGroupProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
  isFocused?: boolean
}

function InputGroup({ icon, isFocused, className, ...props }: InputGroupProps) {
  return (
    <div className="relative group">
      <div className={cn(
        "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200",
        isFocused && "text-emerald-500"
      )}>
        {icon}
      </div>
      <input
        className={cn(
          "w-full bg-slate-50 border-2 border-transparent text-slate-900 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-200 placeholder:text-slate-400",
          icon ? "pl-10" : "", // Validación explícita de string para clsx
          isFocused ? "bg-white border-emerald-500 shadow-sm" : "hover:bg-slate-100",
          className
        )}
        {...props}
      />
    </div>
  )
}