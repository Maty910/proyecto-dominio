import AuthForm from '../components/AuthForm/AuthForm'

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <AuthForm mode="login" />
    </div>
  )
}
