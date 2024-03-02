export function getCurrentDate(): string {
    let date: Date = new Date();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDay();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

export function getUpdateString(): string {
    let time: Date = new Date();

    return `Updated today, ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
}