export interface MyEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    status: 'pending' | 'approved' | 'rejected';
}

export interface User {
    email: string;
    position: string;
    role: 'admin' | 'user';
}
