'use client';

import { getWhiteOrGray700 } from '@/app/utils/theme';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function Switch({ label = 'Manter conectado', defaultChecked = false, onChange }) {
    const [enabled, setEnabled] = useState(defaultChecked);
    const { theme } = useTheme();

    const toggleSwitch = () => {
        const newValue = !enabled;
        setEnabled(newValue);
        onChange?.(newValue);
    };

    return (
        <div className="flex items-center space-x-3 mb-8">
            <button
                onClick={toggleSwitch}
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                    enabled ? 'bg-[#2549BE]' : 'bg-gray-300'
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
            <label className={`text-sm font-medium ${getWhiteOrGray700(theme)}`}>{label}</label>
        </div>
    );
}
