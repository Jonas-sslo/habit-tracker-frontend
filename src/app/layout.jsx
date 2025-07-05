import { ThemeProvider } from 'next-themes';
import './globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/app/(auth)/AuthContext';

export const metadata = {
    title: 'Constantia',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1.0,
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br" suppressHydrationWarning>
            <body className="antialiased">
                <AuthProvider>
                    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
                        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                            {children}
                        </GoogleOAuthProvider>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
