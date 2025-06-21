import Input from "../Input";
import Button from '../../../Button';
import Divider from '../../../Divider';
import Link from 'next/link';
import PasswordInput from "../PasswordInput";
import { useState } from "react";

export default function RegisterForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '', 
        name: ''
    })
    
    return (
        <div className="flex flex-col justify-start w-full h-full p-12">
            <form onSubmit={(e) => onSubmit(e, formData)} className="w-full">
                <h2 className="text-2xl font-bold mb-14">Constantia</h2>
                <h3 className="text-lg font-bold mb-4">Comece agora</h3>
                <Input 
                    id="name" 
                    label="Nome" 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}  
                    placeholder="Nome" 
                    required 
                />
                <Input 
                    id="email" 
                    label="Email" 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    placeholder="Email" 
                    required 
                />
                <PasswordInput
                    id="password" 
                    label="Senha" 
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    placeholder="Senha" 
                    required
                />
                <Button type="submit" className="w-full">
                    Registrar
                </Button>
            </form>
            <Divider />
            <div className="flex flex-col h-full justify-between items-center">
                <div className="mt-2">
                    <span className="text-sm text-gray-600">
                        Já tem uma conta?{' '}
                        <Link href="/login" className="text-[#2549BE] hover:underline">
                            Entre agora
                        </Link>
                    </span>
                </div>
                <div className="mb-2">
                    <span className="text-sm text-gray-600">© Constantia 2025</span>
                </div>
            </div>
        </div>
    )
}
