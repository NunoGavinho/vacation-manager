import React, { useState } from 'react'
import { MyEvent } from './Dashboard'
import { useAuth } from '../context/AuthContext'

export default function Admin() {
    const { user } = useAuth()  // Podemos verificar se o usuário é admin aqui, se necessário
    const [events, setEvents] = useState<MyEvent[]>([]) // Lista de eventos a serem aprovados ou rejeitados


    const fetchPendingEvents = () => {

        const pendingEvents: MyEvent[] = [
            {
                id: 1,
                title: 'Férias de João',
                start: new Date('2023-06-01'),
                end: new Date('2023-06-05'),
                status: 'pending'
            },
            {
                id: 2,
                title: 'Férias de Maria',
                start: new Date('2023-07-01'),
                end: new Date('2023-07-07'),
                status: 'pending'
            }
        ]
        setEvents(pendingEvents)
    }


    const approveEvent = (eventId: number) => {
        setEvents(events.map(event =>
            event.id === eventId ? { ...event, status: 'approved' } : event
        ))
        alert(' Bloco aprovado!')
    }


    const rejectEvent = (eventId: number) => {
        setEvents(events.filter(event => event.id !== eventId))
        alert(' Bloco de férias rejeitado.')
    }


    const isAdmin = user?.role === 'admin'

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Admin Dashboard</h1>
            <p>Olá, {user?.email}</p>

            <h2>Blocos Pendentes para Aprovação</h2>

            <button onClick={fetchPendingEvents}>Carregar Blocos Pendentes</button>

            {events.length === 0 ? (
                <p>Não há blocos pendentes para aprovação.</p>
            ) : (
                <div>
                    {events.map(event => (
                        <div key={event.id} style={{ marginBottom: '1rem' }}>
                            <p>
                                {event.title} | {event.start.toLocaleDateString()} - {event.end.toLocaleDateString()}
                            </p>
                            <p>Status: {event.status}</p>
                            <div>
                                <button
                                    onClick={() => approveEvent(event.id)}
                                    disabled={event.status === 'approved'}
                                >
                                    Aprovar
                                </button>
                                <button
                                    onClick={() => rejectEvent(event.id)}
                                    disabled={event.status === 'approved'}
                                >
                                    Rejeitar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
