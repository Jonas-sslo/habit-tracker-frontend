'use client';

import Input from '../Input';
import Button from '../../../Button';
import Switch from './Switch';
import Divider from '../../../Divider';
import { loginWithGoogleToken } from '@/services/auth';
import { GoogleLogin } from '@react-oauth/google';
import PasswordInput from '../PasswordInput';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { isFormValid, validateEmailField } from '@/app/utils/validators';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { getIcon, getGoogleButtonTheme, getGray300Or600 } from '@/app/utils/theme';

export default function AuthForm({ onSubmit, error, onClearError }) {
    const [emailError, setEmailError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const { theme } = useTheme();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));

        if (id === 'email') validateEmailField(value, setEmailError);
        if (error && onClearError) onClearError();
    };

    const handleGoogleLogin = async (credentialResponse) => {
        const token = credentialResponse?.credential;

        if (!token) throw new Error('Token do Google inválido');

        const data = await loginWithGoogleToken(token);

        if (!data?.token) throw new Error('Token não recebido do Google');

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.name));
        localStorage.setItem('avatar', data.avatar || '');
        localStorage.setItem('userId', data.userId);

        router.push('/home');
    };

    const handleGoogleLoginError = () => {
        console.error('Falha no login com o Google');
    };

    const isButtonDisabled = !isFormValid(formData, emailError) || error;

    return (
        <div className="flex flex-col justify-start w-full h-full p-6 md:p-24 lg:p-12">
            <form onSubmit={(e) => onSubmit(e, formData)} className="w-full">
                <div className="flex flex-row gap-2 mb-14">
                    <Image
                        src={getIcon(theme)}
                        alt="Logo Constantia"
                        style={{ objectFit: 'contain' }}
                        width={35}
                        height={35}
                    />
                    <h2
                        className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    >
                        Constantia
                    </h2>
                </div>

                <h3
                    className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                >
                    É bom te ver de novo
                </h3>

                {error && (
                    <div
                        className={`mb-4 text-sm ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`}
                    >
                        {error}
                    </div>
                )}

                <Input
                    id="email"
                    label="Login"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Insira o email"
                    theme={theme}
                    required
                />

                {emailError && (
                    <div
                        className={`mb-4 text-sm ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`}
                    >
                        {emailError}
                    </div>
                )}

                <PasswordInput
                    id="password"
                    label="Senha"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Insira a senha"
                    theme={theme}
                    required
                />

                <Switch
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    theme={theme}
                />

                <Button type="submit" className="w-full rounded-md" disabled={isButtonDisabled}>
                    Entrar
                </Button>
            </form>

            <Divider />

            <GoogleLogin
                theme={getGoogleButtonTheme(theme)}
                logo_alignment="center"
                onSuccess={handleGoogleLogin}
                onError={handleGoogleLoginError}
            />

            <div className="flex flex-col justify-between items-center h-full mt-6">
                <span className={`${getGray300Or600(theme)} text-sm`}>
                    Não tem uma conta?{' '}
                    <Link
                        href="/register"
                        className={`${theme === 'dark' ? 'text-[#5A8BFF]' : 'text-[#2549BE]'}`}
                    >
                        Registre-se agora
                    </Link>
                </span>

                <span className={`${getGray300Or600(theme)} mt-8 text-sm`}>© Constantia 2025</span>
            </div>
        </div>
    );
}
