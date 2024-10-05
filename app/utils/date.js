export function getTodaysDate()
{
    const today = new Date().toISOString().split('T')[0];
    return today;
}


export function calculateTotalDays (startDate, endDate) {
    const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in a day
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    return Math.round(Math.abs((end - start) / oneDay));
  }


export function isWeekday (date)
{
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6; // 0 is Sunday, 6 is Saturday
};