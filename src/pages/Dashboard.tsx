import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';


moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
});

const localizer = momentLocalizer(moment);

type EventStatus = 'pending' | 'approved' | 'rejected';

interface MyEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    status?: EventStatus;
}

interface DashboardProps {
    user: {
        email: string;
        position: string;
        role: 'admin' | 'user';
    };
    signOut: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, signOut }) => {
    const [events, setEvents] = useState<MyEvent[]>([]);
    const [usedDays, setUsedDays] = useState(0);
    const [currentYear, setCurrentYear] = useState(new Date());

    const isWeekday = (date: Date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const countWeekdaysBetween = (start: Date, end: Date) => {
        let count = 0;
        const current = new Date(start);
        while (current <= end) {
            if (isWeekday(current)) count++;
            current.setDate(current.getDate() + 1);
        }
        return count;
    };

    const getWeekdaysBetween = (start: Date, end: Date) => {
        const days: Date[] = [];
        const current = new Date(start);
        while (current <= end) {
            if (isWeekday(current)) days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        return days;
    };

    useEffect(() => {
        const savedEvents = localStorage.getItem('vacationEvents');
        if (savedEvents) {
            try {
                const parsedEvents = JSON.parse(savedEvents).map((e: any) => ({
                    ...e,
                    start: new Date(e.start),
                    end: new Date(e.end),
                }));
                setEvents(parsedEvents);
                setUsedDays(parsedEvents.reduce((sum: number, event: MyEvent) => {
                    return sum + (event.status !== 'rejected' ? countWeekdaysBetween(event.start, event.end) : 0);
                }, 0));
            } catch (error) {
                console.error('Erro ao carregar eventos:', error);
            }
        }
    }, []);

    const handleCreateEvent = (slotInfo: { start: Date, end: Date }) => {
        const weekdays = getWeekdaysBetween(slotInfo.start, slotInfo.end);
        if (weekdays.length === 0) return;

        const hasOverlap = events.some(event =>
            weekdays.some(day => day >= event.start && day <= event.end)
        );

        if (hasOverlap) {
            alert('Já existem férias marcadas nesses dias!');
            return;
        }

        if (usedDays + weekdays.length > 22) {
            alert('Limite de 22 dias úteis excedido!');
            return;
        }

        const newEvent: MyEvent = {
            id: Date.now(),
            title: 'Férias',
            start: slotInfo.start,
            end: slotInfo.end,
            status: 'pending',
        };

        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        setUsedDays(usedDays + weekdays.length);
        localStorage.setItem('vacationEvents', JSON.stringify(updatedEvents));
    };

    const handleDeleteEvent = (eventId: number) => {
        const eventToDelete = events.find(e => e.id === eventId);
        if (!eventToDelete || eventToDelete.status === 'approved') return;

        if (window.confirm('Deseja realmente apagar este período de férias?')) {
            const daysToRemove = countWeekdaysBetween(eventToDelete.start, eventToDelete.end);
            const updatedEvents = events.filter(e => e.id !== eventId);

            setEvents(updatedEvents);
            setUsedDays(usedDays - daysToRemove);
            localStorage.setItem('vacationEvents', JSON.stringify(updatedEvents));
        }
    };

    const handleSubmitForApproval = () => {
        alert('Períodos de férias enviados para aprovação com sucesso!');
    };

    const navigateYear = (direction: 'prev' | 'next') => {
        setCurrentYear(moment(currentYear).add(direction === 'next' ? 1 : -1, 'year').toDate());
    };

    const YearCalendarView = () => {
        const months = Array.from({ length: 12 }, (_, i) => moment(currentYear).month(i));

        return (
            <YearGrid>
                {months.map((month) => (
                    <MonthCard key={month.format('MM-YYYY')}>
                        <MonthTitle>{month.format('MMMM YYYY')}</MonthTitle>
                        <Calendar
                            localizer={localizer}
                            events={events.filter(event =>
                                moment(event.start).isSame(month, 'month') ||
                                moment(event.end).isSame(month, 'month')
                            )}
                            startAccessor="start"
                            endAccessor="end"
                            defaultView="month"
                            view="month"
                            date={month.toDate()}
                            toolbar={false}
                            onSelectSlot={handleCreateEvent}
                            selectable
                            style={{ height: 240 }}
                            eventPropGetter={(event) => ({
                                style: {
                                    backgroundColor:
                                        event.status === 'approved' ? '#4CAF50' :
                                            event.status === 'rejected' ? '#F44336' : '#FFC107',
                                    color: '#fff',
                                    borderRadius: '4px',
                                    border: 'none',
                                },
                            })}
                        />
                    </MonthCard>
                ))}
            </YearGrid>
        );
    };

    return (
        <DashboardContainer>
            <Header>
                <Title>Vertsa Play</Title>
                <UserEmail>{user.email}</UserEmail>
            </Header>

            <MainContent>
                <EventsPanel>
                    <EventsHeader>
                        <span>Meus Períodos de Férias</span>
                        <DaysUsed>{usedDays}/22</DaysUsed>
                    </EventsHeader>

                    <SubmitButton
                        onClick={handleSubmitForApproval}
                        disabled={events.filter(e => e.status === 'pending').length === 0}
                    >
                        Enviar para Aprovação
                    </SubmitButton>

                    <EventsList>
                        {events.map(event => (
                            <EventItem key={event.id} status={event.status}>
                                <EventDates>
                                    {moment(event.start).format('DD/MM')} - {moment(event.end).format('DD/MM')}
                                </EventDates>
                                <EventStatus status={event.status}>
                                    {event.status === 'pending' && 'Pendente'}
                                    {event.status === 'approved' && 'Aprovado'}
                                    {event.status === 'rejected' && 'Recusado'}
                                </EventStatus>
                                {event.status !== 'approved' && (
                                    <DeleteButton onClick={() => handleDeleteEvent(event.id)}>
                                        Apagar
                                    </DeleteButton>
                                )}
                            </EventItem>
                        ))}
                    </EventsList>
                </EventsPanel>

                <CalendarSection>
                    <YearNavigation>
                        <NavButton onClick={() => navigateYear('prev')}>❮ Ano Anterior</NavButton>
                        <CurrentYear>{moment(currentYear).format('YYYY')}</CurrentYear>
                        <NavButton onClick={() => navigateYear('next')}>Próximo Ano ❯</NavButton>
                    </YearNavigation>

                    <YearCalendarView />
                </CalendarSection>
            </MainContent>
        </DashboardContainer>
    );
};

// Estilos
const DashboardContainer = styled.div`
    min-height: 100vh;
    padding: 2rem;
    background: linear-gradient(90deg, #1f005c 70%, #ff6a00 100%);
    color: white;
    font-family: 'Poppins', sans-serif;
`;

const Header = styled.header`
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    padding: 0.5rem 1.5rem;
    border: 2px solid white;
    width: fit-content;
`;

const UserEmail = styled.div`
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    width: fit-content;
`;

const MainContent = styled.div`
    display: flex;
    gap: 2rem;

    @media (max-width: 1200px) {
        flex-direction: column;
    }
`;

const EventsPanel = styled.aside`
    width: 350px;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 1rem;

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const EventsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const DaysUsed = styled.span`
    font-size: 1rem;
    color: #ff9500;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 4px;
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
    padding: 12px;
    background: ${props => props.disabled ? '#666' : '#ff9500'};
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.2s;
    margin-bottom: 1rem;

    &:hover {
        background: ${props => props.disabled ? '#666' : '#e68600'};
        transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    }
`;

const EventsList = styled.ul`
    flex: 1;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const EventItem = styled.li<{ status?: EventStatus }>`
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 4px solid ${props =>
            props.status === 'approved' ? '#4CAF50' :
                    props.status === 'rejected' ? '#F44336' : '#FFC107'};
`;

const EventDates = styled.span`
    font-weight: 500;
    min-width: 120px;
`;

const EventStatus = styled.span<{ status?: EventStatus }>`
    font-weight: 500;
    color: ${props =>
            props.status === 'approved' ? '#4CAF50' :
                    props.status === 'rejected' ? '#F44336' : '#FFC107'};
    margin: 0 1rem;
`;

const DeleteButton = styled.button`
    padding: 4px 8px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: transparent;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

const CalendarSection = styled.section`
    flex: 1;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    color: black;
`;

const YearNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const NavButton = styled.button`
    background: rgba(31, 0, 92, 0.8);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: rgba(31, 0, 92, 1);
    }
`;

const CurrentYear = styled.h2`
    margin: 0;
    font-size: 1.5rem;
`;

const YearGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    @media (max-width: 1600px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`;

const MonthCard = styled.div`
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    background: white;
`;

const MonthTitle = styled.h3`
    text-align: center;
    margin: 0;
    padding: 0.5rem;
    background: #f5f5f5;
    color: #333;
`;

export default Dashboard;