import Button from '@/app/components/Button';
import { Star } from '@mui/icons-material';

export default function HeroSection({ onLogin }) {
    return (
        <section
            id="start"
            className="relative overflow-hidden flex flex-col justify-between bg-[#2549BE] w-full xl:min-h-screen pb-12 md:py-12 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24"
        >
            {/* Bolas decorativas (visíveis só em telas maiores que md) */}
            <div className="hidden md:block absolute top-[50px] left-[30px] w-16 h-16 md:w-20 md:h-20 bg-[#FFC857] rounded-full opacity-30 z-0" />
            <div className="hidden md:block absolute top-[120px] right-[60px] w-24 h-24 bg-[#77CBB9] rounded-full opacity-30 z-0" />
            <div className="hidden md:block absolute top-[300px] left-[100px] w-16 h-16 md:w-20 md:h-20 bg-[#DBEDFB] rounded-full opacity-20 z-0" />
            <div className="hidden md:block absolute bottom-[120px] right-[80px] w-16 h-16 md:w-20 md:h-20 bg-[#96031A] rounded-full opacity-25 z-0" />
            <div className="hidden md:block absolute top-[220px] right-[180px] w-14 h-14 md:w-16 md:h-16 bg-[#1B1B1E] rounded-full opacity-20 z-0" />
            <div className="hidden md:block absolute bottom-[60px] left-[60px] w-20 h-20 bg-[#FFC857] rounded-full opacity-20 z-0" />
            <div className="hidden md:block absolute top-[400px] left-[300px] w-16 h-16 md:w-20 md:h-20 bg-[#77CBB9] rounded-full opacity-25 z-0" />

            {/* Conteúdo principal */}
            <div className="relative z-10 flex flex-col w-full max-w-screen-xl mx-auto gap-8 mt-20 xl:my-auto items-center text-center text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-balance">
                    Comece a adquirir
                    <br />
                    hábitos em seu tempo.
                </h1>

                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl text-balance">
                    Mantenha controle sobre seus hábitos, estabeleça metas,
                    <br className="hidden sm:block" />
                    cheque seu histórico e transforme sua jornada.
                </h2>

                <Button
                    color="white"
                    onClick={onLogin}
                    className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base"
                >
                    Comece Agora
                </Button>
            </div>

            <div className="hidden md:flex justify-center mt-12 z-10">
                <Button
                    onClick={onLogin}
                    className="bg-[#111827] text-white px-4 sm:px-6 py-2 text-xs sm:text-sm flex items-center gap-1"
                >
                    <Star htmlColor="#FBBF24" fontSize="small" />
                    Experimente a Mudança
                </Button>
            </div>
        </section>
    );
}
