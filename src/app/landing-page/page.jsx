'use client'

import { useRouter } from 'next/navigation';
import NavBar  from '@/app/components/features/landing-page/NavBar'
import Image from 'next/image'
import { BoltOutlined, FilterAltOutlined, Instagram, LinkedIn, ShowChart, Star } from '@mui/icons-material';

export default function LandingPage() {
    const router = useRouter();

    const onRegister = () => {
        router.push('/register');
    };

    return (
        <main className='min-h-screen light:bg-gray-100 scroll-smooth'>
            <div className='flex justify-between items-center w-full bg-[#2549BE] fixed'>
                <NavBar/>
            </div>
            <div className='flex items-center bg-[#2549BE] w-full h-screen p-6 justify-center pt-24' id="start">
                <div className='flex flex-col justify-between items-center text-center h-full'>
                    <div className='flex flex-col items-center gap-2 mt-10'>
                        <h1 className='text-white text-5xl mb-4'>
                            Comece a adquirir
                            <br></br>
                            hábitos em seu tempo.
                        </h1>
                        <h1 className='text-white mb-6'>
                            Mantenha controle sobre seus hábitos, estabeleça metas,
                            <br></br>
                            cheque seu histórico e transforme sua jornada.
                        </h1>
                        <button className="rounded-4xl text-center bg-white w-40 cursor-pointer dark:text-black text-m font-bold p-4" onClick={onRegister}>
                                Comece Agora
                        </button>
                    </div>
                    <button className="rounded-4xl text-center bg-neutral-800 text-white w-50 cursor-pointer text-xs font-bold p-1 justify-self-end" onClick={onRegister}>
                            <Star htmlColor='#FBBF24' fontSize='small' className='mr-2'/>
                            Experimente a Mudança
                    </button>
                </div>
            </div>
            <div className='flex flex-col bg-white-800 w-full h-fit p-6 gap-6 pr-12' id='functions'>
                <div className='flex justify-between mt-18 w-full h-fit items-end p-10'>
                    <h1 className='text-5xl font-bold'>
                        O que esperar
                    </h1>
                    <h6>
                        Manutenção de hábitos com facilidade.
                    </h6>
                </div>
                <div className='flex justify-around w-full'>
                    <div className='flex flex-col justify-start rounded-2xl bg-[#77CBB9] w-100 h-60 p-12 gap-4'>
                        <FilterAltOutlined fontSize='large' />
                        <h1 className='font-bold text-xl text-gray-900'>
                            Filtre seus hábitos
                        </h1>
                        <p className='text-gray-600'>
                            Identifique seus hábitos por meio de tags e filtros personalizados.
                        </p>
                    </div>
                    <div className='flex flex-col justify-start rounded-2xl bg-[#77CBB9] w-100 h-60 p-12 gap-4'>
                        <ShowChart fontSize='large'/>
                        <h1 className='font-bold text-xl text-gray-900'>
                            Análise de progresso
                        </h1>
                        <p className='text-gray-600'>
                            Veja seu crescimento através da sequência, gráficos e histórico.
                        </p>
                    </div>
                    <div className='flex flex-col justify-start rounded-2xl bg-[#77CBB9] w-100 h-60 p-12 gap-4'>
                        <BoltOutlined fontSize='large'/>
                        <h1 className='font-bold text-xl text-gray-900'>
                            Rastreamento de sequência
                        </h1>
                        <p className='text-gray-600'>
                            Construa hábitos fortes através da funcionalidade de acompanhamento de sequência.
                        </p>
                    </div>
                </div>
                <div className='rounded-xl flex justify-between items-end w-334 h-132 bg-[#DBEDFB] self-center p-16 mt-16' id='start-now'>
                    <div className='flex flex-col justify-end w-80 h-fit gap-8'>
                        <div className='w-full h-32'>
                            <Image
                            src='/logo-icon-black.png'
                            alt='logo'
                            style={{
                                objectFit: 'contain',
                            }}
                            width={160}
                            height={160}
                            />
                        </div>
                        <h1 className='font-400 text-6xl/20 text-gray-900'>
                            Pronto para estabelecer hábitos?
                        </h1>
                    </div>
                    <div className='flex flex-col justify-end items-end text-end gap-12 w-96'>
                        <p className='text-xl text-gray-600'>
                            Transforme seus dias com hábitos que fazem a diferença. Com o Constantia,
                            você desenvolve consistência, foca no que realmente importa e evolui continuamente.
                            Um pequeno passo por vez, rumo à sua melhor versão.
                        </p>
                        <button className="rounded-4xl text-center bg-[#FFC857] text-white w-40 h-12 cursor-pointer text-xs font-bold p-1 justify-self-end" onClick={onRegister}>
                            Comece agora
                    </button>
                    </div>
                </div>
                <div className='rounded-xl flex flex-col items-center justify-center w-334 h-98 bg-neutral-800 self-center gap-6 mt-12'>
                    <div className='flex text-white gap-1'>
                        <Image
                        src='/logo-icon-white.png'
                        alt='logo'
                        style={{
                            objectFit: 'contain'
                        }}
                        width={28}
                        height={28}
                        />
                        <h1>
                        Constantia 
                        </h1>
                    </div>
                    <p className='text-[#9CA3AF]'>
                        Mantenha controle sobre seus hábitos, estabeleça metas,
                        <br />
                        cheque seu histórico e transforme sua jornada.
                    </p>
                    <div className='flex text-[#9CA3AF] gap-1'>
                        <Instagram />
                        <LinkedIn />
                    </div>
                    <hr className='border-[#1F2937] p-2 w-9/10' />
                    <p className='text-[#6B7280]'>
                        © 2025 Constantia
                    </p>
                </div>
            </div>
        </main>
    );
}