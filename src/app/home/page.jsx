'use client';

import { useEffect, useState } from 'react';
import { getHabits } from '@/services/api';
import { useRouter } from 'next/navigation';
import { format, isSameMonth, isSameWeek, isSameDay, parseISO, startOfWeek, addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const goToAddHabit = () => {
    router.push('/habits/add');
  };

  const goToProfile = () => {
    router.push('/profile');
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
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Meus Hábitos</h1>
        <div className="flex gap-4">
          <select
            value={view}
            onChange={e => setView(e.target.value)}
            className="p-2 rounded-md border border-gray-300"
          >
            <option value="anual">Anual</option>
            <option value="mensal">Mensal</option>
            <option value="semanal">Semanal</option>
            <option value="diária">Diária</option>
          </select>
          <button
            onClick={goToAddHabit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Adicionar Hábito
          </button>
          <button
            onClick={goToProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Minha Conta
          </button>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map(habit => (
          <div key={habit.id} className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-1">{habit.nome}</h2>
            <p className="text-gray-500 mb-2">{habit.frequencia}</p>
            {renderView(habit)}
          </div>
        ))}
      </div>
    </main>
  );
}