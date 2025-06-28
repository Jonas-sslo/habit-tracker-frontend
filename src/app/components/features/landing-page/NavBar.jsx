'use client'

import React from "react";
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const imageStyle = {
        objectFit: 'cover'
    };

    const router = useRouter();

    const goToLogin = () => {
        router.push('/login');
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <>
            <div className="w-full h-20 top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <div className="relative w-60 h-full">
                            <Image src="/logo-white.png"
                            alt = "logo"
                            fill
                            style = {imageStyle}
                            />
                        </div>
                        <ul className="hidden md:flex gap-x-6 text-white">
                            <li>
                                <button className="cursor-pointer" onClick={() => scrollToSection('start')}>
                                    <p>Início</p>
                                </button>
                            </li>
                            <li>
                                <button className="cursor-pointer" onClick={() => scrollToSection('functions')}>
                                    <p>Funcionalidades</p>
                                </button>
                            </li>
                            <li>
                                <button className="cursor-pointer" onClick={() => scrollToSection('start-now')}>
                                    <p>Comece Agora</p>
                                </button>
                            </li>
                        </ul>
                        <button className="rounded-xl bg-white w-18 cursor-pointer dark:text-black text-xs font-bold p-1" onClick={goToLogin}>
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};