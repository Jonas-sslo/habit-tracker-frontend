import Button from '@/app/components/Button';
import Image from 'next/image';

export default function CallToAction({ onLogin }) {
    return (
        <section
            id="start-now"
            className="w-full h-auto px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20"
        >
            <div className="flex flex-col gap-12 w-full bg-[#DBEDFB] rounded-[40px] p-8 sm:p-10 md:p-12 lg:p-24">
                <div className="hidden md:flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="w-32 h-32 flex-shrink-0">
                        <Image
                            src="/logo-icon-black.png"
                            alt="logo"
                            width={128}
                            height={128}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full">
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-6xl xl:text-8xl font-semibold text-gray-900 text-balance text-center md:text-left">
                            Pronto para estabelecer hábitos?
                        </h1>
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-10 pt-4 items-center md:items-end text-center md:text-end">
                        <p className="w-full sm:w-11/12 md:w-3/4 text-sm sm:text-base md:text-lg lg:text-xl text-[#111827] leading-relaxed max-w-prose">
                            Transforme seus dias com hábitos que fazem a diferença. Com o
                            Constantia, você desenvolve consistência, foca no que realmente importa
                            e evolui continuamente. Um pequeno passo por vez, rumo à sua melhor
                            versão.
                        </p>
                        <Button
                            onClick={onLogin}
                            className="bg-[#FFC857] px-8 sm:px-10 md:px-12 py-4 sm:py-5 transition hover:brightness-110 hover:bg-[#FFC857]"
                        >
                            <p className="font-semibold text-base sm:text-lg">Comece agora</p>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
