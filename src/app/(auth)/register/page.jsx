'use client';

import RegisterForm from '../../components/features/auth/register/RegisterForm';
import Logo from '../../components/features/auth/Logo';

export default function Register() {
    const handleSubmit = (e, formData) => {
        e.preventDefault();
        console.log("Cadastro realizado com sucesso!");
        console.log("Dados do formulário:", formData);
        // TODO
        // consumir api
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