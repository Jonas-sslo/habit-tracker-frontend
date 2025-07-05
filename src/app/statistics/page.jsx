'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { getHomeBg } from '../utils/theme';
import { useTheme } from 'next-themes';

export default function StatisticsPage() {
    const { theme } = useTheme();
    const [filters, setFilters] = useState({
        tags: '',
        frequency: '',
        startDate: '',
        endDate: '',
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const fetchReport = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3001/api/stats', {
                headers: { Authorization: `Bearer ${token}` },
                params: { format: 'json', ...filters },
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

        data.forEach((habit) => {
            const habitData = [
                habit.title,
                habit.frequency,
                habit.expected.toString(),
                habit.positive.toString(),
                habit.negative.toString(),
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
                valign: 'middle',
            },
            headStyles: {
                fillColor: [63, 81, 181],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },
            columnStyles: {
                0: { halign: 'left' },
            },
            margin: { left: 14, right: 14 },
        });

        doc.save('relatorio-habitos.pdf');
    };

    return (
        <Layout>
            <div className={`flex flex-col md:flex-row h-screen ${getHomeBg(theme)} relative`}>
                {/* A margem esquerda precisa ser compatível com o width da sidebar */}
                <div className="flex-1 p-6 ml-20">
                    <h1 className="text-3xl font-bold mb-6">Estátistica do Usuário</h1>
                    {/* filtros */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            name="tags"
                            placeholder="Tags (vírgulas)"
                            value={filters.tags}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <select
                            name="frequency"
                            value={filters.frequency}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        >
                            <option value="">Frequência</option>
                            <option value="Daily">Diária</option>
                            <option value="Weekly">Semanal</option>
                            <option value="Monthly">Mensal</option>
                        </select>
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>
                    {/* botões */}
                    <div className="flex gap-4 mb-6">
                        <Button onClick={fetchReport} color="gray">
                            Ver Relatório
                        </Button>
                        <Button onClick={downloadPDF} color="gray">
                            Baixar PDF
                        </Button>
                    </div>
                    {loading && <p>Carregando...</p>}
                    {data.length > 0 && (
                        <table className="w-full border text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2 text-left">Hábito</th>
                                    <th className="border p-2 text-left">Frequência</th>
                                    <th className="border p-2 text-center">Esperado</th>
                                    <th className="border p-2 text-center text-green-600">
                                        Positivos
                                    </th>
                                    <th className="border p-2 text-center text-red-600">
                                        Negativos
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((habit, idx) => (
                                    <tr key={idx}>
                                        <td className="border p-2">{habit.title}</td>
                                        <td className="border p-2">{habit.frequency}</td>
                                        <td className="border p-2 text-center">{habit.expected}</td>
                                        <td className="border p-2 text-center">{habit.positive}</td>
                                        <td className="border p-2 text-center">{habit.negative}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </Layout>
    );
}
