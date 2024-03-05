export function getCurrentDate(): string {
    let date: Date = new Date();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

export function getUpdateString(): string {
    let time: Date = new Date();

    return `Updated today, ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
}

// {percentageDifference}% from last week
// returns the string for the Weekly Breakdown indicating
// whether there's an increase or decrease compared to last week
// Will be implemented for Milestone 3
export function getPercentageDifferenceString(): string {
    // TODO: Get last weeks average (I think from DB instead of Redux)

    // TODO: Get this week's average

    // calculate the difference
    let percentageDifference = 34;


    return `${percentageDifference}% from last week`;
}