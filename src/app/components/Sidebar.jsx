'use client';

import {
    AccountCircleOutlined,
    DarkModeOutlined,
    ExitToApp,
    HomeOutlined,
    LightModeOutlined,
    ShowChart,
    ArrowForwardRounded,
    ArrowBackRounded,
} from '@mui/icons-material';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const router = useRouter();
    const [avatar, setAvatar] = useState(null);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    const onHome = () => router.push('/home');
    const onStatistics = () => router.push('/statistics');
    const onProfile = () => router.push('/profile');
    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('avatar');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        router.push('/login');
    };

    useEffect(() => {
        setMounted(true);
        const avatar = localStorage.getItem('avatar');
        if (avatar) setAvatar(avatar);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (!mounted) return null;

    return (
        <>
            <div
                className={`fixed top-0 left-0 h-full bg-[#2549BE] text-white py-4 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out ${
                    isOpen ? 'w-42 px-4' : 'w-20 px-2 items-center'
                }`}
            >
                <div
                    className={`flex flex-col ${isOpen ? 'items-end' : 'items-center'} space-y-4`}
                >
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-[#1a3a9a]"
                    >
                        {isOpen ? <ArrowBackRounded /> : <ArrowForwardRounded />}
                    </button>

                    <div className={'flex p-2 rounded-lg w-full justify-center items-center hover:bg-[#1a3a9a] gap-2 transition-all duration-300 ease-in-out'}>
                        <Image
                            src="/logo-icon-white.png"
                            alt="Constantia Logo"
                            width={40}
                            height={40}
                            style={{ objectFit: 'contain' }}
                        />
                        {isOpen && <span className="text-lg font-semibold">Constantia</span>}
                    </div>

                    <hr className={'w-full border-t'} />

                    <SidebarButton icon={<HomeOutlined />} text="Início" isOpen={isOpen} onClick={onHome} />
                    <SidebarButton icon={<ShowChart />} text="Estatísticas" isOpen={isOpen} onClick={onStatistics} />
                </div>

                <div className={`flex flex-col ${isOpen ? 'items-start' : 'items-center'} space-y-4`}>
                    <SidebarButton
                        icon={
                            avatar ? (
                                <Image
                                    src={avatar}
                                    alt="Avatar"
                                    width={36}
                                    height={36}
                                    className="rounded-full"
                                />
                            ) : (
                                <AccountCircleOutlined style={{ width: 36, height: 36 }} />
                            )
                        }
                        text="Perfil"
                        isOpen={isOpen}
                        onClick={onProfile}
                    />
                    <SidebarButton
                        icon={theme === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
                        text="Tema"
                        isOpen={isOpen}
                        onClick={toggleTheme}
                    />
                    <SidebarButton icon={<ExitToApp />} text="Sair" isOpen={isOpen} onClick={onLogout} />
                </div>
            </div>
        </>
    );
}

function SidebarButton({ icon, text, isOpen, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#1a3a9a] w-full"
        >
            <div className="min-w-[36px] flex justify-center">{icon}</div>
            {isOpen && <span className="text-sm">{text}</span>}
        </button>
    );
}