'use client';

import { useRouter } from 'next/navigation';
import { handleRegister } from './actions';
import RegisterForm from '../../components/features/auth/register/RegisterForm';
import Logo from '../../components/features/auth/Logo';

export default function Register() {
    const router = useRouter();
    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        try {
            const data = await handleRegister(formData);
            console.log('Registro realizado:', data);
            router.push('/login');
        } catch (err) {
            alert('Erro ao registrar. Por favor, tente novamente.');
            // TODO
            // Substituir por um componente de notificação
            console.error('Erro no registro:', err.message);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-4/6">
                <Logo src="/login-background.png" fill priority />
            </div>
            <div className="w-2/6">
                <RegisterForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}