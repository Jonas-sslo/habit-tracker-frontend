'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import HabitsForm from '../components/features/home/HabitsForm';
import { deleteHabit, getHabits } from '../../services/habits';
import { format, isSameDay, parseISO, subDays } from 'date-fns';
import { useTheme } from 'next-themes';

import HabitsList from '../components/features/home/HabitsList';
import FiltersModal from '../components/features/home/FiltersModal';
import TagsModal from '../components/features/home/TagsModal';
import StreakCard from '../components/features/home/StreakCard';
import CalendarCard from '../components/features/home/CalendarCard';
import ActionsButtons from '../components/features/home/ActionsButtons';

export default function Home() {
    const { theme } = useTheme();

    const [mounted, setMounted] = useState(false);
    const [habits, setHabits] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [userName, setUserName] = useState('Usuário');
    const [calendarValue, setCalendarValue] = useState(new Date());
    const [activeStreak, setActiveStreak] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [tags, setTags] = useState([]);
    const [filters, setFilters] = useState({ status: '', order: '', frequency: '' });
    const [showFilterModal, setShowFilterModal] = useState(false);

    const today = new Date();

    useEffect(() => {
        setMounted(true);
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) setUserName(user);

        async function fetchHabits() {
            try {
                const data = await getHabits();
                setHabits(data);
                calculateSequency(data);
            } catch (error) {
                console.error('Erro ao buscar hábitos:', error);
            }
        }
        fetchHabits();
    }, []);

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
                if (filters.status === 'concluded') {
                    return h.concludedDays?.some((d) => isSameDay(parseISO(d), today));
                }
                if (filters.status === 'notConcluded') {
                    return !h.concludedDays?.some((d) => isSameDay(parseISO(d), today));
                }
                return true;
            })
            .filter((h) => {
                if (!filters.frequency) return true;
                return h.frequency === filters.frequency;
            })
            .sort((a, b) => {
                if (filters.order === 'alphabetical') {
                    return a.name.localeCompare(b.name);
                }
                if (filters.order === 'duration') {
                    return (b.concludedDays?.length || 0) - (a.concludedDays?.length || 0);
                }
                return 0;
            });
    };

    const handleDelete = async (id) => {
        try {
            await deleteHabit(id);
            setHabits((prev) => prev.filter((h) => h.id !== id));
        } catch (error) {
            console.error('Erro ao excluir hábito: ', error);
        }
    };

    if (!mounted) return null;

    return (
        <div className="flex h-screen light:bg-[#DBEDFB]">
            <Sidebar />

            <div className="flex-1 flex p-4 ml-16 md:ml-20 lg:ml-24 overflow-y-auto">
                {/* Coluna da Esquerda */}
                <div className="flex-1 pr-6">
                    <h1 className="text-3xl font-semibold mb-1">Olá, {userName}</h1>
                    <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Constância começa com clareza. Veja seus hábitos de hoje:
                    </p>

                    <ActionsButtons
                        onAddTagClick={() => setShowTagModal(true)}
                        onAddHabitClick={() => {
                            setIsEditing(null);
                            setShowModal(true);
                        }}
                        onFilterClick={() => setShowFilterModal(true)}
                    />

                    {showFilterModal && (
                        <FiltersModal
                            filters={filters}
                            setFilters={setFilters}
                            onClose={() => setShowFilterModal(false)}
                        />
                    )}

                    {showTagModal && (
                        <TagsModal
                            newTag={newTag}
                            setNewTag={setNewTag}
                            onAddTag={() => {
                                if (newTag.trim()) {
                                    setTags([...tags, newTag.trim()]);
                                    setNewTag('');
                                    setShowTagModal(false);
                                }
                            }}
                            onClose={() => setShowTagModal(false)}
                        />
                    )}

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

                {/* Coluna da Direita */}
                <div className="w-full max-w-sm">
                    <StreakCard activeStreak={activeStreak} theme={theme} />
                    <CalendarCard
                        calendarValue={calendarValue}
                        setCalendarValue={setCalendarValue}
                        habits={habits}
                        theme={theme}
                    />
                </div>
            </div>

            {showModal && (
                <HabitsForm
                    isEditing={isEditing}
                    onClose={() => {
                        setShowModal(false);
                        setIsEditing(null);
                    }}
                    onAdd={(h) => {
                        setHabits((prev) => [...prev, h]);
                        setShowModal(false);
                    }}
                    onEdit={(updatedHabit) => {
                        setHabits((prev) =>
                            prev.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)),
                        );
                        setShowModal(false);
                    }}
                    tags={tags}
                />
            )}
        </div>
    );
}
