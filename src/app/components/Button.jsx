export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'solid',
    color = 'primary',
    size = 'md',
    className = '',
    disabled=false,
    ...props
}) {
    const base = 'font-medium rounded-md shadow-sm transition-all focus:outline-none';

    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg',
    };

    const colors = {
        primary: {
            solid: 'bg-[#2549BE] text-white hover:bg-[#1B1B1E] cursor-pointer',
            outline: 'border border-[#2549BE] text-[#2549BE] hover:bg-[#2549BE] hover:text-white cursor-pointer',
            ghost: 'text-[#2549BE] hover:bg-[#2549BE]/10',
            disabled: 'bg-[#2549BE] text-white opacity-50 cursor-not-allowed'
        },
        secondary: {
            solid: 'bg-[#77CBB9] text-white hover:bg-[#60b1a0] cursor-pointer',
            outline: 'border border-[#77CBB9] text-[#77CBB9] hover:bg-[#77CBB9] hover:text-white cursor-pointer',
            ghost: 'text-[#77CBB9] hover:bg-[#77CBB9]/10',
            disabled: 'bg-[#2549BE] text-white opacity-50 cursor-not-allowed'
        },
        danger: {
            solid: 'bg-[#96031A] text-white hover:bg-red-800 cursor-pointer',
            outline: 'border border-[#96031A] text-[#96031A] hover:bg-[#96031A] hover:text-white cursor-pointer',
            ghost: 'text-[#96031A] hover:bg-[#96031A]/10',
            disabled: 'bg-[#2549BE] text-white opacity-50 cursor-not-allowed'
        },
    };

    const selectedStyle = colors[color]?.[variant] || colors.primary.solid;
    const disabledStyle = colors.primary.disabled || colors[color]?.[variant];

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${sizes[size]} 
                ${disabled ? disabledStyle : selectedStyle} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
