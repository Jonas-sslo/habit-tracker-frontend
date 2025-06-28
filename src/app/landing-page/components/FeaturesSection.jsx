import FeatureCard from './FeatureCard';
import { FilterAltOutlined, ShowChart, BoltOutlined } from '@mui/icons-material';

export default function FeaturesSection() {
    return (
        <div
            className="flex flex-col w-full gap-6 mt-4 xl:mt-18 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 scroll-mt-20"
            id="functions"
        >
            <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between w-full py-10 gap-4">
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-center">
                    O que esperar
                </h1>
                <h6 className="hidden md:block text-sm md:text-base lg:text-lg xl:text-xl">
                    Manutenção de hábitos com facilidade.
                </h6>
            </div>
            <div className="flex flex-wrap justify-between w-full gap-12">
                <FeatureCard
                    icon={<FilterAltOutlined fontSize="large" />}
                    title="Filtre seus hábitos"
                    description="Identifique seus hábitos por meio de tags e filtros personalizados."
                />
                <FeatureCard
                    icon={<ShowChart fontSize="large" />}
                    title="Análise de progresso"
                    description="Veja seu crescimento através da sequência, gráficos e histórico."
                />
                <FeatureCard
                    icon={<BoltOutlined fontSize="large" />}
                    title="Rastreamento de sequência"
                    description="Construa hábitos fortes através da funcionalidade de acompanhamento de sequência."
                />
            </div>
        </div>
    );
}
