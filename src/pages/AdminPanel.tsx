import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { MyEvent } from '../types'

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
                userEmail: e.userEmail || 'Não registado'
            }))
            setEvents(parsedEvents.filter(e => e.status === 'pending'))
        }
    }, [])

    const handleDecision = (id: number, status: 'approved' | 'rejected') => {
        const updated = events.map(event =>
            event.id === id ? { ...event, status } : event
        )
        localStorage.setItem('vacationEvents', JSON.stringify(updated))
        setEvents(updated.filter(e => e.status === 'pending'))
    }

    if (!user) return <Loading>Carregando...</Loading>

    return (
        <Wrapper>
            <Header>Vertsa Play</Header>

            <UserContainer>
                <UserInfo>
                    <UserEmail>{user.email}</UserEmail>
                    <UserRole>{user.role.toUpperCase()}</UserRole>
                </UserInfo>
                <SignOutButton onClick={logout}>Sair</SignOutButton>
            </UserContainer>

            <Title>Pedidos Pendentes</Title>

            <RequestList>
                {events.length > 0 ? (
                    events.map(event => (
                        <RequestItem key={event.id}>
                            <RequestDetails>
                                <RequestTitle>{event.title}</RequestTitle>
                                <RequestMeta>
                                    <strong>Solicitante:</strong> {event.userEmail}
                                </RequestMeta>
                                <RequestMeta>
                                    <strong>Período:</strong> {event.start.toLocaleDateString('pt-PT')} → {event.end.toLocaleDateString('pt-PT')}
                                </RequestMeta>
                            </RequestDetails>
                            <RequestActions>
                                <ApproveButton onClick={() => handleDecision(event.id, 'approved')}>
                                    Aprovar
                                </ApproveButton>
                                <RejectButton onClick={() => handleDecision(event.id, 'rejected')}>
                                    Rejeitar
                                </RejectButton>
                            </RequestActions>
                        </RequestItem>
                    ))
                ) : (
                    <EmptyState>Nenhuma solicitação pendente</EmptyState>
                )}
            </RequestList>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    min-height: 100vh;
    padding: 2rem;
    background: linear-gradient(90deg, #ff6a00 70%, #1f005c 100%);
    color: white;
    font-family: 'Poppins', sans-serif;
`

const Header = styled.h1`
    font-size: 2rem;
    font-weight: 600;
    border: 2px solid white;
    padding: 0.5rem 1.5rem;
    width: fit-content;
    margin-bottom: 2rem;
`

const UserContainer = styled.div`
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const UserEmail = styled.span`
    font-size: 1rem;
    font-weight: 500;
`

const UserRole = styled.span`
    font-size: 0.9rem;
    color: #ddd;
    text-transform: capitalize;
`

const SignOutButton = styled.button`
    background: transparent;
    border: 1px solid white;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`

const Title = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
`

const RequestList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const RequestItem = styled.div`
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
    &:hover {
        background: rgba(255, 255, 255, 0.15);
    }
`

const RequestDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const RequestTitle = styled.span`
    font-size: 1.1rem;
    font-weight: 500;
`

const RequestMeta = styled.span`
    font-size: 0.9rem;
    color: #ddd;
    strong {
        color: white;
        font-weight: 500;
    }
`

const RequestActions = styled.div`
    display: flex;
    gap: 0.75rem;
`

const ApproveButton = styled.button`
    background: #4caf50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
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
    font-weight: 500;
    transition: all 0.2s;
    &:hover {
        background: #d32f2f;
    }
`

const EmptyState = styled.div`
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    color: #ccc;
    font-style: italic;
`

const Loading = styled.div`
    text-align: center;
    padding: 2rem;
    color: white;
    font-size: 1.2rem;
`