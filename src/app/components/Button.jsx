import { getButtonClass } from '@/app/utils/styles/getButtonClass';

export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'solid',
    color = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) {
    const classNameComputed = getButtonClass({ color, variant, size, disabled });

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
            className={`${classNameComputed} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
