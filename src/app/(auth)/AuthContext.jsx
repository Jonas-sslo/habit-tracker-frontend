'use client';

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUserFromToken = useCallback(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } catch (error) {
            console.error('Token inválido:', error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUserFromToken();
    }, [loadUserFromToken]);

    const value = useMemo(() => ({
        user,
        loading,
        setUser, // pode ser usado para login/logout depois
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }
    return context;
}