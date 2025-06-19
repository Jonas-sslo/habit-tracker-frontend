import Input from './Input';
import Button from '../../../Button';
import Switch from './Switch';
import Divider from '../../../Divider';
import { handleGoogleLogin, handleGoogleLoginError } from '@/app/(auth)/login/actions';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useState } from 'react';

export default function AuthForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    return (
        <div className="flex flex-col justify-start w-full h-full p-12">
            <form onSubmit={(e) => onSubmit(e, formData)} className="w-full">
                <h2 className="text-2xl font-bold mb-14">Constantia</h2>
                <h3 className="text-lg font-bold mb-4">É bom te ver de novo</h3>
                <Input 
                    id="email" 
                    label="Login" 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    placeholder="Insira o email" 
                    required 
                />
                <Input 
                    id="password" 
                    label="Senha" 
                    type="password" 
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    placeholder="Insira a senha" 
                    required 
                />
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
