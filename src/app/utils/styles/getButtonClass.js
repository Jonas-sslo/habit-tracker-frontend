export function getButtonClass({
    color = 'primary',
    variant = 'solid',
    size = 'md',
    disabled = false,
}) {
    const base =
        'font-medium rounded-full shadow-sm transition-all hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2549BE]';

    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg',
    };

    const colors = {
        primary: {
            solid: 'bg-[#2549BE] text-white hover:bg-[#1B1B1E] dark:bg-[#1E40AF] dark:hover:bg-[#1B1B1E]',
            outline:
                'border border-[#2549BE] text-[#2549BE] hover:bg-[#2549BE] hover:text-white dark:border-[#3B82F6] dark:text-[#3B82F6] dark:hover:bg-[#3B82F6] dark:hover:text-white',
            ghost: 'text-[#2549BE] hover:bg-[#2549BE]/10 dark:text-[#3B82F6] dark:hover:bg-[#3B82F6]/20',
            disabled:
                'bg-[#2549BE] text-white opacity-50 !cursor-not-allowed dark:bg-[#1E40AF] dark:text-gray-400',
        },
        secondary: {
            solid: 'bg-[#77CBB9] text-white hover:bg-[#60b1a0] dark:bg-[#2F855A] dark:hover:bg-[#276749]',
            outline:
                'border border-[#77CBB9] text-[#77CBB9] hover:bg-[#77CBB9] hover:text-white dark:border-[#38A169] dark:text-[#38A169] dark:hover:bg-[#38A169] dark:hover:text-white',
            ghost: 'text-[#77CBB9] hover:bg-[#77CBB9]/10 dark:text-[#38A169] dark:hover:bg-[#38A169]/20',
            disabled:
                'bg-[#77CBB9] text-white opacity-50 !cursor-not-allowed dark:bg-[#276749] dark:text-gray-400',
        },
        danger: {
            solid: 'bg-[#96031A] text-white hover:bg-red-800 dark:bg-[#9B2C2C] dark:hover:bg-red-900',
            outline:
                'border border-[#96031A] text-[#96031A] hover:bg-[#96031A] hover:text-white dark:border-[#E53E3E] dark:text-[#E53E3E] dark:hover:bg-[#E53E3E] dark:hover:text-white',
            ghost: 'text-[#96031A] hover:bg-[#96031A]/10 dark:text-[#E53E3E] dark:hover:bg-[#E53E3E]/20',
            disabled:
                'bg-[#96031A] text-white opacity-50 !cursor-not-allowed dark:bg-[#742A2A] dark:text-gray-400',
        },
        white: {
            solid: 'bg-white text-black hover:bg-gray-100',
            outline:
                'border border-white text-white hover:bg-white hover:text-black dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
            ghost: 'text-white hover:bg-white/10 dark:text-gray-300 dark:hover:bg-gray-700',
            disabled:
                'bg-white text-black opacity-50 !cursor-not-allowed dark:bg-gray-700 dark:text-gray-400',
        },
        gray: {
            solid: 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
            outline:
                'border border-gray-200 text-gray-800 hover:bg-gray-200 hover:text-black dark:border-gray-600 dark:text-white dark:hover:bg-gray-700',
            ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
            disabled:
                'bg-gray-300 text-black opacity-50 !cursor-not-allowed dark:bg-gray-700 dark:text-white',
        },
        black: {
            solid: 'bg-[#111827] text-white hover:bg-[#1F2937] dark:bg-[#111827] dark:hover:bg-[#1F2937]',
            outline:
                'border border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white dark:border-[#374151] dark:text-[#D1D5DB] dark:hover:bg-[#374151] dark:hover:text-white',
            ghost: 'text-[#111827] hover:bg-[#111827]/10 dark:text-[#D1D5DB] dark:hover:bg-[#374151]/20',
            disabled:
                'bg-[#111827] text-white opacity-50 !cursor-not-allowed dark:bg-[#1F2937] dark:text-gray-400',
        },
        yellow: {
            solid: 'bg-[#FFC857] text-white hover:brightness-110 hover:bg-[#FFC857]',
            outline:
                'border border-[#FFC857] text-[#FFC857] hover:bg-[#FFC857] hover:text-black hover:brightness-110',
            ghost: 'text-[#FFC857] hover:bg-[#FFC857]/10 hover:brightness-110',
            disabled: 'bg-[#FFC857] text-black opacity-50 !cursor-not-allowed',
        },
        red: {
            solid: 'bg-[#96031A] text-white hover:brightness-110 hover:bg-[#C12F40]',
            outline:
                'border border-[#96031A] text-[#96031A] hover:bg-[#C12F40] hover:text-black hover:brightness-110',
            ghost: 'text-[#96031A] hover:bg-[#96031A]/10 hover:brightness-110',
            disabled: 'bg-[#96031A] text-black opacity-50 !cursor-not-allowed',
        },
    };

    const selectedStyle = colors[color]?.[variant] || colors.primary.solid;
    const disabledStyle = colors[color]?.disabled || selectedStyle;

    return `${base} ${sizes[size]} ${disabled ? disabledStyle : selectedStyle}`;
}
