import Input from './Input';
import Button from '../../../Button';
import Switch from './Switch';
import Divider from '../../../Divider';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';

export default function AuthForm({ onSubmit }) {
    const handleGoogleLogin = (credentialResponse) => {
        console.log('Google Login Success:', credentialResponse);
    };
    const handleGoogleLoginError = () => {
        console.log('Google Login Failed');
    };

    return (
        <div className="flex flex-col justify-start w-full h-full p-12">
            <form onSubmit={onSubmit} className="w-full">
                <h2 className="text-2xl font-bold mb-14">Constantia</h2>
                <h3 className="text-lg font-bold mb-4">É bom te ver de novo</h3>
                <Input id="email" label="Login" type="email" placeholder="Email" required />
                <Input id="password" label="Senha" type="password" placeholder="Senha" required />
                <Switch />
                <Button type="submit" className="w-full">
                    Entrar
                </Button>
            </form>
            <Divider />
            <GoogleLogin
                theme="filled_black"
                logo_alignment="center"
                onSuccess={handleGoogleLogin}
                onError={handleGoogleLoginError}
            />
            <div className="flex flex-col h-full justify-between items-center">
                <div className="mt-2">
                    <span className="text-sm text-gray-600">
                        Não tem uma conta?{' '}
                        <Link href="/register" className="text-[#2549BE] hover:underline">
                            Registre-se agora
                        </Link>
                    </span>
                </div>
                <div className="mb-2">
                    <span className="text-sm text-gray-600">© Constantia 2025</span>
                </div>
            </div>
        </div>
    );
}
