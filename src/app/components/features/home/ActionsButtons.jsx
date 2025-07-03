import AddIcon from '@mui/icons-material/Add';
import { FilterAltOutlined } from '@mui/icons-material';
import Button from '../../Button';

export default function ActionsButtons({ onAddTagClick, onAddHabitClick, onFilterClick }) {
    return (
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <Button
                onClick={onAddTagClick}
                color="yellow"
                className="text-white flex items-center gap-1 w-full sm:w-auto"
            >
                <AddIcon /> Adicionar Tag
            </Button>

            <Button onClick={onAddHabitClick} className="flex items-center gap-1 w-full sm:w-auto">
                <AddIcon /> Adicionar Hábito
            </Button>

            <Button onClick={onFilterClick} className="flex items-center gap-1 w-full sm:w-auto">
                <FilterAltOutlined /> Filtrar
            </Button>
        </div>
    );
}
