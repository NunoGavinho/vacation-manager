import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Users from './pages/Users'
import { useAuth } from './context/AuthContext'

export default function App() {
    const { user, logout } = useAuth()

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            {user && (
                <Route
                    path="/dashboard"
                    element={<Dashboard user={user} signOut={logout} />}
                />
            )}
            {user?.role === 'admin' && (
                <Route
                    path="/admin"
                    element={<AdminPanel user={user} signOut={logout} />}
                />
            )}
            <Route path="/users" element={<Users />} />
        </Routes>
    )
}
