'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

{ /* TODO: Ajustar problema de modo escuro */ }
export default function Switch({
    id = 'rememberMe',
    label = 'Manter conectado',
    checked = false,
    onChange,
}) {
    const { theme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const toggleSwitch = () => {
        onChange?.({
            target: {
                id,
                type: 'checkbox',
                checked: !checked,
            },
        });
    };

    return (
        <div className="flex items-center space-x-3 mb-8">
            <button
                onClick={toggleSwitch}
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                    checked ? 'bg-[#2549BE]' : 'bg-gray-300'
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        checked ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
            <label htmlFor={id} className="text-sm font-medium text-gray-700 ">
                {label}
            </label>
        </div>
    );
}
