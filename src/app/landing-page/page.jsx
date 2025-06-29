'use client';

import { useRouter } from 'next/navigation';
import NavBar from '@/app/components/features/landing/NavBar';
import HeroSection from '../components/features/landing/HeroSection';
import FeaturesSection from '../components/features/landing/FeaturesSection';
import CallToAction from '../components/features/landing/CallToAction';
import Footer from '../components/features/landing/Footer';

export default function LandingPage() {
    const router = useRouter();
    const onLogin = () => router.push('/login');

    return (
        <main className="min-h-screen light:bg-gray-100 scroll-smooth">
            <NavBar />
            <HeroSection onLogin={onLogin} />
            <FeaturesSection />
            <CallToAction onLogin={onLogin} />
            <Footer />
        </main>
    );
}
