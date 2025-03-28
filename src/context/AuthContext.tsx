import React, { createContext, useContext, useState, ReactNode } from 'react'

export type Role = 'admin' | 'user'

export type User = {
    id: string
    email: string
    position: string
    role: Role
}

type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => User | false
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: User[] = [
    {
        id: '1',
        email: 'admin@projeto.com',
        position: 'CTO',
        role: 'admin',
    },
    {
        id: '2',
        email: 'maria@projeto.com',
        position: 'Designer',
        role: 'user',
    },
    {
        id: '3',
        email: 'joao@projeto.com',
        position: 'Developer',
        role: 'user',
    },
]

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = (email: string, password: string): User | false => {
        const foundUser = mockUsers.find((u) => u.email === email)
        if (foundUser) {
            setUser(foundUser)
            localStorage.setItem('user', JSON.stringify(foundUser))
            return foundUser
        }
        return false
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
