'use client';

import AuthForm from '../../components/features/auth/login/AuthForm';
import Logo from '../../components/features/auth/login/Logo';

export default function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulário enviado (mock)');
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
