import { getWhiteOrGray700 } from '@/app/utils/theme';

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
                className={`w-full rounded-md px-3 py-3 shadow-xs border focus:outline-none focus:ring-2 focus:ring-[#2549BE] text-sm ${
                    theme === 'dark'
                        ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500'
                        : 'bg-gray-100 border-gray-300 text-black placeholder-gray-400'
                }`}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option, index) => (
                    <option key={index} value={option.value ?? option}>
                        {option.label ?? option}
                    </option>
                ))}
            </select>
        </div>
    );
}
