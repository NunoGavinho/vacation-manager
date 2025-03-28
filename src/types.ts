export type User = {
    email: string
    position: string
    role: 'admin' | 'user'
}

export type MyEvent = {
    id: number
    title: string
    start: Date
    end: Date
    status?: 'pending' | 'approved' | 'rejected'
    allDay?: boolean
}
