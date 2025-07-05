'use client';

import { useEffect, useState } from 'react';
import HabitsForm from '../../components/features/home/HabitsForm';
import { deleteHabit, getHabits } from '../../../services/habits';
import { format, isSameDay, parseISO, subDays } from 'date-fns';
import { useTheme } from 'next-themes';

import HabitsList from '../../components/features/home/HabitsList';
import FiltersModal from '../../components/features/home/FiltersModal';
import TagsModal from '../../components/features/home/TagsModal';
import StreakCard from '../../components/features/home/StreakCard';
import CalendarCard from '../../components/features/home/CalendarCard';
import ActionsButtons from '../../components/features/home/ActionsButtons';
import { getGray300Or600, getHomeBg } from '../../utils/theme';
import Layout from '../../components/Layout';
import { createTag, getTags } from '@/services/tags';
import DeleteConfirmationModal from '../../components/features/home/DeleteConfirmationModal';

export default function Home() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [habits, setHabits] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [userName, setUserName] = useState('Usuário');
    const [calendarValue, setCalendarValue] = useState(new Date());
    const [activeStreak, setActiveStreak] = useState(0);
    const [newTag, setNewTag] = useState('');
    const [tags, setTags] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);
    const [filters, setFilters] = useState({
        status: 'notConcluded',
        order: 'alphabetical',
        frequency: 'daily',
        selectedTags: [],
    });
    const [currentFilters, setCurrentFilters] = useState(filters);
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        habitId: null,
        onConfirm: null,
    });
    const today = new Date();

    useEffect(() => {
        setMounted(true);
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) setUserName(user);

        async function fetchHabits() {
            try {
                const habitsData = await getHabits();
                setHabits(habitsData);
                calculateSequency(habitsData);
            } catch (error) {
                console.error('Erro ao buscar hábitos:', error);
            }
        }
        async function fetchTags() {
            try {
                const tagsData = await getTags();
                setTags(tagsData);
            } catch (error) {
                console.error('Erro ao buscar tags:', error);
            }
        }
        fetchHabits();
        fetchTags();
    }, []);

    const handleAddTag = async () => {
        if (!newTag.trim()) return;
        try {
            await createTag(newTag.trim());
            const createdTags = await getTags();
            setTags(createdTags);
            setNewTag('');
            setShowTagModal(false);
        } catch (error) {
            console.error('Erro ao adicionar tag:', error);
        }
    };

    const calculateSequency = (habits) => {
        const concludedDays = new Set();

        habits?.forEach((h) => {
            h.concludedDays?.forEach((dataStr) => {
                concludedDays.add(format(parseISO(dataStr), 'yyyy-MM-dd'));
            });
        });

        let streak = 0;
        let day = today;
        while (concludedDays.has(format(day, 'yyyy-MM-dd'))) {
            streak++;
            day = subDays(day, 1);
        }
        setActiveStreak(streak);
    };

    const applyFilters = (habits) => {
        return habits
            .filter((h) => {
                if (currentFilters.status === 'concluded') {
                    return h.concludedDays?.some((d) => isSameDay(parseISO(d), today));
                }
                if (currentFilters.status === 'notConcluded') {
                    return !h.concludedDays?.some((d) => isSameDay(parseISO(d), today));
                }
                return true;
            })
            .filter((h) => {
                if (!currentFilters.frequency) return true;
                return h.frequency === currentFilters.frequency;
            })
            .filter((h) => {
                if (!currentFilters.selectedTags || currentFilters.selectedTags.length === 0)
                    return true;
                return h.tags?.some((t) => currentFilters.selectedTags.includes(t.name));
            })
            .sort((a, b) => {
                if (currentFilters.order === 'alphabetical') {
                    return a.name.localeCompare(b.name);
                }
                if (currentFilters.order === 'duration') {
                    return (b.concludedDays?.length || 0) - (a.concludedDays?.length || 0);
                }
                return 0;
            });
    };

    const handleDelete = async (id) => {
        setDeleteModal({
            isOpen: true,
            habitId: id,
            onConfirm: async () => {
                try {
                    await deleteHabit(id);
                    setHabits((prev) => prev.filter((h) => h.id !== id));
                    setDeleteModal({ isOpen: false, habitId: null, onConfirm: null });
                } catch (error) {
                    console.error('Erro ao excluir hábito:', error);
                }
            },
        });
    };

    if (!mounted) return null;

    return (
        <div className={`flex flex-col md:flex-row h-screen ${getHomeBg(theme)} relative`}>
            <div className="flex-1 flex flex-col overflow-y-auto">
                <div className="flex flex-col justify-center border-b-[1px] border-b-[#2549BE] px-8 pt-4">
                    <h1 className="text-2xl lg:text-4xl font-semibold mb-1">Olá, {userName}</h1>
                    <p className={`text-sm lg:text-base mb-6 ${getGray300Or600(theme)}`}>
                        Constância começa com clareza. Veja seus hábitos de hoje:
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row h-full overflow-y-auto">
                    <div className="w-full lg:w-4/6 h-fit lg:h-full border-b lg:border-b-0 lg:border-r-[1px] border-[#2549BE] px-4 lg:px-8 py-4 lg:py-6 gap-6 flex flex-col">
                        <div className="flex flex-col lg:flex-row items-center gap-3 lg:justify-between">
                            <h2 className="text-xl lg:text-2xl font-semibold">Seus hábitos</h2>
                            <ActionsButtons
                                onAddTagClick={() => setShowTagModal(true)}
                                onAddHabitClick={() => {
                                    setIsEditing(null);
                                    setShowModal(true);
                                }}
                                onFilterClick={() => setShowFilterModal(true)}
                            />
                        </div>
                        <div className="flex flex-col gap-4 h-full overflow-y-auto py-2">
                            <HabitsList
                                habits={habits}
                                applyFilters={applyFilters}
                                filters={filters}
                                onEdit={(habit) => {
                                    setIsEditing(habit);
                                    setShowModal(true);
                                }}
                                onDelete={handleDelete}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-2/6 flex flex-col gap-6 px-4 lg:px-8 py-4 md:py-6">
                        <StreakCard activeStreak={activeStreak} theme={theme} />
                        <CalendarCard
                            calendarValue={calendarValue}
                            setCalendarValue={setCalendarValue}
                            habits={habits}
                            theme={theme}
                        />
                    </div>
                </div>
            </div>

            {showModal && (
                <HabitsForm
                    isEditing={isEditing}
                    onClose={() => {
                        setShowModal(false);
                        setIsEditing(null);
                    }}
                    onAdd={async () => {
                        const createdHabits = await getHabits();
                        setHabits(createdHabits);
                        setShowModal(false);
                    }}
                    onEdit={async () => {
                        const updatedHabits = await getHabits();
                        setHabits(updatedHabits);
                        setShowModal(false);
                    }}
                    tags={tags.map((t) => ({ value: t.name, label: t.name }))}
                />
            )}

            {showFilterModal && (
                <FiltersModal
                    filters={filters}
                    setFilters={setFilters}
                    onApply={() => {
                        setCurrentFilters(filters);
                        setShowFilterModal(false);
                    }}
                    onClose={() => setShowFilterModal(false)}
                    tags={tags}
                    theme={theme}
                />
            )}

            {showTagModal && (
                <TagsModal
                    newTag={newTag}
                    setNewTag={setNewTag}
                    onAddTag={handleAddTag}
                    onClose={() => setShowTagModal(false)}
                    theme={theme}
                />
            )}

            {deleteModal.isOpen && (
                <DeleteConfirmationModal
                    isOpen={deleteModal.isOpen}
                    onClose={() =>
                        setDeleteModal({ isOpen: false, habitId: null, onConfirm: null })
                    }
                    onConfirm={deleteModal.onConfirm}
                />
            )}
        </div>
    );
}
