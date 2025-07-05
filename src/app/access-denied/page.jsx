'use client';

import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import Circle from '../components/features/landing/Circle';

export default function AccessDenied() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#2549BE] px-6 py-10 text-center">
            <Circle top={50} left={30} color="#FFC857" opacity={0.3} />
            <Circle top={120} right={60} color="#77CBB9" opacity={0.3} />
            <Circle top={300} left={100} color="#DBEDFB" opacity={0.2} />
            <Circle bottom={120} right={80} color="#96031A" opacity={0.25} />
            <Circle top={220} right={180} color="#1B1B1E" opacity={0.2} />
            <Circle bottom={60} left={60} color="#FFC857" opacity={0.2} />
            <Circle top={400} left={300} color="#77CBB9" opacity={0.25} />

            <div className="max-w-xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
                    Ops... parece que você se perdeu
                </h1>
                <p className="text-white text-base sm:text-lg mb-8">
                    Você precisa estar logado para acessar esta página.
                </p>
                <Button
                    onClick={handleRedirect}
                    color="white"
                    className="px-5 py-3 text-sm sm:text-base"
                >
                    Ir para a página de login
                </Button>
            </div>
        </div>
    );
}
