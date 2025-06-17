import LoginForm from '@/app/components/features/auth/login/LoginForm';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 bg-gray-200">
        <Image
          src="/toguro.jpeg"
          alt="Login Background"
          fill 
          className="object-cover"
          priority
        />
      </div>
      <LoginForm />
    </div>
  );      
}