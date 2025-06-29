import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getShadow, getGray300Or600 } from '@/app/utils/theme';
import { isSameDay, parseISO } from 'date-fns';

export default function CalendarCard({ calendarValue, setCalendarValue, habits, theme }) {
    return (
        <div className={`${getShadow(theme)} rounded-lg p-4`}>
            <h3 className={`${getGray300Or600(theme)} text-md font-semibold mb-2`}>
                Seu compromisso de constância
            </h3>
            <Calendar
                locale="pt-BR"
                value={calendarValue}
                onChange={setCalendarValue}
                className="w-full text-black"
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
