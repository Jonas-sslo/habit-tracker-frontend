'use client';

import { useState } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

export default function StatisticsPage() {
    const [filters, setFilters] = useState({
        tags: '',
        frequency: '',
        startDate: '',
        endDate: '',
    });

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const fetchReport = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3001/stats', {
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

    const downloadPDF = async () => {
        try {
            const res = await axios.get('http://localhost:3001/reports', {
                headers: { Authorization: `Bearer ${token}` },
                params: { format: 'pdf', ...filters },
                responseType: 'blob',
            });
            fileDownload(res.data, 'relatorio-habitos.pdf');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            {/* A margem esquerda precisa ser compatível com o width da sidebar */}
            <div className="flex-1 p-6 ml-20">
                <h1 className="text-3xl font-bold mb-6">Estátistica do Usuário</h1>

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
                        <option value="daily">Diária</option>
                        <option value="weekly">Semanal</option>
                        <option value="monthly">Mensal</option>
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
                                <th className="border p-2 text-center text-green-600">Positivos</th>
                                <th className="border p-2 text-center text-red-600">Negativos</th>
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
    );
}
