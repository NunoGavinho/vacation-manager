import { Vacation } from '../models/Vacation';

const STORAGE_KEY = 'vacationRequests';

function getStoredVacations(): Vacation[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored).map((v: any) => ({
        ...v,
        start: new Date(v.start),
        end: new Date(v.end)
    })) : [];
}

export const vacationService = {
    async createRequest(request: Omit<Vacation, 'id' | 'status'>): Promise<Vacation> {
        const vacations = getStoredVacations();
        const newRequest: Vacation = {
            ...request,
            id: Date.now(),
            status: 'pending'
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify([...vacations, newRequest]));
        return newRequest;
    },

    async getPendingRequests(): Promise<Vacation[]> {
        return getStoredVacations().filter(v => v.status === 'pending');
    },

    async approveRequest(id: number): Promise<void> {
        const vacations = getStoredVacations();
        const updated = vacations.map(v =>
            v.id === id ? { ...v, status: 'approved' } : v
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },

    async rejectRequest(id: number): Promise<void> {
        const vacations = getStoredVacations();
        const updated = vacations.map(v =>
            v.id === id ? { ...v, status: 'rejected' } : v
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },

    async getUserRequests(userId: string): Promise<Vacation[]> {
        return getStoredVacations().filter(v => v.userId === userId);
    }
};