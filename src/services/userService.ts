import { fetchData } from './api'
import { User } from '../models/User'

export const getAllUsers = async (): Promise<User[]> => {
    const data = await fetchData('/users')
    return data as unknown as User[]
}
