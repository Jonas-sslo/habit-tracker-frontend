import { getWhiteOrGray700 } from '@/app/utils/theme';
import { useTheme } from 'next-themes';

export default function Select({ id, label, options, placeholder, theme, ...props }) {

    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className={`block text-sm font-medium mb-1 ${getWhiteOrGray700(theme)}`}
            >
                {label}
            </label>
            <select
                id={id}
                {...props}
                className="w-full bg-gray-100 border-gray-300 rounded-md px-3 py-3
                    shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2549BE] text-black"
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option, index) => (
                    <option key={index} value={option.value ?? option}>
                        {option.label ?? option}
                    </option>
                ))}
                ;
            </select>
        </div>
    );
}
