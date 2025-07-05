import { getBg, getGray300Or600 } from '@/app/utils/theme';
import { useTheme } from 'next-themes';
import Input from '../auth/Input';
import Button from '../../Button';
import { useEffect, useState } from 'react';
import Select from './Select';
import { createHabit, updateHabit } from '@/services/habits';
import { MultiSelect } from './MultiSelect';

export default function HabitsForm({ isEditing, onClose, onAdd, onEdit, tags }) {
    const { theme } = useTheme();

    const [newHabit, setNewHabit] = useState({
        name: '',
        frequency: '',
        description: '',
        tags: [],
    });

    useEffect(() => {
        if (isEditing) {
            const editingHabit = {
                ...isEditing,
                tags: Array.isArray(isEditing.tags) ? isEditing.tags.map((t) => t.name) : [],
            };
            setNewHabit(editingHabit);
        } else setNewHabit({ name: '', frequency: '', description: '', tags: [] });
    }, [isEditing]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewHabit((prev) => ({ ...prev, [id]: value }));
    };

    const handleTagsChange = (selectedTags) => {
        setNewHabit((prev) => ({ ...prev, tags: selectedTags }));
    };

    const handleSubmit = async () => {
        try {
            const habitData = { ...newHabit, tags: newHabit.tags };
            if (isEditing) {
                const updatedHabit = await updateHabit(isEditing.id, habitData);
                onEdit(updatedHabit);
            } else {
                const createdHabit = await createHabit(habitData);
                onAdd(createdHabit);
            }
            onClose();
        } catch (error) {
            const errorMessage = isEditing ? 'Erro ao atualizar hábito:' : ' Erro ao criar hábito:';
            console.error(errorMessage, error);
        }
    };

    const isButtonDisabled = !newHabit.name || !newHabit.frequency || newHabit.tags.length === 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className={`${getBg(theme)} rounded-2xl shadow-lg p-6 w-[90%] max-w-md border-2 border-[#2549BE]`}
            >
                <h2 className="text-center text-lg font-semibold mb-4">
                    {isEditing ? 'Editar Hábito' : 'Adicionar Hábito'}
                </h2>
                <Input
                    id="name"
                    type="text"
                    label="Nome"
                    showText={!isEditing}
                    text="Dê um nome ao hábito que deseja criar"
                    placeholder="Dançar forró"
                    value={newHabit.name || ''}
                    theme={theme}
                    onChange={handleChange}
                />
                <Select
                    id="frequency"
                    label="Frequência"
                    placeholder="Selecione uma frequência"
                    options={[
                        { value: 'daily', label: 'Diário' },
                        { value: 'weekly', label: 'Semanal' },
                        { value: 'monthly', label: 'Mensal' },
                        { value: 'yearly', label: 'Anual' },
                    ]}
                    value={newHabit.frequency}
                    theme={theme}
                    onChange={handleChange}
                />
                <Input
                    id="description"
                    type="text"
                    showText={!isEditing}
                    text="Adicione uma descrição para o hábito"
                    placeholder="Dançar forró agarradinho com Kauê"
                    label="Descrição"
                    value={newHabit.description || ''}
                    theme={theme}
                    onChange={handleChange}
                />
                <MultiSelect
                    id="tag"
                    label="Tags"
                    placeholder="Selecione as tags"
                    options={tags}
                    value={newHabit.tags}
                    onChange={handleTagsChange}
                    theme={theme}
                />
                <Button
                    onClick={handleSubmit}
                    className="bg-[#2549BE] hover:bg-blue-800 text-white w-full rounded-md py-2 font-semibold mb-2"
                    disabled={isButtonDisabled}
                >
                    {isEditing ? 'Salvar Alterações' : 'Adicionar'}
                </Button>
                <button
                    onClick={onClose}
                    className={`${getGray300Or600(theme)} text-sm underline w-full text-center hover:cursor-pointer`}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
