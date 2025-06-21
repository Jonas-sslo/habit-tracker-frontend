'use client';

import { register } from "@/services/auth";

export async function handleRegister({ email, password, name }) {
   return await register({ email, password, name });;
}