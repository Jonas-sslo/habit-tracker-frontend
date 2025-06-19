import { NextResponse } from 'next/server';

// TODO
// Adicionar tratamento de autenticação
// e redirecionamento para a página de login caso não autenticado
export function middleware(request) {
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}
