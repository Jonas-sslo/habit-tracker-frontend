'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Image from 'next/image';
import { AccountCircle } from '@mui/icons-material';
import Input from '../components/features/auth/Input';
import { getUser } from './actions';

export default function Profile() {
  const [userName, setUserName] = useState('Usuário');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const avatar = localStorage.getItem('avatar');
    if (avatar) setAvatar(avatar);
    const fetch = async () => {
      try {
        const data = await getUser();
        setUserName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error.message);
      }
    };
    fetch();
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen light:bg-[#DBEDFB] overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 p-4 ml-16 md:ml-20 lg:ml-24">
        <div className="py-6">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold">Bem vindo ao seu perfil, {userName}</h1>
        </div>

        <div className="-ml-16 md:-ml-20 lg:-ml-24 -mr-4">
          <div className="h-0.5 bg-[#2549BE] my-6" />
        </div>

        <div className="flex flex-col items-center mt-8">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-8">
              {avatar ? (
                <Image
                  src={avatar}
                  width={300}
                  height={300}
                  className="rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <AccountCircle
                  style={{ width: 300, height: 300 }}
                  className="text-gray-400"
                />
              )}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Input label="Nome" value={userName} readOnly />
              <Input label="Email" value={email} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
