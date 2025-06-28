import { getWhiteOrGray600, getWhiteOrGray700 } from '@/app/utils/theme';
import { useTheme } from 'next-themes';

export default function Input({ id, label, type = 'text', text, showText, ...props }) {
    const { theme } = useTheme();
    
    return (
        <div className="mb-4">
            <label htmlFor={id} className={`block text-sm font-medium mb-1 ${getWhiteOrGray700(theme)}`}>
                {label}
            </label>
            {showText && text && <p className={`${getWhiteOrGray600(theme)} text-s mt-1`}>{text}</p>}
            <input
                id={id}
                type={type}
                {...props}
                className="w-full bg-gray-100 border-gray-300 rounded-md px-3 py-3 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2549BE]
                   placeholder-gray-400 placeholder-opacity-75 text-sm flex-grow dark:text-black"
            />
        </div>
    );
}
