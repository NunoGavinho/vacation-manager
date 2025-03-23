import React, { useState } from 'react';
import { authService } from '../services/authService';
import { User } from '../models/User'; // Importe a interface User

interface AuthProps {
    onLogin: (user: User) => void; // Função para lidar com o login
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // Estado para erros

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Limpa erros anteriores
        try {
            const user = await authService.login(email, password); // Chama o serviço de autenticação
            if (user) {
                onLogin(user); // Chama a função onLogin para atualizar o estado no App
            } else {
                setError('Invalid credentials'); // Define um erro genérico
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred'); // Captura erros da API
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe erros */}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required // Torna o campo obrigatório
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required // Torna o campo obrigatório
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Auth;