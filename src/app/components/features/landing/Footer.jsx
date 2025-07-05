'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Instagram, LinkedIn } from '@mui/icons-material';
import { useTheme } from 'next-themes';

export default function Footer() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === 'dark';

    return (
        <div className="w-full h-auto px-8 md:px-16 xl:px-32 lg:px-24 mb-16">
            <div
                className={`flex flex-col items-center justify-center rounded-[40px] 
                px-6 sm:px-12 py-12 sm:py-16 gap-8 w-full
                ${isDark ? 'bg-white text-black' : 'bg-[#1B1B1E] text-white'}`}
            >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                    <Image
                        src={isDark ? '/logo-icon-black.png' : '/logo-icon-white.png'}
                        alt="logo"
                        width={64}
                        height={64}
                        className="object-contain"
                    />
                    <h1 className="text-3xl sm:text-4xl font-bold">Constantia</h1>
                </div>

                <p className={`${isDark ? 'text-[#4B5563]' : 'text-[#9CA3AF]'} text-center sm:text-justify text-sm sm:text-lg md:text-xl max-w-3xl`}>
                    Mantenha controle sobre seus hábitos, estabeleça metas,
                    <br className="hidden sm:block" />
                    cheque seu histórico e transforme sua jornada.
                </p>

                <div className={`flex gap-6 text-2xl ${isDark ? 'text-[#4B5563]' : 'text-[#9CA3AF]'}`}>
                    <Instagram fontSize="inherit" />
                    <LinkedIn fontSize="inherit" />
                </div>

                <hr className={`w-full ${isDark ? 'border-[#D1D5DB]' : 'border-[#1F2937]'}`} />

                <p className={`${isDark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'} text-xs sm:text-sm`}>
                    © 2025 Constantia
                </p>
            </div>
        </div>
    );
}