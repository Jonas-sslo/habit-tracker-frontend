'use client';

import { getWhiteOrGray700 } from "@/app/utils/theme";
import { useEffect, useRef, useState } from "react";

export function MultiSelect({ id, label, placeholder, options, value, onChange, theme }) {
    const [selected, setSelected] = useState(value || []);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const toggleOption = (selectedValue) => {
      const newSelected = selected.includes(selectedValue)
        ? selected.filter(v => v !== selectedValue)
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
            <label htmlFor={id} className={`block text-sm font-medium mb-1 ${getWhiteOrGray700(theme)}`}>
                {label}
            </label>
            <div 
                className={`w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-3
                    shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2549BE]
                    flex flex-wrap gap-1`}
                onClick={() => setIsOpen(prev => !prev)}
            >
                {selected.length === 0 && (
                    <span className="text-gray-400">{placeholder}</span>
                )}
                {selected.map(val => (
                    <span key={val} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                        {options.find(o => o.value === val).label}
                    </span>
                ))}
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md">
                    <div className="max-h-60 overflow-y-auto">
                        {options.map(option => (
                        <div 
                            key={option.value}
                            className={`px-3 py-2 hover:bg-gray-100 text-black
                                ${selected.includes(option.value) ? 'bg-blue-100' : ''}`}
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
                </div>
            )}
        </div>
    );
}
