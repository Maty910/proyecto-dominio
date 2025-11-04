import AuthForm from '../components/AuthForm/AuthForm'

export default function AuthPage() {
  return (
    <div className='card w-full max-w-md'>
      <AuthForm mode="login" />
    </div>
  )
}
