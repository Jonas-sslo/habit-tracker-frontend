'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../../Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function NavBar() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const goToLogin = () => {
        router.push('/login');
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
        }
    };

    return (
        <div className="fixed top-0 w-full bg-[#2549BE] z-50">
            <div
                className="flex items-center justify-between 
                w-full max-w-screen-4xl 
                h-20 
                pr-4 pl-2 sm:pr-6 sm:pl-4 md:pr-12 md:pl-8 lg:pr-24 lg:pl-18 xl:pl-24 xl:pr-32 
                mx-auto"
            >
                <div className="relative w-32 sm:w-44 md:w-52 h-12 md:h-16">
                    <Image src="/logo-white.png" alt="logo" fill style={{ objectFit: 'cover' }} />
                </div>
                <ul className="hidden md:flex gap-x-6 text-white">
                    <li>
                        <button
                            onClick={() => scrollToSection('start')}
                            className="text-sm lg:text-md xl:text-lg cursor-pointer"
                        >
                            Início
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => scrollToSection('functions')}
                            className="text-sm lg:text-md xl:text-lg cursor-pointer"
                        >
                            Funcionalidades
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => scrollToSection('start-now')}
                            className="text-sm lg:text-md xl:text-lg cursor-pointer"
                        >
                            Comece agora
                        </button>
                    </li>
                </ul>
                <div className="flex items-center gap-4">
                    <Button
                        color="white"
                        className="text-sm sm:text-base px-6 sm:px-8"
                        onClick={goToLogin}
                    >
                        Entrar
                    </Button>
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                            {menuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            {menuOpen && (
                <>
                    <div className="md:hidden border-t border-[#D9D9D9] mx-4" />
                    <div className="md:hidden bg-[#2549BE] px-8 py-4 flex flex-col items-end gap-4 text-white text-sm">
                        <button onClick={() => scrollToSection('start')}>Início</button>
                        <button onClick={() => scrollToSection('functions')}>
                            Funcionalidades
                        </button>
                        <button onClick={() => scrollToSection('start-now')}>Comece agora</button>
                    </div>
                </>
            )}
        </div>
    );
}
