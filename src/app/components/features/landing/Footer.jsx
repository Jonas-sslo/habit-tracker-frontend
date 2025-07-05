import Image from 'next/image';
import { Instagram, LinkedIn } from '@mui/icons-material';

export default function Footer() {
    return (
        <div className="w-full h-auto px-8 md:px-16 xl:px-32 lg:px-24 mb-16">
            <div
                className="flex flex-col items-center justify-center rounded-[40px] 
                bg-[#1B1B1E] text-white light:bg-white light:text-black 
                px-6 sm:px-12 py-12 sm:py-16 gap-8 w-full"
            >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                    <Image
                        src="/logo-icon-white.png"
                        alt="logo"
                        width={64}
                        height={64}
                        className="object-contain light:hidden"
                    />
                    <Image
                        src="/logo-icon-black.png"
                        alt="logo"
                        width={64}
                        height={64}
                        className="object-contain hidden light:block"
                    />
                    <h1 className="text-3xl sm:text-4xl font-bold">Constantia</h1>
                </div>

                <p className="text-[#9CA3AF] light:text-[#4B5563] text-center sm:text-justify text-sm sm:text-lg md:text-xl max-w-3xl">
                    Mantenha controle sobre seus hábitos, estabeleça metas,
                    <br className="hidden sm:block" />
                    cheque seu histórico e transforme sua jornada.
                </p>

                <div className="flex gap-6 text-2xl text-[#9CA3AF] light:text-[#4B5563]">
                    <Instagram fontSize="inherit" />
                    <LinkedIn fontSize="inherit" />
                </div>

                <hr className="border-[#1F2937] light:border-[#D1D5DB] w-full" />

                <p className="text-[#6B7280] light:text-[#9CA3AF] text-xs sm:text-sm">
                    © 2025 Constantia
                </p>
            </div>
        </div>
    );
}
