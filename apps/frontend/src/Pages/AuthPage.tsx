import AuthForm from '../components/AuthForm/AuthForm'
import MainLayout from '../components/Layout/MainLayout'

export default function AuthPage() {
  return (
    <MainLayout>
      <div className='card w-full max-w-md'>
        <AuthForm mode="login" />
      </div>
    </MainLayout>
  )
}
