import { getGray300Or600, getWhiteOrGray700 } from "@/app/utils/theme";

export default function Input({ id, label, type = 'text', text, showText, theme, ...props }) {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className={`${getWhiteOrGray700(theme)} block text-sm font-medium mb-1`}
            >
                {label}
            </label>

            {showText && text && (
                <p className={`${getGray300Or600(theme)} text-sm mt-1`}>{text}</p>
            )}

            <input
                id={id}
                type={type}
                {...props}
                className="w-full bg-gray-100 border border-gray-300 
                   rounded-md px-3 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2549BE]
                   placeholder-gray-400 text-sm text-gray-900"
            />
        </div>
    );
}
