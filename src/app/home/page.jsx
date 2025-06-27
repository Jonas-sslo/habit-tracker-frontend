'use client';

import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getHabits } from '@/services/api';
import { useRouter } from 'next/navigation';
import { format, isSameDay, parseISO, subDays } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
import ptBR from 'date-fns/locale/pt-BR';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [habitEditando, setHabitEditando] = useState(null);
  const [userName, setUserName] = useState('Usuário');
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [activeStreak, setActiveStreak] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [novaTag, setNovaTag] = useState('');

  const [newHabit, setNewHabit] = useState({
    nome: '',
    frequencia: '',
    descricao: '',
    tag: ''
  });

  const [filtros, setFiltros] = useState({
    status: '',
    ordem: '',
    frequencia: ''
  });

  const [tags, setTags] = useState([]);


  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [showFiltroModal, setShowFiltroModal] = useState(false);

  const router = useRouter();
  const today = new Date();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUserName(user);

    async function fetchHabits() {
      const data = await getHabits();
      setHabits(data);
      calcularSequencia(data);
    }

    fetchHabits();
  }, []);

  const calcularSequencia = (habits) => {
    const diasFeitos = new Set();

    habits.forEach(habit => {
      habit.diasFeitos.forEach(dataStr => {
        const data = format(parseISO(dataStr), 'yyyy-MM-dd');
        diasFeitos.add(data);
      });
    });

    let streak = 0;
    let dia = today;

    while (diasFeitos.has(format(dia, 'yyyy-MM-dd'))) {
      streak++;
      dia = subDays(dia, 1);
    }

    setActiveStreak(streak);
  };

  const handleAddHabit = () => {
    const novo = {
      ...newHabit,
      id: Date.now(),
      diasFeitos: []
    };
    setHabits([...habits, novo]);
    setShowModal(false);
    setNewHabit({ nome: '', frequencia: '', descricao: '', tag: '' });
  };
  const toggleHabitDone = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? {
            ...habit,
            diasFeitos: habit.diasFeitos.some(d => isSameDay(parseISO(d), today))
              ? habit.diasFeitos.filter(d => !isSameDay(parseISO(d), today))
              : [...habit.diasFeitos, today.toISOString()],
          }
          : habit
      )
    );
  };

  const handleDeleteHabit = (id) => {
    if (confirm('Tem certeza que deseja excluir este hábito?')) {
      setHabits((prev) => prev.filter((h) => h.id !== id));
    }
  };

  const handleEditHabit = (id) => {
    const habit = habits.find((h) => h.id === id);
    if (habit) {
      setNewHabit(habit);
      setShowModal(true);
    }
  };

  const aplicarFiltros = (habits) => {
    return habits
      .filter(h => {
        if (filtros.status === 'concluido') {
          return h.diasFeitos?.some(d => isSameDay(parseISO(d), today));
        }
        if (filtros.status === 'naoConcluido') {
          return !h.diasFeitos?.some(d => isSameDay(parseISO(d), today));
        }
        return true;
      })
      .filter(h => {
        if (!filtros.frequencia) return true;
        return h.frequencia === filtros.frequencia;
      })
      .sort((a, b) => {
        if (filtros.ordem === 'alfabetica') {
          return a.nome.localeCompare(b.nome);
        }
        if (filtros.ordem === 'duracao') {
          return (b.diasFeitos?.length || 0) - (a.diasFeitos?.length || 0);
        }
        return 0;
      });
  };
  const salvarEdicaoHabit = () => {
    setHabits(prev =>
      prev.map(habit => {
        if (habit.id === habitEditando.id) {
          return habitEditando;
        }
        return habit;
      })
    );
    setHabitEditando(null);
    setShowModal(false);
  };


  return (
    <div className="flex h-screen bg-[#DBEDFB]">
      <Sidebar />

      <div className="flex-1 flex p-4 ml-16 md:ml-20 lg:ml-24 overflow-y-auto">
        {/* Coluna da Esquerda */}
        <div className="flex-1 pr-6">
          <h1 className="text-3xl font-semibold mb-1">Olá, {userName}</h1>
          <p className="text-gray-500 mb-6">Constância começa com clareza. Veja seus hábitos de hoje:</p>

          <div className="flex flex-wrap gap-3 mb-6">
            <Button onClick={() => setShowTagModal(true)} className="bg-[#FDC43A] hover:bg-yellow-400 text-white px-4 py-2 rounded-full font-medium">
              + Adicionar Tag
            </Button>

            <Button onClick={() => setShowModal(true)} className="flex items-center gap-1">
              <AddIcon /> Adicionar Hábito
            </Button>
            <Button onClick={() => setShowFiltroModal(true)} className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 019 18v-4.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filtrar
            </Button>

          </div>
          {showFiltroModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md border-2 border-[#2549BE]">
                <h2 className="text-center text-lg font-semibold mb-4">Filtrar Hábitos</h2>

                {/* Status */}
                <div className="mb-4">
                  <p className="font-medium mb-1">Status</p>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => setFiltros({ ...filtros, status: 'concluido' })} className={`px-3 py-1 rounded ${filtros.status === 'concluido' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Concluído</button>
                    <button onClick={() => setFiltros({ ...filtros, status: 'naoConcluido' })} className={`px-3 py-1 rounded ${filtros.status === 'naoConcluido' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Não concluído</button>
                  </div>
                </div>

                {/* Ordem */}
                <div className="mb-4">
                  <p className="font-medium mb-1">Ordem</p>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => setFiltros({ ...filtros, ordem: 'alfabetica' })} className={`px-3 py-1 rounded ${filtros.ordem === 'alfabetica' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Alfabética</button>
                    <button onClick={() => setFiltros({ ...filtros, ordem: 'duracao' })} className={`px-3 py-1 rounded ${filtros.ordem === 'duracao' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Duração</button>
                  </div>
                </div>

                {/* Frequência */}
                <div className="mb-6">
                  <p className="font-medium mb-1">Frequência</p>
                  <div className="flex gap-2 flex-wrap">
                    {['Diário', 'Semanal', 'Mensal', 'Anual'].map(f => (
                      <button key={f} onClick={() => setFiltros({ ...filtros, frequencia: f })} className={`px-3 py-1 rounded ${filtros.frequencia === f ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{f}</button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowFiltroModal(false)}
                  className="bg-[#2549BE] hover:bg-blue-800 text-white w-full py-2 rounded font-semibold mb-2"
                >
                  Aplicar Filtros
                </button>
                <button
                  onClick={() => setShowFiltroModal(false)}
                  className="text-sm text-gray-500 underline w-full text-center"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {showTagModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white border-2 border-yellow-400 rounded-2xl shadow-lg p-6 w-[90%] max-w-md">
                <h2 className="text-center text-lg font-semibold mb-4">Adicione uma tag</h2>

                <div className="mb-4">
                  <label htmlFor="tagInput" className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    id="tagInput"
                    type="text"
                    value={novaTag}
                    onChange={(e) => setNovaTag(e.target.value)}
                    placeholder="Dê um nome à tag que deseja criar"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <button
                  onClick={() => {
                    if (novaTag.trim() !== '') {
                      setTags([...tags, novaTag.trim()]);
                      setNovaTag('');
                      setShowTagModal(false);
                    }
                  }}
                  className="bg-[#FDC43A] hover:bg-yellow-400 text-white w-full py-2 rounded font-semibold mb-2"
                >
                  Adicionar
                </button>

                <button
                  onClick={() => {
                    setShowTagModal(false);
                    setNovaTag('');
                  }}
                  className="text-sm text-gray-500 underline w-full text-center"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}


          <div className="flex flex-col gap-3">
            {aplicarFiltros(habits).map((habit) => (
              <div key={habit.id} className="flex justify-between items-center bg-white rounded-lg shadow px-4 py-3">
                <div>
                  <div className="text-lg font-medium">{habit.nome}</div>
                  <div className="text-sm text-gray-500">{habit.frequencia} • {habit.tag}</div>
                </div>
                <div className="flex gap-2">
                  {/* Editar */}
                  <button onClick={() => {
                    setHabitEditando(habit);
                    setNewHabit(habit);
                    setShowModal(true);
                  }}>
                    <EditIcon className="text-gray-500 hover:text-gray-700" />
                  </button>

                  <button onClick={() => setHabits(habits.filter(h => h.id !== habit.id))}>
                    <DeleteIcon className="text-gray-500 hover:text-gray-700" />
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Coluna da Direita */}
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🔥</span>
              <div>
                <p className="text-gray-600">Sequência ativa</p>
                <h2 className="text-2xl font-bold text-orange-600">
                  {activeStreak} {activeStreak === 1 ? 'dia' : 'dias'}
                </h2>
                <p className="text-sm text-gray-400">Continue com o bom trabalho!</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Seu compromisso de constância</h3>
            <Calendar
              locale="pt-BR"
              value={calendarValue}
              onChange={setCalendarValue}
              className="w-full"
              tileClassName={({ date }) =>
                habits.some(h =>
                  h.diasFeitos.map(parseISO).some(d => isSameDay(d, date))
                )
                  ? 'bg-blue-500 text-white rounded-full'
                  : ''
              }
            />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md border-2 border-[#2549BE]">
            <h2 className="text-center text-lg font-semibold mb-4">Adicione seu hábito</h2>

            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Nome</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newHabit.nome}
                onChange={(e) => setNewHabit({ ...newHabit, nome: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Frequência</label>
              <select
                className="w-full px-3 py-2 border rounded focus:outline-none"
                value={newHabit.frequencia}
                onChange={(e) => setNewHabit({ ...newHabit, frequencia: e.target.value })}
              >
                <option>Diário</option>
                <option>Semanal</option>
                <option>Mensal</option>
                <option>Anual</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Descrição</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none"
                value={newHabit.descricao}
                onChange={(e) => setNewHabit({ ...newHabit, descricao: e.target.value })}
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-600 mb-1">Tags</label>
              <select
                className="w-full px-3 py-2 border rounded focus:outline-none"
                value={newHabit.tag}
                onChange={(e) => setNewHabit({ ...newHabit, tag: e.target.value })}
              >
                <option value="">Selecione uma Tag</option>
                {tags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>


            <button
              onClick={habitEditando ? salvarEdicaoHabit : handleAddHabit}
              className="bg-[#2549BE] hover:bg-blue-800 text-white w-full py-2 rounded font-semibold mb-2"
            >
              {habitEditando ? 'Salvar Alterações' : 'Adicionar'}
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setNewHabit({ nome: '', frequencia: '', descricao: '', tag: '' });
                setHabitEditando(null);
              }}
              className="text-sm text-gray-500 underline w-full text-center"
            >
              Cancelar
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
