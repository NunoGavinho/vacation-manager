import { API } from 'aws-amplify';
import { getToken } from './authService';

export const fetchData = async (endpoint: string) => {
    const token = await getToken();
    if (!token) throw new Error('Usuário não autenticado!');

    return API.get('VacationAPI', endpoint, {
        headers: { Authorization: token }
    });
};