'use client';

import './globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br">
            <body className="antialiased">
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                    {children}
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
