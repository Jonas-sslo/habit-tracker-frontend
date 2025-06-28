import api from "./api";

export async function getHabits() {
    const response = await api.get('/habits/all');
    return response.data;
}

export async function createHabit( { name, frequency, description, tag }) {
    const response = await api.post('/habits/create', { name, frequency, description, tag });
    return response.data;
}

export async function updateHabit(id, { name, frequency, description, tag }) {
    const response = await api.put(`/habits/update/${id}`, { name, frequency, description, tag });
    return response.data;
}

export async function deleteHabit(id) {
    const response = await api.delete(`/habits/delete/${id}`);
    return response.data;
}