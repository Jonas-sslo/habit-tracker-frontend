'use client';

import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteHabit, getHabits } from '../../services/habits';
import { format, isSameDay, parseISO, subDays } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTheme } from 'next-themes';
import { getGray300Or600, getShadow } from '../utils/theme';
import HabitsForm from '../components/features/home/HabitsForm';
import { FilterAltOutlined } from '@mui/icons-material';

export default function Home() {
  // TODO
  // ORGANIZAR CODIGO
  // ARRUMAR TELA
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

    // TODO
    // MELHORAR MENSAGEM DE ERRO
    async function fetchHabits() {
      try {
        const data = await getHabits();
        setHabits(data);
        calculateSequency(data);
      } catch (error) {
        console.error('Erro ao buscar hábitos:', error);
      }
    };
    fetchHabits();
  }, []);

  const calculateSequency = (habits) => {
    const concludedDays = new Set();

    habits?.forEach(h => {
      h.concludedDays?.forEach(dataStr => {
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
  
  const applyFilters= (habits) => {
    return habits
      .filter(h => {
        if (filters.status === 'concluded') {
          return h.concludedDays?.some(d => isSameDay(parseISO(d), today));
        }
        if (filters.status === 'notConcluded') {
          return !h.concludedDays?.some(d => isSameDay(parseISO(d), today));
        }
        return true;
      })
      .filter(h => {
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

  // TODO
  // MELHORAR MENSAGEM DE ERRO
  const handleDelete = async (id) => {
    try {
      await deleteHabit(id);
      setHabits(prev => prev.filter(h => h.id !== id));
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
          <p className={`mb-6 ${getGray300Or600(theme)}`}>Constância começa com clareza. Veja seus hábitos de hoje:</p>

          <div className="flex flex-wrap gap-3 mb-6">
            <Button onClick={() => setShowTagModal(true)} color="yellow" className="text-white px-4 py-2 rounded-full font-medium flex items-center gap-1">
              <AddIcon /> Adicionar Tag
            </Button>

            <Button onClick={() => {
              setIsEditing(null);
              setShowModal(true);
            }} className="flex items-center gap-1">
              <AddIcon /> Adicionar Hábito
            </Button>

            <Button onClick={() => setShowFilterModal(true)} className="flex items-center gap-1">
              <FilterAltOutlined /> Filtrar
            </Button>
          </div>

          {/* Modal de Filtro */}
          {showFilterModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md border-2 border-[#2549BE]">
                <h2 className="text-center text-lg font-semibold mb-4">Filtrar Hábitos</h2>

                {/* Status */}
                <div className="mb-4">
                  <p className="font-medium mb-1">Status</p>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => setFilters({ ...filters, status: 'concluded' })} className={`px-3 py-1 rounded ${filters.status === 'concluded' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Concluído</button>
                    <button onClick={() => setFilters({ ...filters, status: 'notConcluded' })} className={`px-3 py-1 rounded ${filters.status === 'notConcluded' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Não concluído</button>
                  </div>
                </div>

                {/* order */}
                <div className="mb-4">
                  <p className="font-medium mb-1">order</p>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => setFilters({ ...filters, order: 'alphabetical' })} className={`px-3 py-1 rounded ${filters.order === 'alphabetical' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Alfabética</button>
                    <button onClick={() => setFilters({ ...filters, order: 'duration' })} className={`px-3 py-1 rounded ${filters.order === 'duration' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Duração</button>
                  </div>
                </div>

                {/* Frequência */}
                <div className="mb-6">
                  <p className="font-medium mb-1">Frequência</p>
                  <div className="flex gap-2 flex-wrap">
                    {['Daily', 'Weekly', 'Monthly', 'Anualy'].map(f => (
                      <button key={f} onClick={() => setFilters({ ...filters, frequency: f })} className={`px-3 py-1 rounded ${filters.frequency === f ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{f}</button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowFilterModal(false)}
                  className="bg-[#2549BE] hover:bg-blue-800 text-white w-full py-2 rounded font-semibold mb-2"
                >
                  Aplicar filters
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-sm text-gray-500 underline w-full text-center"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Modal de Tag */}
          {showTagModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white border-2 border-yellow-400 rounded-2xl shadow-lg p-6 w-[90%] max-w-md">
                <h2 className="text-center text-lg font-semibold mb-4">Adicione uma tag</h2>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Nome da Tag"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
                />
                <button
                  onClick={() => {
                    if (newTag.trim()) {
                      setTags([...tags, newTag.trim()]);
                      setNewTag('');
                      setShowTagModal(false);
                    }
                  }}
                  className="bg-[#FDC43A] hover:bg-yellow-400 text-white w-full py-2 rounded font-semibold mb-2"
                >
                  Adicionar
                </button>
                <button onClick={() => setShowTagModal(false)} className="text-sm text-gray-500 underline w-full text-center">
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Lista de Hábitos */}
          <div className="flex flex-col gap-3">
            {applyFilters(habits).map(habit => (
              <div key={habit.id} className="flex justify-between items-center bg-white rounded-lg shadow px-4 py-3">
                <div>
                  <div className="text-lg font-medium">{habit.name}</div>
                  <div className="text-sm text-gray-500">{habit.frequency} • {habit.tag}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {
                    setIsEditing(habit);
                    setShowModal(true);
                  }}>
                    <EditIcon className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                  </button>
                  <button onClick={() => handleDelete(habit.id)}>
                    <DeleteIcon className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna da Direita */}
        <div className="w-full max-w-sm">
          <div className={`${getShadow(theme)} rounded-lg p-4 mb-6`}>
            <div className="flex items-center gap-4">
              <span className="text-4xl">🔥</span>
              <div>
                <p className={`${getGray300Or600(theme)}`}>Sequência ativa</p>
                <h2 className="text-2xl font-bold text-orange-600">
                  {activeStreak} {activeStreak === 1 ? 'dia' : 'dias'}
                </h2>
                <p className={`${getGray300Or600(theme)}`}>Continue com o bom trabalho!</p>
              </div>
            </div>
          </div>

          <div className={`${getShadow(theme)} rounded-lg p-4`}>
            <h3 className={`${getGray300Or600(theme)} text-md font-semibold mb-2`}>Seu compromisso de constância</h3>
            <Calendar
              locale="pt-BR"
              value={calendarValue}
              onChange={setCalendarValue}
              className="w-full text-black"
              tileClassName={({ date }) =>
                habits.some(h =>
                  h.completedDays?.map(parseISO).some(d => isSameDay(d, date))
                )
                  ? 'bg-blue-500 text-white rounded-full'
                  : ''
              }
            />
          </div>
        </div>
      </div>

      {/* Modal para criar ou editar hábito */}
      {showModal && (
        <HabitsForm
          isEditing={isEditing}
          onClose={() => {
            setShowModal(false);
            setIsEditing(null);
          }}
          onAdd={(h) => {
            setHabits(prev => [...prev, h]);
            setShowModal(false);
          }}
          onEdit={(updatedHabit) => {
            setHabits(prev => prev.map(h => h.id === updatedHabit.id ? updatedHabit : h));
            setShowModal(false);
          }}
          tags={tags}
        />
      )}
    </div>
  );
}
