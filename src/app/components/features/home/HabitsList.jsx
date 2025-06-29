import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function HabitsList({ habits, onEdit, onDelete, filters, applyFilters }) {
    return (
        <div className="flex flex-col gap-3">
            {applyFilters(habits).map((habit) => (
                <div
                    key={habit.id}
                    className="flex justify-between items-center bg-white rounded-lg shadow px-4 py-3"
                >
                    <div>
                        <div className="text-lg font-medium">{habit.name}</div>
                        <div className="text-sm text-gray-500">
                            {habit.frequency} • {habit.tag}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => onEdit(habit)}>
                            <EditIcon className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </button>
                        <button onClick={() => onDelete(habit.id)}>
                            <DeleteIcon className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
