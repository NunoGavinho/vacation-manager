import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styled, { keyframes } from 'styled-components'

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        const user = login(email, password)
        if (user && user.role === 'admin') {
            navigate('/admin')
        } else if (user) {
            navigate('/dashboard')
        } else {
            setError('Credenciais inválidas.')
        }
    }

    return (
        <Container>
            <Card>
                <LogoContainer>
                    <LogoText>VERTSA PLAY</LogoText>
                </LogoContainer>
                <Form onSubmit={handleLogin}>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit">Entrar</Button>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </Form>
            </Card>
        </Container>
    )
}

// ===================== STYLE =====================

const backgroundAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(
            135deg,
            #2b0a5e 65%,
            #ff6a00 100%
    );
    background-size: 200% 200%;
    animation: ${backgroundAnimation} 20s ease infinite;
    font-family: 'Segoe UI', sans-serif;
`

const Card = styled.div`
    background: rgba(255, 255, 255, 0.05);
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    width: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LogoContainer = styled.div`
    margin-bottom: 2rem;
    border: 2px solid white;
    padding: 1rem 2rem;
    border-radius: 8px;
`

const LogoText = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 2px;
    -webkit-text-stroke: 1px white;
    color: transparent;
`

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Label = styled.label`
    color: white;
    font-weight: 500;
`

const Input = styled.input`
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;

    &:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.15);
    }
`

const Button = styled.button`
    padding: 0.75rem;
    background-color: #ffaa33;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #ffc266;
    }
`

const ErrorMessage = styled.p`
    color: #ff4d4d;
    font-size: 0.9rem;
    margin-top: 0.5rem;
`
