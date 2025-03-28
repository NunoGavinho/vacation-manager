export interface Vacation {
    id: number;
    title: string;
    start: Date;
    end: Date;
    status: 'pending' | 'approved' | 'rejected';
    userId: string;
    userEmail: string;
    userName?: string;
}