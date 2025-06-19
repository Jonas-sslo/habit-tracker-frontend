'use client';

import { login, loginWithGoogleToken } from '@/services/auth';

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

export async function handleGoogleLogin(credentialResponse) {
    const token = credentialResponse?.credential;

    if (!token) throw new Error('Token do Google inválido');

    const data = await loginWithGoogleToken(token);

    if (!data?.token) throw new Error('Token não recebido do Google');
    console.log('Login com Google realizado com sucesso:', data);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.name));
    localStorage.setItem('avatar', data.avatar || '');
    localStorage.setItem('userId', data.userId);
    return data;
}

export function handleGoogleLoginError() {
    console.error('Falha no login com o Google');
}
