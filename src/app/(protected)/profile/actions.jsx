import api from '@/services/api';

export async function getUser() {
    const response = await api.get(`/user/me`);
    return response.data;
}
