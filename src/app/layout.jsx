'use client';

import { ThemeProvider } from 'next-themes';
import './globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br" suppressHydrationWarning>
            <body className="antialiased">
                <ThemeProvider attribute="class" enableSystem defaultTheme="system">
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                        {children}
                    </GoogleOAuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
