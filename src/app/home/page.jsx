'use client';

import { useEffect, useState } from 'react';
import { getHabits } from '@/services/api';
import { useRouter } from 'next/navigation';
import { format, isSameMonth, isSameDay, parseISO, startOfWeek, addDays } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
import ptBR from 'date-fns/locale/pt-BR';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [view, setView] = useState('anual');
  const router = useRouter();
  const today = new Date();

  useEffect(() => {
    async function fetch() {
      const data = await getHabits();
      setHabits(data);
    }
    fetch();
  }, []);

  const goToAddHabit = () => {
    router.push('/habits/add');
  };

  const renderView = (habit) => {
    const dias = habit.diasFeitos.map(parseISO);

    switch (view) {
      case 'anual':
        return (
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
            {Array.from({ length: 12 }, (_, i) => {
              const month = i;
              const diasDoMes = dias.filter(d => d.getMonth() === month);
              return (
                <div key={i} className="p-2 border rounded">
                  <strong>{format(new Date(2025, month), 'MMMM', { locale: ptBR })}</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {diasDoMes.map((d, idx) => (
                      <span key={idx} className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs">
                        {d.getDate()}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'mensal':
        return (
          <div className="flex flex-wrap gap-2">
            {dias.filter(d => isSameMonth(d, today)).map((d, i) => (
              <span key={i} className="bg-blue-600 text-white px-2 py-0.5 rounded">
                {format(d, 'dd/MM')}
              </span>
            ))}
          </div>
        );

      case 'semanal':
        const semanaInicio = startOfWeek(today, { weekStartsOn: 1 });
        return (
          <div className="flex flex-col gap-1">
            {Array.from({ length: 7 }, (_, i) => {
              const dia = addDays(semanaInicio, i);
              const fez = dias.some(d => isSameDay(d, dia));
              return (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-20">{format(dia, 'EEE dd', { locale: ptBR })}</span>
                  <span className={`h-3 w-3 rounded-full ${fez ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                </div>
              );
            })}
          </div>
        );

      case 'diária':
        return (
          <div className="flex flex-col gap-1">
            {dias
              .filter(d => isSameDay(d, today))
              .map((d, i) => (
                <span key={i} className="text-sm text-blue-600">
                  {format(d, 'HH:mm')}h
                </span>
              ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 p-4 ml-16 md:ml-20 lg:ml-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 py-5 gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold px-5">Seus Hábitos</h1>
          <div className="text-lg md:text-lg py-4 px-5 text-gray-400">Acompanhe seu progresso ao longo do tempo</div>
        </div>
        <div className="flex flex-wrap gap-6 px-5 w-full md:w-auto">
          <Button onClick={() => setView('anual')} color="gray">
            Anual
          </Button>
          <Button onClick={() => setView('mensal')} color="gray">
            Mensal
          </Button>
          <Button onClick={() => setView('semanal')} color="gray">
            Semanal
          </Button>
          <Button onClick={() => setView('diária')} color="gray">
            Diária
          </Button>
          <Button onClick={goToAddHabit} className="flex items-center gap-1">
            <AddIcon /> Adicionar Hábito
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {habits.map(habit => (
          <div key={habit.id} className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-1">{habit.nome}</h2>
            <p className="text-gray-500 mb-2">{habit.frequencia}</p>
            {renderView(habit)}
          </div>
        ))}
      </div>
    </div>
  </div>
);
}