import { ExitToApp, HomeOutlined, SettingsOutlined, ShowChart, VapingRooms } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const onHome = () => {
      router.push('/home');
  };
  const onProfile = () => {
      router.push('/profile');
  };
  const onLogout = () => {
      localStorage.removeItem('token');
      router.push('/login');
  };

  //TODO 
  // AJUSTAR icone 
  
  return (
  <div className="bg-[#2549BE] text-white h-screen fixed md:w-20 lg:w-22 transition-all duration-300">
    <nav className="flex flex-col h-full items-center pt-8">
      <div className="flex flex-col items-center space-y-4">
        <button onClick={onHome} className="rounded-lg hover:bg-[#1a3a9a]">
          <VapingRooms />
        </button>
        <hr className="w-8 border-t" />
        <button onClick={onHome} className="p-2 rounded-lg hover:bg-[#1a3a9a]">
          <HomeOutlined />
        </button>
        <button onClick={onHome} className="p-2 rounded-lg hover:bg-[#1a3a9a]">
          <ShowChart />
        </button>
      </div>

      <div className="mt-auto flex flex-col items-center space-y-4 pb-8">
        <button onClick={onProfile} className="p-2 rounded-lg hover:bg-[#1a3a9a]">
          <SettingsOutlined />
        </button>
        <button onClick={onLogout} className="p-2 rounded-lg hover:bg-[#1a3a9a]">
          <ExitToApp />
        </button>
      </div>
    </nav>
  </div>
);
}