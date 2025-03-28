export function countWeekdaysBetween(start: Date, end: Date): number {
    let count = 0;
    const current = new Date(start);
    while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) count++;
        current.setDate(current.getDate() + 1);
    }
    return count;
}

export function getWeekdaysBetween(start: Date, end: Date): Date[] {
    const weekdays: Date[] = [];
    const current = new Date(start);
    while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) weekdays.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    return weekdays;
}
