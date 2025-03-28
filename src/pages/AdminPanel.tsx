import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { MyEvent, User } from '../types'

export default function AdminPanel() {
    const { user, logout } = useAuth()
    const [events, setEvents] = useState<MyEvent[]>([])

    useEffect(() => {
        const storedEvents = localStorage.getItem('vacationEvents')
        if (storedEvents) {
            const parsedEvents: MyEvent[] = JSON.parse(storedEvents).map((e: any) => ({
                ...e,
                start: new Date(e.start),
                end: new Date(e.end),
                userEmail: e.userEmail || 'Não especificado'
            }))
            setEvents(parsedEvents.filter(e => e.status === 'pending' && e.userEmail !== user?.email))
        }
    }, [user?.email])

    const updateEventStatus = (eventId: number, status: 'approved' | 'rejected') => {
        const storedEvents = localStorage.getItem('vacationEvents')
        if (storedEvents) {
            const allEvents: MyEvent[] = JSON.parse(storedEvents).map((e: any) => ({
                ...e,
                start: new Date(e.start),
                end: new Date(e.end)
            }))

            const updatedEvents = allEvents.map(event =>
                event.id === eventId ? { ...event, status } : event
            )

            localStorage.setItem('vacationEvents', JSON.stringify(updatedEvents))
            setEvents(updatedEvents.filter(e => e.status === 'pending' && e.userEmail !== user?.email))
        }
    }

    if (!user) {
        return (
            <Loading>
                <p>Carregando...</p>
            </Loading>
        )
    }

    return (
        <Wrapper>
            <Header>Admin Dashboard</Header>

            <UserInfo>
                <div>
                    <UserEmail>{user.email}</UserEmail>
                    <UserRole>{user.role.toUpperCase()}</UserRole>
                </div>
                <SignOutButton onClick={logout}>Sair</SignOutButton>
            </UserInfo>

            <Title>Blocos Pendentes para Aprovação</Title>

            {events.length === 0 ? (
                <EmptyMessage>Não há blocos pendentes para aprovação.</EmptyMessage>
            ) : (
                <EventsList>
                    {events.map(event => (
                        <EventItem key={event.id}>
                            <EventDetails>
                                <EventTitle>{event.title}</EventTitle>
                                <EventDates>
                                    {event.start.toLocaleDateString('pt-PT')} - {event.end.toLocaleDateString('pt-PT')}
                                </EventDates>
                                <EventUser>Solicitado por: {event.userEmail}</EventUser>
                            </EventDetails>
                            <EventActions>
                                <ApproveButton onClick={() => updateEventStatus(event.id, 'approved')}>
                                    Aprovar
                                </ApproveButton>
                                <RejectButton onClick={() => updateEventStatus(event.id, 'rejected')}>
                                    Rejeitar
                                </RejectButton>
                            </EventActions>
                        </EventItem>
                    ))}
                </EventsList>
            )}
        </Wrapper>
    )
}

// Estilos completos e corrigidos
const Wrapper = styled.div`
    padding: 2rem;
    background: #f5f5f5;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
`

const Header = styled.h1`
    color: #333;
    margin-bottom: 2rem;
    border-bottom: 2px solid #333;
    padding-bottom: 0.5rem;
`

const UserInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const UserEmail = styled.p`
    font-weight: bold;
    margin: 0;
    color: #333;
`

const UserRole = styled.p`
    margin: 0;
    color: #666;
    font-size: 0.9rem;
`

const SignOutButton = styled.button`
    background: #ff4444;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #cc0000;
    }
`

const Title = styled.h2`
    color: #333;
    margin-bottom: 1.5rem;
`

const EventsList = styled.div`
    display: grid;
    gap: 1rem;
`

const EventItem = styled.div`
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const EventDetails = styled.div`
    flex: 1;
`

const EventTitle = styled.h3`
    margin: 0 0 0.5rem 0;
    color: #333;
`

const EventDates = styled.p`
    margin: 0 0 0.5rem 0;
    color: #555;
`

const EventUser = styled.p`
    margin: 0 0 0.5rem 0;
    color: #555;
    font-style: italic;
`

const EventActions = styled.div`
    display: flex;
    gap: 0.5rem;
`

const ApproveButton = styled.button`
    background: #4CAF50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #3e8e41;
    }
`

const RejectButton = styled.button`
    background: #f44336;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #d32f2f;
    }
`

const EmptyMessage = styled.p`
    color: #666;
    text-align: center;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const Loading = styled.div`
    text-align: center;
    padding: 2rem;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.2rem;
`