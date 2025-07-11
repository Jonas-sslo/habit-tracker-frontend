'use client';

import Input from '../Input';
import Button from '../../../Button';
import Divider from '../../../Divider';
import Link from 'next/link';
import PasswordInput from '../PasswordInput';
import { getGray300Or600 } from '@/app/utils/theme';
import { useState } from 'react';
import { isFormValid, validateEmailField } from '@/app/utils/validators';
import Image from 'next/image';
import { getIcon } from '@/app/utils/theme';
import { useTheme } from 'next-themes';

export default function RegisterForm({ onSubmit, error, onClearError }) {
    const [emailError, setEmailError] = useState(null);
    const { theme } = useTheme();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        if (id === 'email') validateEmailField(value, setEmailError);
        if (error && onClearError) onClearError();
    };

    const isButtonDisabled = !isFormValid(formData, emailError) || error;

    return (
        <div className="flex flex-col justify-start w-full h-full p-6 md:p-24 lg:p-12">
            <form onSubmit={(e) => onSubmit(e, formData)} className="w-full">
                <div className="flex flex-row gap-2 mb-14 items-center">
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
                    Comece agora
                </h3>

                {error && <div className="mb-4 text-red-600">{error}</div>}

                <Input
                    id="name"
                    label="Nome"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nome"
                    theme={theme}
                    required
                />

                <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    theme={theme}
                    required
                />

                {emailError && <div className="mb-4 text-red-500 text-sm">{emailError}</div>}

                <PasswordInput
                    id="password"
                    label="Senha"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Senha"
                    theme={theme}
                    required
                />

                <Button
                    type="submit"
                    className="w-full rounded-md mt-4"
                    disabled={isButtonDisabled}
                >
                    Registrar
                </Button>
            </form>

            <Divider className="my-6" />

            <div className="flex flex-col justify-between items-center h-full text-center gap-2">
                <span className={`text-sm ${getGray300Or600(theme)}`}>
                    Já tem uma conta?{' '}
                    <Link
                        href="/login"
                        className={`${theme === 'dark' ? 'text-[#5A8BFF]' : 'text-[#2549BE]'}`}
                    >
                        Entre agora
                    </Link>
                </span>

                <span className={`mt-6 text-sm ${getGray300Or600(theme)}`}>© Constantia 2025</span>
            </div>
        </div>
    );
}
