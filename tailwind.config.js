/** @type {import('tailwindcss').Config} */
export default {
    content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2549BE',
                    dark: '#1B1B1E',
                },
                secondary: {
                    DEFAULT: '#77CBB9',
                    dark: '#60B1A0',
                },
                danger: {
                    DEFAULT: '#96031A',
                    dark: '#C70522',
                },
            },
        },
    },
    safelist: [
        'bg-[#2549BE]',
        'hover:bg-[#1B1B1E]',
        'text-white',
        'bg-[#77CBB9]',
        'hover:bg-[#60b1a0]',
        'text-[#77CBB9]',
        'bg-[#96031A]',
        'hover:bg-red-800',
        'text-[#96031A]',
        'border',
        'border-[#2549BE]',
        'border-[#77CBB9]',
        'border-[#96031A]',
        'hover:text-white',
    ],
    plugins: [],
};
