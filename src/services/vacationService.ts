import api from './api'
import { Vacation } from '../models/Vacation'

export const getMyVacations = async (): Promise<Vacation[]> => {
    const res = await api.get('/vacations/me')
    return res.data
}

export const getAllVacations = async (): Promise<Vacation[]> => {
    const res = await api.get('/vacations')
    return res.data
}

export const addVacation = async (startDate: string, endDate: string) => {
    return api.post('/vacations', { startDate, endDate })
}
