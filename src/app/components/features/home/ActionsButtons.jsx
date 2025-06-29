import AddIcon from '@mui/icons-material/Add';
import { FilterAltOutlined } from '@mui/icons-material';
import Button from '../../Button';

export default function ActionsButtons({ onAddTagClick, onAddHabitClick, onFilterClick }) {
    return (
        <div className="flex flex-wrap gap-3 mb-6">
            <Button
                onClick={onAddTagClick}
                color="yellow"
                className="text-white px-4 py-2 rounded-full font-medium flex items-center gap-1"
            >
                <AddIcon /> Adicionar Tag
            </Button>

            <Button onClick={onAddHabitClick} className="flex items-center gap-1">
                <AddIcon /> Adicionar Hábito
            </Button>

            <Button onClick={onFilterClick} className="flex items-center gap-1">
                <FilterAltOutlined /> Filtrar
            </Button>
        </div>
    );
}
