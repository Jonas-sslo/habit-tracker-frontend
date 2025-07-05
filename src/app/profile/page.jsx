'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Image from 'next/image';
import { AccountCircle } from '@mui/icons-material';
import Input from '../components/features/auth/Input';
import { getUser } from './actions';
import { useTheme } from 'next-themes';
import Layout from '../components/Layout';
import Divider from '../components/Divider';
import { getHomeBg } from '../utils/theme';

export default function Profile() {
    const { theme } = useTheme();
    const [userName, setUserName] = useState('Usuário');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const avatar = localStorage.getItem('avatar');
        if (avatar) setAvatar(avatar);
        const fetch = async () => {
            try {
                const data = await getUser();
                setUserName(data.name);
                setEmail(data.email);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error.message);
            }
        };
        fetch();
    }, []);

    if (!mounted) return null;

    return (
        <Layout>
            <div
                className={`${getHomeBg(theme)} flex flex-col md:flex-row h-auto min-h-screen overflow-x-hidden`}
            >
                <div className="flex-1">
                    <div className="py-6 text-center md:text-left p-4">
                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
                            Bem vindo ao seu perfil, {userName}
                        </h1>
                    </div>

                    <div className="w-full my-6">
                        <Divider className="h-0.5 bg-[#2549BE]" />
                    </div>

                    <div className="flex flex-col items-center mt-8">
                        <div className="w-full max-w-md px-4 sm:px-0">
                            <div className="flex justify-center mb-8">
                                {avatar ? (
                                    <Image
                                        src={avatar}
                                        alt="Avatar"
                                        width={300}
                                        height={300}
                                        className="rounded-full object-cover border-4 border-gray-200 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72"
                                    />
                                ) : (
                                    <AccountCircle className="text-gray-400 !w-48 !h-48 sm:!w-60 sm:!h-60 md:!w-72 md:!h-72" />
                                )}
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <Input label="Nome" value={userName} theme={theme} readOnly />
                                <Input label="Email" value={email} theme={theme} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
