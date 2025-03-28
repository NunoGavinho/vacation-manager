export interface UserMock {
    email: string
    password: string
    name: string
    position: string
    type: 'admin' | 'user'
}

export const mockUsers: UserMock[] = [
    {
        email: 'admin@projeto.com',
        password: 'Admin123!',
        name: 'Administrador',
        position: 'CTO',
        type: 'admin',
    },
    {
        email: 'maria@projeto.com',
        password: 'User123!',
        name: 'Maria',
        position: 'Designer',
        type: 'user',
    },
    {
        email: 'joao@projeto.com',
        password: 'User123!',
        name: 'João',
        position: 'Developer',
        type: 'user',
    },
]
