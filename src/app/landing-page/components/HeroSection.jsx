import Button from '@/app/components/Button';
import { Star } from '@mui/icons-material';
import Circle from './Circle';

export default function HeroSection({ onLogin }) {
    return (
        <section
            id="start"
            className="relative overflow-hidden flex flex-col justify-between bg-[#2549BE] w-full xl:min-h-screen pb-12 md:py-12 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24"
        >
            <Circle top={50} left={30} color="#FFC857" opacity={0.3} />
            <Circle top={120} right={60} color="#77CBB9" opacity={0.3} />
            <Circle top={300} left={100} color="#DBEDFB" opacity={0.2} />
            <Circle bottom={120} right={80} color="#96031A" opacity={0.25} />
            <Circle top={220} right={180} color="#1B1B1E" opacity={0.2} />
            <Circle bottom={60} left={60} color="#FFC857" opacity={0.2} />
            <Circle top={400} left={300} color="#77CBB9" opacity={0.25} />

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
