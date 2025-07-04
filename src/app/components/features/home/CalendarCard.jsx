import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getGray300OrLightGray, getShadow } from '@/app/utils/theme';
import { isSameDay, parseISO } from 'date-fns';

export default function CalendarCard({ calendarValue, setCalendarValue, habits, theme }) {
    return (
        <div className={'flex flex-col w-full items-center p-4 gap-4'}>
            <h3 className={`${getGray300OrLightGray(theme)} text-xl text-center font-semibold`}>
                Seu compromisso de constância
            </h3>
            <Calendar
                locale="pt-BR"
                value={calendarValue}
                onChange={setCalendarValue}
                className={`${getShadow(theme)} !w-full dark:text-[#1A1A1A] rounded-lg`}
                tileClassName={({ date }) =>
                    habits.some((h) =>
                        h.completedDays?.map(parseISO).some((d) => isSameDay(d, date)),
                    )
                        ? 'bg-blue-500 text-white rounded-full'
                        : ''
                }
            />
        </div>
    );
}
