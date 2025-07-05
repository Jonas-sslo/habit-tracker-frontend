'use client';

import { useState, useEffect } from 'react';
import { MenuOutlined } from '@mui/icons-material';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="flex flex-col md:flex-row h-screen relative overflow-x-hidden">
            <div className="bg-[#2549BE] flex items-center justify-between md:hidden px-4 py-3 border-b border-[#2549BE]">
                <div className="text-white text-xl font-bold">Constantia</div>
                <button onClick={() => setIsMobileMenuOpen(true)}>
                    <MenuOutlined className="text-white" />
                </button>
            </div>

            <div className="hidden md:block w-14 md:w-20 shrink-0">
                <Sidebar />
            </div>

            <div className="flex-1 overflow-y-auto">{children}</div>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className="flex-1 bg-black bg-opacity-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <Sidebar open={true} onClose={() => setIsMobileMenuOpen(false)} />
                </div>
            )}
        </div>
    );
}
