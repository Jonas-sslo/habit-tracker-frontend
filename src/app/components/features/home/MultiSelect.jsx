'use client';

import { getWhiteOrGray700 } from '@/app/utils/theme';
import { useEffect, useRef, useState } from 'react';

export function MultiSelect({ id, label, placeholder, options, value, onChange, theme }) {
    const [selected, setSelected] = useState(value || []);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const toggleOption = (selectedValue) => {
        const newSelected = selected.includes(selectedValue)
            ? selected.filter((v) => v !== selectedValue)
            : [...selected, selectedValue];
        setSelected(newSelected);
        onChange(newSelected);
    };

    useEffect(() => {
        setSelected(value || []);
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [value]);

    return (
        <div className="relative mb-4" ref={ref}>
            <label
                htmlFor={id}
                className={`block text-sm font-medium mb-1 ${getWhiteOrGray700(theme)}`}
            >
                {label}
            </label>

            <div
                className={`w-full rounded-md px-3 py-3 shadow-xs cursor-pointer flex flex-wrap gap-1 border focus:outline-none focus:ring-2 focus:ring-[#2549BE] ${
                    theme === 'dark'
                        ? 'bg-gray-800 border-gray-600 text-gray-100'
                        : 'bg-gray-100 border-gray-300 text-black'
                }`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selected.length === 0 && (
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                        {placeholder}
                    </span>
                )}

                {selected.map((val) => (
                    <span
                        key={val}
                        className={`px-2 py-1 rounded-md text-sm ${
                            theme === 'dark'
                                ? 'bg-blue-900 text-blue-200'
                                : 'bg-blue-100 text-blue-800'
                        }`}
                    >
                        {options.find((o) => o.value === val)?.label}
                    </span>
                ))}
            </div>

            {isOpen && (
                <div
                    className={`absolute z-10 w-full mt-1 rounded-md max-h-60 overflow-y-auto border ${
                        theme === 'dark'
                            ? 'bg-gray-800 border-gray-600 text-gray-100'
                            : 'bg-white border-gray-300 text-black'
                    }`}
                >
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`px-3 py-2 cursor-pointer flex items-center hover:bg-gray-100 ${
                                theme === 'dark' ? 'dark:hover:bg-gray-700' : ''
                            } ${
                                selected.includes(option.value)
                                    ? theme === 'dark'
                                        ? 'bg-blue-900'
                                        : 'bg-blue-100'
                                    : ''
                            }`}
                            onClick={() => toggleOption(option.value)}
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(option.value)}
                                readOnly
                                className="mr-2"
                            />
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
