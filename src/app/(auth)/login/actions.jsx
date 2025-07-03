'use client';

import { login } from '@/services/auth';

export async function handleLogin({ email, password }) {
    const data = await login({ email, password });
    const token = data?.token;
    if (!token) throw new Error('Token não recebido');

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(data.name));
    localStorage.setItem('avatar', data.avatar || '');
    localStorage.setItem('userId', data.userId);
    console.log('Login realizado com sucesso:', data);
    return data;
}
