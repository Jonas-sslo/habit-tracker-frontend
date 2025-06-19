export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'solid',
    color = 'primary',
    size = 'md',
    className = '',
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
            solid: 'bg-[#2549BE] text-white hover:bg-[#1B1B1E]',
            outline: 'border border-[#2549BE] text-[#2549BE] hover:bg-[#2549BE] hover:text-white',
            ghost: 'text-[#2549BE] hover:bg-[#2549BE]/10',
        },
        secondary: {
            solid: 'bg-[#77CBB9] text-white hover:bg-[#60b1a0]',
            outline: 'border border-[#77CBB9] text-[#77CBB9] hover:bg-[#77CBB9] hover:text-white',
            ghost: 'text-[#77CBB9] hover:bg-[#77CBB9]/10',
        },
        danger: {
            solid: 'bg-[#96031A] text-white hover:bg-red-800',
            outline: 'border border-[#96031A] text-[#96031A] hover:bg-[#96031A] hover:text-white',
            ghost: 'text-[#96031A] hover:bg-[#96031A]/10',
        },
    };

    const selectedStyle = colors[color]?.[variant] || colors.primary.solid;

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${base} ${sizes[size]} ${selectedStyle} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
