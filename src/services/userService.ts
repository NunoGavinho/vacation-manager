import api from './api'
import { User } from '../models/User'

export const getAllUsers = async (): Promise<User[]> => {
    const res = await api.get('/users')
    return res.data
}
