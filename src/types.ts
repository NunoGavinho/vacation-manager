// src/types.ts
export interface MyEvent {
    id: number
    title: string
    start: Date
    end: Date
    status: 'pending' | 'approved' | 'rejected'
    userEmail: string
}

export interface User {
    email: string
    role: 'admin' | 'user'
    position: string
}