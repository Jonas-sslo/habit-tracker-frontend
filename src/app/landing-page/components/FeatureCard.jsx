export default function FeatureCard({ icon, title, description }) {
    return (
        <div className="flex flex-col flex-grow flex-shrink justify-start rounded-[40px] bg-[#77CBB9] w-100 h-auto p-16 xl:p-12 gap-4">
            {icon}
            <h1 className="font-bold text-xl text-gray-900">{title}</h1>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
