import { fetchData } from './api'
import { Vacation } from '../models/Vacation'

export const getMyVacations = async (): Promise<Vacation[]> => {
    const data = await fetchData('/vacations')
    return data as unknown as Vacation[]
}
