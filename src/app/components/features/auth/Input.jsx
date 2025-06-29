'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Input({ id, label, type = 'text', text, showText, ...props }) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 text-gray-700 dark:text-white"
      >
        {label}
      </label>

      {showText && text && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{text}</p>
      )}

      <input
        id={id}
        type={type}
        {...props}
        className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                   rounded-md px-3 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2549BE]
                   placeholder-gray-400 dark:placeholder-gray-500 text-sm text-gray-900 dark:text-white"
      />
    </div>
  );
}