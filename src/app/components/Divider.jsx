export default function Divider({ color = '#E0E0E0', className = '' }) {
    return (
        <div className={`flex items-center my-4 ${className}`}>
            <hr className="flex-grow h-px border-none" style={{ backgroundColor: color }} />
        </div>
    );
}
