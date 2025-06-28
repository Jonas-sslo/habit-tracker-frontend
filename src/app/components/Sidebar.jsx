'use client';

import { AccountCircleOutlined, DarkModeOutlined, ExitToApp, HomeOutlined, LightModeOutlined, ShowChart, VapingRooms } from "@mui/icons-material";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [avatar, setAvatar] = useState(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const onHome = () => {
    router.push('/home');
  };

  const onStatistics = () => {
    router.push('/statistics');
  };

  const onProfile = () => {
    router.push('/profile');
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('avatar');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    router.push('/login')
  };

  useEffect(() => {
    setMounted(true);
    const avatar = localStorage.getItem('avatar');
    if (avatar) setAvatar(avatar);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) return null;
  
  return (
    <div className="bg-[#2549BE] text-white h-screen fixed md:w-20 lg:w-22 transition-all duration-300">
      <nav className="flex flex-col h-full items-center pt-8">
        <div className="flex flex-col items-center space-y-4">
          <button className="p-2 rounded-lg hover:bg-[#1a3a9a]">
            <Image
              src='/logo-icon-white.png'
              alt="Constantia Logo"
              style={{ objectFit: "contain" }}
              width={40}
              height={40}
            />
          </button>
          <hr className="w-8 border-t" />
          <button onClick={onHome} className="p-2 rounded-lg hover:bg-[#1a3a9a] cursor-pointer">
            <HomeOutlined />
          </button>
          <button onClick={onStatistics} className="p-2 rounded-lg hover:bg-[#1a3a9a] cursor-pointer">
            <ShowChart />
          </button>
        </div>

        <div className="mt-auto flex flex-col items-center space-y-4 pb-8">
          <button onClick={onProfile} className="p-2 rounded-lg hover:bg-[#1a3a9a] cursor-pointer">
            {avatar ? (
              <Image 
                src={avatar}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <AccountCircleOutlined style={{ width: 36, height: 36 }}/>
            )}
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-[#1a3a9a] cursor-pointer">
            {theme === 'dark' ? (
              <LightModeOutlined  />
            ) : (
              <DarkModeOutlined />
            )}
          </button>
          <button onClick={onLogout} className="p-2 rounded-lg hover:bg-[#1a3a9a] cursor-pointer">
            <ExitToApp />
          </button>
        </div>
      </nav>
    </div>
  );
}
