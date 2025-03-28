import { Auth } from 'aws-amplify';

export const getToken = async () => {
    try {
        const session = await Auth.currentSession();
        return session.getIdToken().getJwtToken();
    } catch (error) {
        console.error('Erro ao obter token:', error);
        return null;
    }
};