'use client';

import { useRouter } from 'next/navigation';
import { handleRegister } from './actions';
import RegisterForm from '../../components/features/auth/register/RegisterForm';
import Logo from '../../components/features/auth/Logo';
import { useState } from 'react';

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        try {
            const data = await handleRegister(formData);
            console.log('Registro realizado:', data);
            router.push('/login');
        } catch (err) {
            console.error('Erro no registro:', err.message);
            err.response?.status === 400 
                ? setError("Este usuário já existe!")
                : setError("Ocorreu um erro durante o registro!");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-4/6 bg-[#2549BE]">
                <Logo src="/logo-white.png" fill priority />
            </div>
            <div className="w-2/6">
                <RegisterForm 
                    onSubmit={handleSubmit}
                    error={error}
                    onClearError={() => setError(null)} 
                />
            </div>
        </div>
    )
}