'use client';

import { useRouter } from 'next/navigation';
import { handleLogin } from './actions';
import AuthForm from '../../components/features/auth/login/AuthForm';
import Logo from '../../components/features/auth/Logo';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { getLogo } from '@/app/utils/theme';

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    
    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        try {
            const data = await handleLogin(formData);
            console.log('Login realizado: ', data);
            router.push('/home');
        } catch (err) {
            console.error('Erro no login: ', err.message);
            err.response?.status === 401
                ? setError('Email ou senha inválidos!')
                : setError('Ocorreu um erro durante o login!');
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-4/6 bg-[#2549BE]">
                <Logo src={getLogo(theme)} fill priority />
            </div>
            <div className="w-2/6">
                <AuthForm
                    onSubmit={handleSubmit}
                    error={error}
                    onClearError={() => setError(null)}
                />
            </div>
        </div>
    );
}
