import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

type MyEvent = {
    id: number
    title: string
    start: Date
    end: Date
    status: 'pending' | 'approved' | 'rejected'
    userEmail: string // Garantir que este campo existe
}

type User = {
    email: string
    role: 'admin' | 'user'
    position: string
}

type AdminPanelProps = {
    user: User
    signOut: () => void
}

export default function AdminPanel({ user, signOut }: AdminPanelProps) {
    const [requests, setRequests] = useState<MyEvent[]>([])

    useEffect(() => {
        const stored = localStorage.getItem('vacationEvents')
        if (stored) {
            const parsed: MyEvent[] = JSON.parse(stored).map((e: any) => ({
                ...e,
                start: new Date(e.start),
                end: new Date(e.end),
                userEmail: e.userEmail || 'usuário desconhecido' // Fallback caso não exista
            }))
            setRequests(parsed.filter((e) => e.status === 'pending' && e.userEmail !== user.email))
        }
    }, [user.email])

    const handleDecision = (id: number, decision: 'approved' | 'rejected') => {
        const stored = localStorage.getItem('vacationEvents')
        if (stored) {
            const allEvents: MyEvent[] = JSON.parse(stored).map((e: any) => ({
                ...e,
                start: new Date(e.start),
                end: new Date(e.end),
                userEmail: e.userEmail || 'usuário desconhecido'
            }))

            const updated = allEvents.map((event) =>
                event.id === id ? { ...event, status: decision } : event
            )

            localStorage.setItem('vacationEvents', JSON.stringify(updated))
            setRequests(updated.filter((e) => e.status === 'pending' && e.userEmail !== user.email))
        }
    }

    return (
        <Wrapper>
            <Header>Vertsa Play</Header>

            <UserInfo>
                <UserEmail>{user.email}</UserEmail>
                <UserRole>{user.role.toUpperCase()}</UserRole>
                <SignOutButton onClick={signOut}>Sair</SignOutButton>
            </UserInfo>

            <Title>Pedidos Pendentes</Title>
            <RequestList>
                {requests.map((event) => (
                    <RequestItem key={event.id}>
                        <RequestInfo>
                            <RequestTitle>{event.title}</RequestTitle>
                            <RequestUser>Solicitado por: {event.userEmail}</RequestUser>
                            <RequestDates>
                                {event.start.toLocaleDateString('pt-PT')} → {event.end.toLocaleDateString('pt-PT')}
                            </RequestDates>
                        </RequestInfo>
                        <RequestActions>
                            <ApproveButton onClick={() => handleDecision(event.id, 'approved')}>
                                Aprovar
                            </ApproveButton>
                            <RejectButton onClick={() => handleDecision(event.id, 'rejected')}>
                                Rejeitar
                            </RejectButton>
                        </RequestActions>
                    </RequestItem>
                ))}
                {requests.length === 0 && <Empty>Nenhum pedido pendente</Empty>}
            </RequestList>
        </Wrapper>
    )
}

// STYLES (atualizados)
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
    margin-bottom: 1.5rem;
`

const UserInfo = styled.div`
    margin-bottom: 2rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    position: relative;
`

const UserEmail = styled.div`
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
`

const UserRole = styled.div`
    font-size: 0.9rem;
    color: #ddd;
    text-transform: capitalize;
`

const SignOutButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: 1px solid white;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`

const Title = styled.h2`
    margin-bottom: 1rem;
    font-size: 1.5rem;
`

const RequestList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

const RequestItem = styled.li`
    background: rgba(255, 255, 255, 0.1);
    margin-bottom: 1rem;
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

const RequestInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const RequestTitle = styled.strong`
    font-size: 1.1rem;
`

const RequestUser = styled.div`
    font-size: 0.9rem;
    color: #ddd;
`

const RequestDates = styled.div`
    font-size: 0.95rem;
`

const RequestActions = styled.div`
    display: flex;
    gap: 0.75rem;
`

const ApproveButton = styled.button`
    background: transparent;
    border: 1px solid #4caf50;
    color: #4caf50;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;

    &:hover {
        background: rgba(76, 175, 80, 0.2);
    }
`

const RejectButton = styled.button`
    background: transparent;
    border: 1px solid #f44336;
    color: #f44336;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;

    &:hover {
        background: rgba(244, 67, 54, 0.2);
    }
`

const Empty = styled.p`
    color: #ccc;
    font-style: italic;
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
`