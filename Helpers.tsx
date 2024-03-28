export const getCurrentDate = (): string => {
    let date: Date = new Date();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

export const getUpdateString = (): string => {
    let time: Date = new Date();

    return `Updated today, ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
}

// Formats the date to be in the format 'DD/MM/YY' from CalendarPicker in New/EditTransactionScreen
export const formateDate = (rawDate: Date): string => {
  let date = new Date(rawDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  console.log(month);
  let day = date.getDate();

  const zmonth = month < 10 ? `0${month}` : month;
  const zday = day < 10 ? `0${day}` : day;
  return `${zday}/${zmonth}/${year}`;
};

// {percentageDifference}% from last week
// returns the string for the Weekly Breakdown indicating
// whether there's an increase or decrease compared to last week
// Will be implemented for Milestone 3
export const getPercentageDifferenceString = (): string => {
    // TODO: Get last weeks average (I think from DB instead of Redux)

    // TODO: Get this week's average

    // calculate the difference
    let percentageDifference = 34;


    return `${percentageDifference}% from last week`;
}

export const getMonthProgress = (): number => {
    const currentDay = new Date().getDate();
    // get the number of days in the current month
    // since the month is 0-indexed, we add 1 to the month and set the day to 0
    const daysInMonth = getNumDaysInMonth();
    const progress = currentDay / daysInMonth;
    return progress;
}

export const getNumDaysInMonth = (): number => {
    return new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
}

export const convertMonthNumToName = (monthNum: string) => {
    const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
    return formatter.format(new Date(2024, parseInt(monthNum) - 1, 1));
}