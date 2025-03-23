// src/services/authService.ts
import { User } from '../models/User'; // Importe a interface User

export const authService = {
    login: async (email: string, password: string): Promise<User | null> => {
        // Simulação de login bem-sucedido
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@example.com' && password === 'password') {
                    const user: User = {
                        id: '1',
                        email: email,
                        role: 'admin',
                    };
                    resolve(user);
                } else if (email === 'user@example.com' && password === 'password') {
                    const user: User = {
                        id: '2',
                        email: email,
                        role: 'user',
                    };
                    resolve(user);
                } else {
                    reject(new Error('Invalid credentials')); // Simula um erro de credenciais inválidas
                }
            }, 500); // Simula um atraso de 500ms
        });
    },
    logout: () => {
        // Lógica de logout aqui (remover token, etc.)
    },
};