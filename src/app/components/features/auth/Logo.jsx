import Image from 'next/image';

export default function Logo({ src, ...props }) {
    return (
        <div className="relative w-full h-full">
            <Image src={src} alt="Logo" {...props} />
        </div>
    );
}
