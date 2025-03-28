import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

type Vacation = {
    id: string;
    start: Date;
    end: Date;
    status: 'pending';
};

const Calendar: React.FC = () => {
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [remainingDays, setRemainingDays] = useState<number>(22);

    useEffect(() => {
        const saved = localStorage.getItem('vacationRequests');
        if (saved) {
            const parsed = JSON.parse(saved).map((v: any) => ({
                ...v,
                start: new Date(v.start),
                end: new Date(v.end),
            }));
            setVacations(parsed);
            const used = parsed.reduce((acc: number, v: Vacation) => acc + countWeekdays(v.start, v.end), 0);
            setRemainingDays(22 - used);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('vacationRequests', JSON.stringify(vacations));
        const used = vacations.reduce((acc: number, v: Vacation) => acc + countWeekdays(v.start, v.end), 0);
        setRemainingDays(22 - used);
    }, [vacations]);

    const isWeekday = (date: Date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const countWeekdays = (start: Date, end: Date): number => {
        let count = 0;
        const current = new Date(start);
        while (current <= end) {
            if (isWeekday(current)) count++;
            current.setDate(current.getDate() + 1);
        }
        return count;
    };

    const hasOverlap = (start: Date, end: Date): boolean => {
        return vacations.some(v => !(end < v.start || start > v.end));
    };

    const handleSelectSlot = (slot: SlotInfo) => {
        const { start, end } = slot;

        if (!isWeekday(start) || !isWeekday(end)) {
            alert('Só é permitido escolher dias úteis (segunda a sexta).');
            return;
        }

        const daysToAdd = countWeekdays(start, end);

        if (daysToAdd > remainingDays) {
            alert(`Você só pode escolher até ${remainingDays} dias.`);
            return;
        }

        if (hasOverlap(start, end)) {
            alert('O período selecionado se sobrepõe com um período já marcado.');
            return;
        }

        const newVacation: Vacation = {
            id: Math.random().toString(),
            start,
            end,
            status: 'pending',
        };

        setVacations([...vacations, newVacation]);
    };

    const eventStyleGetter = () => {
        return {
            style: {
                backgroundColor: '#f0ad4e',
                borderRadius: '4px',
                color: 'white',
                border: 'none',
                padding: '2px',
            }
        };
    };

    const calendarEvents = vacations.map(v => ({
        title: `Férias (${v.status})`,
        start: v.start,
        end: v.end,
        allDay: true,
    }));

    return (
        <div className="calendar-container">
            <h2>Calendário de Férias</h2>
            <p>Dias restantes: {remainingDays}</p>
            <div style={{ height: 600 }}>
                <BigCalendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    eventPropGetter={eventStyleGetter}
                    views={['month', 'agenda', 'week']}
                    defaultView="month"
                    popup
                />
            </div>
        </div>
    );
};

export default Calendar;
