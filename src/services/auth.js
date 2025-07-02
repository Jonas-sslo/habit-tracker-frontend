import api from './api';

const BASE_URL = '/auth';

export async function login({ email, password }) {
    const response = await api.post(`${BASE_URL}/login`, { email, password });
    return response.data;
}

export async function register({ email, password, name }) {
    const response = await api.post(`${BASE_URL}/register`, { email, password, name });
    return response.data;
}

export async function loginWithGoogleToken(token) {
    const response = await api.post(`${BASE_URL}/google`, { token });
    return response.data;
}
