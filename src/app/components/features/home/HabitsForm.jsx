import { getBg, getGray300Or600 } from '@/app/utils/theme';
import { useTheme } from 'next-themes';
import Input from '../auth/Input';
import Button from '../../Button';
import { useEffect, useState } from 'react';
import Select from './Select';
import { createHabit, updateHabit } from '@/services/habits';

export default function HabitsForm({ isEditing, onClose, onAdd, onEdit, tags }) {
    const { theme } = useTheme();

    const [newHabit, setNewHabit] = useState({
        name: '',
        frequency: '',
        description: '',
        tag: '',
    });

    useEffect(() => {
        if (isEditing) setNewHabit(isEditing);
        else setNewHabit({ name: '', frequency: '', description: '', tag: '' });
    }, [isEditing]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewHabit((prev) => ({ ...prev, [id]: value }));
    };

    // TODO
    // MELHORAR MENSAGEM DE ERRO
    const handleSubmit = async () => {
        try {
            if (isEditing) {
                const updatedHabit = await updateHabit(isEditing.id, newHabit);
                onEdit(updatedHabit);
            } else {
                const createdHabit = await createHabit(newHabit);
                onAdd(createdHabit);
            }
            onClose();
        } catch (error) {
            const errorMessage = isEditing ? 'Erro ao atualizar hábito:' : ' Erro ao criar hábito:';
            console.error(errorMessage, error);
        }
    };

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
                        { value: 'Daily', label: 'Diário' },
                        { value: 'Weekly', label: 'Semanal' },
                        { value: 'Monthly', label: 'Mensal' },
                        { value: 'Yearly', label: 'Anual' },
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
                <Select
                    id="tag"
                    label="Tags"
                    placeholder="Selecione uma tag"
                    options={tags}
                    value={newHabit.tag}
                    theme={theme}
                    onChange={handleChange}
                />
                <Button
                    onClick={handleSubmit}
                    className="bg-[#2549BE] hover:bg-blue-800 text-white w-full rounded-md py-2 font-semibold mb-2"
                >
                    {isEditing ? 'Salvar Alterações' : 'Adicionar'}
                </Button>
                <button
                    onClick={onClose}
                    className={`${getGray300Or600(theme)} text-sm underline w-full text-center`}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
