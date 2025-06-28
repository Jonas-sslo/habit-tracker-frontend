import './globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
    title: 'Constantia',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1.0,
};

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
