import { FREQUENCIES } from '@/app/utils/frequencies';
import { AccessTimeOutlined, Edit } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import { Check } from '@mui/icons-material';

export default function HabitsList({ habits, onEdit, onDelete, onToggleConclude, applyFilters,  }) {
    return (
        <div className="flex flex-col gap-3">
            {applyFilters(habits).map((habit) => (
                <div
                    key={habit.id}
                    className="flex justify-between items-center bg-white rounded-[18px] shadow-lg px-4 py-4"
                >
                    <div className="flex items-center gap-3">
                        <AccessTimeOutlined fontSize="large" className='text-black'/>
                        <div>
                            <div className="text-sm md:text-base font-medium dark:text-[#1A1A1A]">
                                {habit.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {habit.description} {habit.description && ' • '}
                                {FREQUENCIES[habit.frequency] || habit.frequency}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <button onClick={() => onEdit(habit)}>
                            <Edit className="text-[#1E1E1E] hover:text-gray-700 cursor-pointer !text-[22px]" />
                        </button>
                        <button onClick={() => onDelete(habit.id)}>
                            <Delete className="text-[#96031A] hover:text-[#C12F40] cursor-pointer !text-[22px]" />
                        </button>
                        <button onClick={() => onToggleConclude(habit.id)}>
                            <Check className="text-[#48998B] hover:text-[#77CBB9] cursor-pointer !text-[22px]" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
