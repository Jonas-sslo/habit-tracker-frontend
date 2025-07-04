import api from './api';

const BASE_URL = '/tags';

export async function getTags() {
    const response = await api.get(BASE_URL);
    return response.data;
}

export async function createTag(name) {
    const response = await api.post(BASE_URL, { name });
    return response.data;
}
