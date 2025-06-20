export default function Input({ id, label, type = 'text', ...props }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={id}
                type={type}
                {...props}
                className="w-full bg-gray-100 border-gray-300 rounded-md px-3 py-3 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2549BE]
                   placeholder-gray-400 placeholder-opacity-75 text-sm flex-grow"
            />
        </div>
    );
}
