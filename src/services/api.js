import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**

 * @returns {Promise<Array>}
 */
export async function getHabits() {
    try {
 
        const response = await api.get('/habits');
        
        const habits = response.data.map(habit => ({
            id: habit.id,
            nome: habit.name || habit.nome, 
            frequencia: habit.frequency || habit.frequencia,
            diasFeitos: habit.completedDays || habit.diasFeitos || []
        }));
        
        return habits;
    } catch (error) {
        console.error('Erro ao buscar hábitos:', error);
        return [];
    }
}

export default api;