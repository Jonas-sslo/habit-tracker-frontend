import { getGray300Or600, getShadow } from '@/app/utils/theme';

export default function StreakCard({ activeStreak, theme }) {
    return (
        <div className={`${getShadow(theme)} rounded-lg p-4 mb-6`}>
            <div className="flex items-center gap-4">
                <span className="text-4xl">🔥</span>
                <div>
                    <p className={`${getGray300Or600(theme)}`}>Sequência ativa</p>
                    <h2 className="text-2xl font-bold text-orange-600">
                        {activeStreak} {activeStreak === 1 ? 'dia' : 'dias'}
                    </h2>
                    <p className={`${getGray300Or600(theme)}`}>Continue com o bom trabalho!</p>
                </div>
            </div>
        </div>
    );
}
