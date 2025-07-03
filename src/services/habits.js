import api from './api';

const BASE_URL = '/habits';

export async function getHabits() {
    const response = await api.get(`${BASE_URL}/all`);
    return response.data;
}

export async function createHabit({ name, frequency, description, tag }) {
    const response = await api.post(`${BASE_URL}`, { name, frequency, description, tag });
    return response.data;
}

export async function updateHabit(id, { name, frequency, description, tag }) {
    const response = await api.put(`${BASE_URL}/update/${id}`, {
        name,
        frequency,
        description,
        tag,
    });
    return response.data;
}

export async function deleteHabit(id) {
    const response = await api.delete(`${BASE_URL}/delete/${id}`);
    return response.data;
}
