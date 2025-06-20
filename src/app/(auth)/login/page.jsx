'use client';

import { useRouter } from 'next/navigation';
import { handleLogin } from './actions';
import AuthForm from '../../components/features/auth/login/AuthForm';
import Logo from '../../components/features/auth/Logo';

export default function Login() {
    const router = useRouter();
    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        try {
            const data = await handleLogin(formData);
            console.log('Login realizado:', data);
            // router.push('/home'); TODO: Implementar a tela de redirecionamento após login
        } catch (err) {
            console.error('Erro no login:', err.message);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-4/6">
                <Logo src="/login-background.png" fill priority />
            </div>
            <div className="w-2/6">
                <AuthForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
