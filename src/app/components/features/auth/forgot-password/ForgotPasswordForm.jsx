"use client";

import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  }

  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl front-extrabold text-gray-900">Esqueceu a senha?</h2>
          <p className="mt-2 text-sm text-gray-600">Vamos enviar um e-mail com instruções para redefini-lá</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            
        </form>
      </div>
    </div>
  )
}