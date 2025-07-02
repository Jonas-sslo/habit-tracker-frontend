import { Edit } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import { Check } from '@mui/icons-material';

export default function HabitsList({ habits, onEdit, onDelete, filters, applyFilters }) {
    return (
        <div className="flex flex-col gap-3">
            {applyFilters(habits).map((habit) => (
                <div
                    key={habit.id}
                    className="flex justify-between items-center bg-white rounded-[18px] shadow-lg px-8 py-4"
                >
                    <div>
                        <div className="text-md font-medium dark:text-[#1A1A1A]">{habit.name}</div>
                        <div className="text-sm text-gray-500">
                            {habit.frequency} • {habit.tag}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => onEdit(habit)}>
                            <Edit className="text-[#1E1E1E] hover:text-gray-700 cursor-pointer" />
                        </button>
                        <button onClick={() => onDelete(habit.id)}>
                            <Delete className="text-[#1E1E1E] hover:text-gray-700 cursor-pointer" />
                        </button>
                        <button onClick={() => onDelete(habit.id)}>
                            <Check className="text-[#1E1E1E] hover:text-gray-700 cursor-pointer" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
