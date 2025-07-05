'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { getGray300Or600, getHomeBg } from '../utils/theme';
import { useTheme } from 'next-themes';
import { FREQUENCIES } from '../utils/frequencies';
import { getTags } from '@/services/tags';
import { MultiSelect } from '../components/features/home/MultiSelect';
import Select from '../components/features/home/Select';
import Input from '../components/features/auth/Input';

export default function StatisticsPage() {
  const { theme } = useTheme();
  const [filters, setFilters] = useState({
    tags: [],
    frequency: '',
    startDate: '',
    endDate: '',
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [tags, setTags] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    const fetchTags = async () => { 
      try {
        const tags = await getTags();
        setTags(tags);
      } catch (err) {
        console.error('Erro ao buscar tags:', err);
      }
    };
    fetchTags();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (selectedTags) => {
    setFilters({ ...filters, tags: selectedTags });
  };

  const fetchReport = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/api/stats', {
        headers: { Authorization: `Bearer ${token}` },
        params: { 
          format: 'json', 
          ...filters,
          tags: filters.tags.join(','),
        },
      });
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const now = new Date().toLocaleString('pt-BR');
  
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text('Relatório de Hábitos', 105, 20, { align: 'center' });
  
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Gerado em: ${now}`, 105, 28, { align: 'center' });
    const tableColumn = ['Hábito', 'Frequência', 'Esperado', 'Positivos', 'Negativos'];
    const tableRows = [];
  
    data.forEach(habit => {
      const habitData = [
        habit.title,
        FREQUENCIES[habit.frequency],
        habit.expected.toString(),
        habit.positive.toString(),
        habit.negative.toString()
      ];
      tableRows.push(habitData);
    });
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: {
        fontSize: 10,
        halign: 'center',
        valign: 'middle'
      },
      headStyles: {
        fillColor: [63, 81, 181], 
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { halign: 'left' } 
      },
      margin: { left: 14, right: 14 }
    });
  
    doc.save('relatorio-habitos.pdf');
  };
  

  return (
    <Layout>
      <div className={`flex flex-col md:flex-row h-screen ${getHomeBg(theme)} relative`}>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex flex-col justify-center border-b-[1px] border-b-[#2549BE] px-8 pt-4">
            <h1 className="text-2xl lg:text-4xl font-semibold mb-1">Constância que se vê</h1>
            <p className={`text-sm lg:text-base mb-6 ${getGray300Or600(theme)}`}>
              Progresso real começa com passos visíveis.
            </p>
          </div>
          <div className="flex flex-col h-full overflow-y-auto px-4 lg:px-8 py-4 lg:py-6 gap-6">
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MultiSelect
                id="tags"
                placeholder="Selecione as tags"
                name="tags"
                options={tags.map(t => ({ value: t.name, label: t.name }))}
                value={filters.tags}
                onChange={handleTagsChange}
                theme={theme}
                className="!mb-0"
              />
              <Select
                id="frequency"
                name="frequency"
                placeholder="Selecione uma frequência"
                options={[
                  { value: 'daily', label: 'Diário' },
                  { value: 'weekly', label: 'Semanal' },
                  { value: 'monthly', label: 'Mensal' },
                  { value: 'yearly', label: 'Anual' },
                ]}
                value={filters.frequency}
                theme={theme}
                onChange={handleChange}
                className="!mb-0"
              />
              <Input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
                className="!mb-0"
              />
              <Input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
                className="!mb-0"
              />
            </div>
            
            {/* Botões */}
            <div className="flex gap-4 mb-6">
              <Button
                onClick={fetchReport} 
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Ver Relatório
              </Button>
              <Button 
                onClick={downloadPDF} 
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Baixar PDF
              </Button>
            </div>
            {/* Resultados */}
            {loading && <p>Carregando...</p>}
            {data.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2 text-left text-black">Hábito</th>
                      <th className="border p-2 text-left text-black">Frequência</th>
                      <th className="border p-2 text-center text-black">Esperado</th>
                      <th className="border p-2 text-center text-green-600">Positivos</th>
                      <th className="border p-2 text-center text-red-600">Negativos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((habit, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">{habit.title}</td>
                        <td className="border p-2">{FREQUENCIES[habit.frequency]}</td>
                        <td className="border p-2 text-center">{habit.expected}</td>
                        <td className="border p-2 text-center">{habit.positive}</td>
                        <td className="border p-2 text-center">{habit.negative}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
