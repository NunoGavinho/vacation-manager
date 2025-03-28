export type EventStatus = 'pending' | 'approved' | 'rejected'

export interface MyEvent {
    id: number
    title: string
    start: Date
    end: Date
    status: EventStatus
    userEmail: string
}

export interface User {
    email: string
    role: 'admin' | 'user'
    position: string
}