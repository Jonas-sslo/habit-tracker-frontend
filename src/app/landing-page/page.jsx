'use client';

import { useRouter } from 'next/navigation';
import NavBar from '@/app/components/features/landing-page/NavBar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function LandingPage() {
    const router = useRouter();
    const onLogin = () => router.push('/login');

    return (
        <main className="min-h-screen bg-gray-100 scroll-smooth">
            <NavBar />
            <HeroSection onLogin={onLogin} />
            <FeaturesSection />
            <CallToAction onLogin={onLogin} />
            <Footer />
        </main>
    );
}
