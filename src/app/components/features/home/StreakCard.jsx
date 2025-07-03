import { getGray300Or600, getShadow, getBg } from '@/app/utils/theme';

export default function StreakCard({ activeStreak, theme }) {
    return (
        <div
            className={`${getBg(theme)} ${getShadow(theme)} flex items-center rounded-3xl px-6 py-10`}
        >
            <span className="text-7xl md:text-8xl">🔥</span>
            <div className="flex flex-col h-full justify-between">
                <p className={`${getGray300Or600(theme)}`}>Sequência ativa</p>
                <h2 className="text-2xl font-bold text-orange-600">
                    {activeStreak} {activeStreak === 1 ? 'dia' : 'dias'}
                </h2>
                <p className={`${getGray300Or600(theme)}`}>Continue com o bom trabalho!</p>
            </div>
        </div>
    );
}
