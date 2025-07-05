'use client';

import AuthGuard from '@/app/(auth)/AuthGuard';
import Layout from '../components/Layout';

export default function ProtectedLayout({ children }) {
    return (
        <AuthGuard>
            <Layout>{children}</Layout>
        </AuthGuard>
    );
}
