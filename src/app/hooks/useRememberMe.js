'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from "../(auth)/AuthContext";
import { useEffect } from "react";

export function useRememberMe(redirectTo = '/home') {
  const { user, loading } = useAuth(); 
  const router = useRouter();  

  useEffect(() => {
      if (loading) return;
      const token = localStorage.getItem('token');    
      if (user && token) {
        router.replace(redirectTo);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.replace('/login');
      }
  }, [loading, user, redirectTo, router]); 

  return { user, loading };
}