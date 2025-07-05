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
    CloseRounded,
} from '@mui/icons-material';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar({ open = false, onClose }) {
    const router = useRouter();
    const pathname = usePathname();
    const [avatar, setAvatar] = useState(null);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(open);

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
                <div className={`flex flex-col items-center space-y-4`}>
                    <div
                        className={`flex justify-between items-center ${isOpen ? 'w-full' : ''} md:justify-end`}
                    >
                        {isOpen && (
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg border-2 border-transparent hover:border-white hover:bg-white/10 md:hidden transition-colors"
                                aria-label="Fechar menu"
                            >
                                <CloseRounded />
                            </button>
                        )}

                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg border-2 border-transparent hover:border-white hover:bg-white/10 transition-colors"
                        >
                            {isOpen ? <ArrowBackRounded /> : <ArrowForwardRounded />}
                        </button>
                    </div>

                    <div
                        className={
                            'flex p-2 rounded-lg w-full justify-center items-center hover:bg-[#1a3a9a] gap-2 transition-all duration-300 ease-in-out'
                        }
                    >
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

                    <SidebarButton
                        icon={<HomeOutlined />}
                        text="Início"
                        isOpen={isOpen}
                        onClick={onHome}
                        path="/home"
                        active={pathname === '/home'}
                    />
                    <SidebarButton
                        icon={<ShowChart />}
                        text="Estatísticas"
                        isOpen={isOpen}
                        onClick={onStatistics}
                        path="/statistics"
                        active={pathname === '/statistics'}
                    />
                </div>

                <div
                    className={`flex flex-col ${isOpen ? 'items-start' : 'items-center'} space-y-4`}
                >
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
                        path="/profile"
                        active={pathname === '/profile'}
                    />
                    <SidebarButton
                        icon={theme === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
                        text="Tema"
                        isOpen={isOpen}
                        onClick={toggleTheme}
                    />
                    <SidebarButton
                        icon={<ExitToApp />}
                        text="Sair"
                        isOpen={isOpen}
                        onClick={onLogout}
                    />
                </div>
            </div>
        </>
    );
}

function SidebarButton({ icon, text, isOpen, onClick, active }) {
    const baseStyle =
        'flex items-center space-x-3 p-2 rounded-xl border-2 w-full transition-colors';
    const activeStyle = 'bg-white/10 border-white';
    const hoverStyle = 'hover:bg-white/10 hover:border-white border-transparent';

    return (
        <button onClick={onClick} className={`${baseStyle} ${active ? activeStyle : hoverStyle}`}>
            <div className="min-w-[36px] flex justify-center">{icon}</div>
            {isOpen && <span className="text-sm">{text}</span>}
        </button>
    );
}
