import api from './api';

export async function login({ email, password }) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
}

export async function register({ email, password, name }) {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
}

export async function loginWithGoogleToken(token) {
    const response = await api.post('/auth/google', { token });
    return response.data;
}