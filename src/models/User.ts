// src/models/User.ts
export interface User {
    id: string;
    email: string;
    role: 'admin' | 'user'; // Adicionado o campo 'role'
}