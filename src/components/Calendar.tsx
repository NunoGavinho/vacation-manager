import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import { Vacation } from '../models/Vacation';

const Calendar: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [description, setDescription] = useState('');
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [editingVacationId, setEditingVacationId] = useState<string | null>(null);

    useEffect(() => {
        const storedVacations = localStorage.getItem('vacations');
        if (storedVacations) {
            setVacations(JSON.parse(storedVacations));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('vacations', JSON.stringify(vacations));
    }, [vacations]);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleAddVacation = () => {
        if (startDate && endDate) {
            const newVacation: Vacation = {
                id: Math.random().toString(),
                startDate: startDate,
                endDate: endDate,
                description: description,
            };
            setVacations([...vacations, newVacation]);
            setStartDate(new Date());
            setEndDate(new Date());
            setDescription('');
        }
    };

    const handleRemoveVacation = (id: string) => {
        setVacations(vacations.filter((vacation) => vacation.id !== id));
    };

    const handleEditVacation = (vacation: Vacation) => {
        setEditingVacationId(vacation.id);
        setStartDate(vacation.startDate);
        setEndDate(vacation.endDate);
        setDescription(vacation.description || '');
    };

    const handleUpdateVacation = () => {
        if (startDate && endDate && editingVacationId) {
            const updatedVacations = vacations.map((vacation) => {
                if (vacation.id === editingVacationId) {
                    return {
                        ...vacation,
                        startDate: startDate,
                        endDate: endDate,
                        description: description,
                    };
                }
                return vacation;
            });
            setVacations(updatedVacations);
            setEditingVacationId(null);
            setStartDate(new Date());
            setEndDate(new Date());
            setDescription('');
        }
    };

    const handleCancelEdit = () => {
        setEditingVacationId(null);
        setStartDate(new Date());
        setEndDate(new Date());
        setDescription('');
    };

    return (
        <div className="calendar">
            <h2>Calendar</h2>
            <div>
                <label>Start Date:</label>
                <DatePicker selected={startDate} onChange={handleStartDateChange} />
            </div>
            <div>
                <label>End Date:</label>
                <DatePicker selected={endDate} onChange={handleEndDateChange} />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={handleDescriptionChange} />
            </div>
            {editingVacationId ? (
                <>
                    <button onClick={handleUpdateVacation}>Update Vacation</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </>
            ) : (
                <button onClick={handleAddVacation}>Add Vacation</button>
            )}
            <h3>Your Vacations:</h3>
            <ul>
                {vacations.map((vacation) => (
                    <li key={vacation.id}>
                        {vacation.startDate.toLocaleDateString()} - {vacation.endDate.toLocaleDateString()}: {vacation.description}
                        <button onClick={() => handleEditVacation(vacation)}>Edit</button>
                        <button onClick={() => handleRemoveVacation(vacation.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Calendar;

export {};